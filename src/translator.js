const fetchConfig = require("./config");
const fs = require("fs");

const Translated = require("./adapter/traslated");
const adapter = [Translated];

function po2Array(poData) {
	const lines = poData.split("\n").filter((line) => line.trim() !== "");
	const array = [];
	for (let i = 0; i < lines.length; i += 2) {
		if (lines[i].startsWith("msgid") && lines[i + 1].startsWith("msgstr")) {
			const msgid = lines[i].match(/"(.+)"/)[1];
			const msgstr = lines[i + 1].match(/"(.+)"/)[1];
			array.push({ msgid, msgstr });
		}
	}
	return array;
}
function array2po(array) {
	let poData = "";
	array.forEach(({ msgid, msgstr }) => {
		poData += `msgid "${msgid}"\n`;
		poData += `msgstr "${msgstr}"\n\n`;
	});
	return poData.trim();
}
async function translate(config) {
	const rootPath = ".";
	const workingPath = `${rootPath}/${config.workingPath}`;
	const originFileName = `${workingPath}/${config.originLang}.po`;
	const originFileContent = fs.readFileSync(originFileName, "utf8");
	const originFileContentArray = po2Array(originFileContent);
	const translateCount = (originFileContent.match(/msgid/g) || []).length;
	const targetLanguages = config.targetLangs;

	for (let i = 0; i < adapter.length; i++) {
		if (adapter[i].name === config.adapter) {
			for (let j = 0; j < targetLanguages.length; j++) {
				if (targetLanguages[j] === config.originLang) continue;
				if (!fs.existsSync(`${workingPath}/${targetLanguages[j]}.po`)) {
					console.log(
						`Create ${targetLanguages[j]}.po in ${workingPath}...`
					);
					fs.writeFileSync(
						`${workingPath}/${targetLanguages[j]}.po`,
						"",
						"utf8"
					);
				}
				for (let k = 0; k < originFileContentArray.length; k++) {
					const { msgstr } = originFileContentArray[k];
					try {
						const result = await adapter[i].translate(
							config.originLang,
							targetLanguages[j],
							msgstr
						);
						originFileContentArray[k].msgstr = result;
						console.log(
							`Translate ${msgstr} -> ${result} in ${
								targetLanguages[j]
							} (${k + 1}/${translateCount})`
						);
					} catch (e) {
						console.error(e);
					}
				}
				const targetFileContent = array2po(originFileContentArray);
				fs.writeFileSync(
					`${workingPath}/${targetLanguages[j]}.po`,
					targetFileContent,
					"utf8"
				);
			}
		}
	}
}

module.exports = translate;
