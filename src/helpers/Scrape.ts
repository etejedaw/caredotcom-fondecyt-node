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
		const data = $(".row .results .group .search-result").map((_idx, elem) => {
			const name = $(elem).find(".profile-link").text().trim();
			const priceRank = $(elem).find(".rate-ct").text().trim();
			const experience = $(elem).find(".block2").text().trim();
			const age = $(elem).find(".block3").text().trim();
			console.log({name, priceRank, experience, age});
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	extractData2() {
		const $ = cheerio.load(this.#html);
		const data = $(".mob-row .result .result-body .individual-info").map((_idx, elem) => {
			const name = $(elem).find(".pro-title").text().trim();
			const priceRank = $(elem).find(".provider-detail-info .row .col-xs-5").text().trim();
			const experience = $(elem).find(".provider-detail-info .row .col-xs-7").text().trim();
			const age = $(elem).find(".provider-detail-info .row .hidden-xs").text().trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	extractData3() {
		const ITEMS_TO_EXTRACT = 10;
		const $ = cheerio.load(this.#html);
		const data = $(".search-results #search-results .search-result .result-body").map((idx, elem) => {
			if(idx > ITEMS_TO_EXTRACT - 1) return;
			const tempName = $(elem).find(".result-title").text();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("div.result-heading").text();
			const body = tempBody.split("•");
			console.log(body);
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	checkItems(name: string, priceRank: string, experience: string, age: string) {
		if(name && priceRank && experience && age) return true;
		return false;
	}

}

export default Scrape;