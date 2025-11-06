const fetchConfig = require("./config");
const fs = require("fs");

const Translated = require("./adapter/traslated");
const adapter = [Translated];

function jsonToPoArray(jsonData, prefix = "") {
    const array = [];
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof jsonData[key] === "object") {
                array.push(...jsonToPoArray(jsonData[key], newKey));
            } else {
                array.push({ msgid: newKey, msgstr: jsonData[key] });
            }
        }
    }
    return array;
}
function poToArray(poContent) {
    const array = [];
    const lines = poContent.split("\n");
    let currentMsgid = "";
    let currentMsgstr = "";
    let inMsgid = false;
    let inMsgstr = false;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('msgid "')) {
            currentMsgid = trimmedLine.substring(7, trimmedLine.length - 1);
            inMsgid = true;
            inMsgstr = false;
        } else if (trimmedLine.startsWith('msgstr "')) {
            currentMsgstr = trimmedLine.substring(8, trimmedLine.length - 1);
            inMsgid = false;
            inMsgstr = true;

            if (currentMsgid && currentMsgid !== '""') {
                array.push({
                    msgid: currentMsgid === '""' ? "" : currentMsgid,
                    msgstr: currentMsgstr === '""' ? "" : currentMsgstr,
                });
            }
        } else if (trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) {
            const content = trimmedLine.substring(1, trimmedLine.length - 1);
            if (inMsgid) {
                currentMsgid += content;
            } else if (inMsgstr) {
                currentMsgstr += content;
            }
        } else if (trimmedLine === "") {
            inMsgid = false;
            inMsgstr = false;
        }
    }

    return array;
}
function arrayToPo(array) {
    return array
        .map(({ msgid, msgstr }) => {
            return `msgid "${msgid}"\nmsgstr "${msgstr || ""}"`;
        })
        .join("\n\n");
}
async function translate(config) {
    const rootPath = ".";
    const workingPath = `${rootPath}/${config.workingPath}`;
    const originLang = config.originLang;
    const jsonFileName = `${workingPath}/${config.originLang}.json`;
    const jsonData = JSON.parse(fs.readFileSync(jsonFileName, "utf8"));

    const originFileContentArray = jsonToPoArray(jsonData);
    const targetLanguages = config.targetLangs;

    for (let i = 0; i < adapter.length; i++) {
        if (adapter[i].name === config.adapter) {
            for (let j = 0; j < targetLanguages.length; j++) {
                if (targetLanguages[j] === originLang) continue;

                const targetPoFile = `${workingPath}/${targetLanguages[j]}.po`;

                if (!fs.existsSync(targetPoFile)) {
                    console.log(
                        `Create ${targetLanguages[j]}.po in ${workingPath}...`
                    );
                    fs.writeFileSync(targetPoFile, "", "utf8");
                }

                const targetFileContent = fs.readFileSync(targetPoFile, "utf8");
                const targetFileContentArray = targetFileContent
                    ? poToArray(targetFileContent)
                    : [];

                const msgidSet = new Set(
                    targetFileContentArray.map((item) => item.msgid)
                );
                const diffContentArray = originFileContentArray.filter(
                    (item) => !msgidSet.has(item.msgid)
                );

                if (diffContentArray.length === 0) {
                    console.log(
                        `No new translations needed for ${targetLanguages[j]}`
                    );
                    continue;
                }

                console.log(
                    `Translating ${diffContentArray.length} new strings to ${targetLanguages[j]}`
                );

                for (let k = 0; k < diffContentArray.length; k++) {
                    const { msgid, msgstr } = diffContentArray[k];
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
                            } (${k + 1}/${diffContentArray.length})`
                        );
                    } catch (e) {
                        console.error(`Translation failed for ${msgid}:`, e);
                        diffContentArray[k].msgstr = msgstr;
                    }
                }

                const resultContent = arrayToPo(diffContentArray);
                if (resultContent.trim()) {
                    const existingContent = fs
                        .readFileSync(targetPoFile, "utf8")
                        .trim();
                    const separator = existingContent ? "\n\n" : "";
                    fs.writeFileSync(
                        targetPoFile,
                        existingContent + separator + resultContent,
                        "utf8"
                    );
                }
            }
        }
    }
}

module.exports = translate;
