import cheerio from "cheerio";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extractData(){
		const $ = cheerio.load(this.#html);
		const data = $(".group .search-result").map((idx, elem) => {
			const name = $(elem).find(".profile-link").text().trim();
			const priceRank = $(elem).find(".rate-ct").text().trim();
			const experience = $(elem).find(".block2").text().trim();
			const age = $(elem).find(".block3").text().trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

}

export default Scrape;