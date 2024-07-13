const API_URL = "https://api.mymemory.translated.net";

class Translated {
	constructor() {}
	name = "Translated";
	static async translate(from, to, text) {
		if (from === to || text.length === 0) return text;
		const resp = await fetch(
			`${API_URL}/get?q=${encodeURIComponent(
				text
			)}&langpair=${from}|${to}`
		);
		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`);
		}
		const data = await resp.json();
		const translatedText = data.responseData.translatedText;
		return translatedText;
	}
}
module.exports = Translated;
