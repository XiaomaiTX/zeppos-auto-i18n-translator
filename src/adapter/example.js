// example adapter
class Example {
	constructor() {}
	name = "Example";
	async translate(from, to, text) {
		if (from === to || text.length === 0) return text;
		// TODO
		// return translated text
		return text;
	}
}
module.exports = Example;
