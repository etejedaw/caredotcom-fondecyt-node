import cheerio from "cheerio";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extractData() {
		let data = this.extractData1();
		if(data.length === 0) data = this.extractData2();
		return data;
	}

	extractData1() {
		const $ = cheerio.load(this.#html);
		const data = $(".group .search-result").map((_idx, elem) => {
			const name = $(elem).find(".profile-link").text().trim();
			const priceRank = $(elem).find(".rate-ct").text().trim();
			const experience = $(elem).find(".block2").text().trim();
			const age = $(elem).find(".block3").text().trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	extractData2() {
		const $ = cheerio.load(this.#html);
		const data = $(".individual-info").map((_idx, elem) => {
			const name = $(elem).find(".pro-title").text().trim();
			const priceRank = $(elem).find(".provider-detail-info .row .col-xs-5").text().trim();
			const experience = $(elem).find(".provider-detail-info .row .col-xs-7").text().trim();
			const age = $(elem).find(".provider-detail-info .row .hidden-xs").text().trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}



}

export default Scrape;