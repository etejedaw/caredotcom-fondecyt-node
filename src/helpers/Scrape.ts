import cheerio from "cheerio";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extractData(): any {
		return this.extractData4();
	}

	extractData1() {
		const $ = cheerio.load(this.#html);
		const data = $(".search-results .row .results .group .individual-result.clearfix .result-wrap").map((idx, elem) => {
			const name = $(elem).find(".profile-name").text().trim();
			const priceRank = $(elem).find(".info-blocks .block1").text().trim();
			const experience = $(elem).find(".info-blocks .block2").text().trim();
			const age = $(elem).find(".info-blocks .block3").text().trim();
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
		const $ = cheerio.load(this.#html);
		const data = $(".container.seo-listing .row .row.search-results .col-xs-12 .search-result .result-body").map((idx, elem) => {
			const tempName = $(elem).find(".result-title").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("div.result-heading").text();
			const body = tempBody.split("•");
			if(!this.hasAllValues(body)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

	hasAllValues(body: Array<string>) {
		return body.length === 3;
	}

	extractData4() {
		const $ = cheerio.load(this.#html);
		const data = $(".MuiGrid-root.MuiGrid-item .MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiBox-root").map((idx, elem) => {
			const tempName = $(elem).find("h3.MuiTypography-root.MuiTypography-h3").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("h5:nth-child(2)").text();
			const body = tempBody.split("•");
			if(!this.hasAllValues(body)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
		return data;
	}

}

export default Scrape;