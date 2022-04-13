import cheerio from "cheerio";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extractData(): any {
		return this.extractData3();
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

	extractData3() {
		const $ = cheerio.load(this.#html);
		const data = $("#search-results .search-result").map((_idx, elem) => {
			const name = this.extractData3_NormalizeName(elem);
			const body = this.extractData3_NormalizeBody(elem);
			if(!name || !body) return;
			const {priceRank, experience, age} = body;
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	extractData3_NormalizeName(elem: cheerio.Element) {
		const $ = cheerio.load(this.#html);
		const name = $(elem).find(".result-title").text().trim();
		const isValid = name.indexOf("|");
		if(isValid === -1) return undefined;
		const splitName = name.split("|");
		const newName = splitName[0].replace("\n", "");
		return newName;
	}

	extractData3_NormalizeBody(elem: cheerio.Element) {
		const $ = cheerio.load(this.#html);
		const body = $(elem).find(".result-heading").text().trim();
		const isValid = body.indexOf("•");
		if(isValid === -1) return undefined;
		const splitBody = body.split("•");
		const newBody = splitBody.map(value => {
			return value.replace("\n", "");
		});
		return {
			priceRank: newBody[0],
			experience: newBody[1],
			age: newBody[2]
		};
	}

}

export default Scrape;