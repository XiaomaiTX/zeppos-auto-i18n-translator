const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const currentDirectory = process.cwd();
const configFilePath = path.join(currentDirectory, "./.z18n.config.json");

const defaultConfig = {
	originLang: "zh-CN",
	targetLangs: ["en-US", "zh-TW", "ru-RU", "fr-FR"],
	workingPath: "./example/page/i18n",
	adapter: "Translated",
};
const defaultConfigContent = JSON.stringify(defaultConfig, null, 2);

async function fetchConfig() {
	try {
		// 检查文件是否存在
		await fsPromises.access(configFilePath, fs.constants.F_OK);
	} catch (err) {
		// 如果文件不存在，创建文件并写入默认内容
		try {
			await fsPromises.writeFile(
				configFilePath,
				defaultConfigContent,
				"utf8"
			);
			console.log(".z18n.config.json file created with default content.");
		} catch (writeErr) {
			console.error("Error writing .z18n.config.json file:", writeErr);
			throw writeErr;
		}
	}
	try {
		// 读取文件内容
		const data = await fsPromises.readFile(configFilePath, "utf8");
		// 解析 JSON 内容
		const config = JSON.parse(data);
		return config;
	} catch (readErr) {
		console.error(
			"Error reading or parsing .z18n.config.json file:",
			readErr
		);
		throw readErr;
	}
}

module.exports = fetchConfig;
