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
	const originLang = config.originLang;
	const originFileName = `${workingPath}/${originLang}.po`;
	const originFileContent = fs.readFileSync(originFileName, "utf8");
	const originFileContentArray = po2Array(originFileContent);
	const translateCount = (originFileContent.match(/msgid/g) || []).length;
	const targetLanguages = config.targetLangs;

	for (let i = 0; i < adapter.length; i++) {
		if (adapter[i].name === config.adapter) {
			for (let j = 0; j < targetLanguages.length; j++) {
				if (targetLanguages[j] === originLang) continue;
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
				const targetFileContent = fs.readFileSync(
					`${workingPath}/${targetLanguages[j]}.po`,
					"utf8"
				);
				const targetFileContentArray = po2Array(targetFileContent);
				const msgidSet = new Set(
					targetFileContentArray.map((item) => item.msgid)
				);
				const diffContentArray = originFileContentArray.filter(
					(item) => !msgidSet.has(item.msgid)
				);
				if (diffContentArray.length === 0) continue;
				for (let k = 0; k < diffContentArray.length; k++) {
					const { msgstr } = diffContentArray[k];
					try {
						const result = await adapter[i].translate(
							originLang,
							targetLanguages[j],
							msgstr
						);
						diffContentArray[k].msgstr = result;
						console.log(
							`Translate ${msgstr} -> ${result} in ${
								targetLanguages[j]
							} (${k + 1}/${translateCount})`
						);
					} catch (e) {
						console.error(e);
					}
				}
				const resultContent = array2po(diffContentArray);
				fs.appendFileSync(
					`${workingPath}/${targetLanguages[j]}.po`,
					"\n\n" + resultContent,
					"utf8"
				);
			}
		}
	}
}

module.exports = translate;
