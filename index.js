#! /usr/bin/env node
const fetchConfig = require("./src/config");
const translate = require("./src/translator.js");
const { Command } = require("commander");
const program = new Command();

const fs = require("fs");

program.version("1.0.0").parse(process.argv);

main();

function main() {
	fetchConfig().then((config) => {
		translate(config).catch((err) => {
			console.error(err);
		});
	});
}
