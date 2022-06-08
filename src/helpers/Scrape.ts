import cheerio from "cheerio";
import Provider from "../interfaces/Provider";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extractData(): Provider[] {
		let extract = this.extractData1();
		if(extract.length == 0) extract = this.extractData2();
		if(extract.length == 0) extract = this.extractData3();
		if(extract.length == 0) extract = this.extractData4();
		return extract;
	}

	extractData1(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".search-results .row .results .group .individual-result.clearfix .result-wrap").map((idx, elem) => {
			const name = $(elem).find(".profile-name").text().trim();
			const priceRank = $(elem).find(".info-blocks .block1").text().trim();
			const experience = $(elem).find(".info-blocks .block2").text().trim();
			const age = $(elem).find(".info-blocks .block3").text().trim();
			return {name, priceRank, experience, age} as Provider;
		}).get();
	}

	extractData2(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".mob-row .result .result-body .individual-info").map((_idx, elem) => {
			const name = $(elem).find(".pro-title").text().trim();
			const priceRank = $(elem).find(".provider-detail-info .row .col-xs-5").text().trim();
			const experience = $(elem).find(".provider-detail-info .row .col-xs-7").text().trim();
			const age = $(elem).find(".provider-detail-info .row .hidden-xs").text().trim();
			return {name, priceRank, experience, age};
		}).get();
	}

	extractData3(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".container.seo-listing .row .row.search-results .col-xs-12 .search-result .result-body").map((idx, elem) => {
			const tempName = $(elem).find(".result-title").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("div.result-heading").text();
			const body = tempBody.split("•");
			if (!this.hasAllValues(body)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
	}

	hasAllValues(body: Array<string>) {
		return body.length === 3;
	}

	extractData4(): Provider[] {
		const $ = cheerio.load(this.#html);
		const data = $(".MuiGrid-root.MuiGrid-item .MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiBox-root").map((idx, elem) => {
			const tempName = $(elem).find("h3.MuiTypography-root.MuiTypography-h3").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("h5:nth-child(2)").text();
			const body = tempBody.split("•");
			if (!this.hasAllValues(body)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
		return this.checkRepeat(data);
	}

	checkRepeat(data: Array<object>): Provider[] {
		const dataStringify = data.map(item => JSON.stringify(item));
		const dataSet = new Set(dataStringify);
		const newData = [...dataSet].map(item => JSON.parse(item));
		return [...newData];
	}

}

export default Scrape;