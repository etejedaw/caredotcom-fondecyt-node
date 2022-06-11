import cheerio from "cheerio";
import Provider from "../interfaces/Provider";
import ArrayExtended from "../utils/ArrayExtended";

class ScrapeProvider {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): Provider[] {
		let extract = this.extractDataV1();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV4();
		return extract;
	}

	extractDataV1(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".search-results .row .results .group .individual-result.clearfix .result-wrap").map((idx, elem) => {
			const name = $(elem).find(".profile-name").text().trim();
			const priceRank = $(elem).find(".info-blocks .block1").text().trim();
			const experience = $(elem).find(".info-blocks .block2").text().trim();
			const age = $(elem).find(".info-blocks .block3").text().trim();
			return {name, priceRank, experience, age} as Provider;
		}).get();
	}

	extractDataV2(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".mob-row .result .result-body .individual-info").map((_idx, elem) => {
			const name = $(elem).find(".pro-title").text().trim();
			const priceRank = $(elem).find(".provider-detail-info .row .col-xs-5").text().trim();
			const experience = $(elem).find(".provider-detail-info .row .col-xs-7").text().trim();
			const age = $(elem).find(".provider-detail-info .row .hidden-xs").text().trim();
			return {name, priceRank, experience, age};
		}).get();
	}

	extractDataV3(): Provider[] {
		const $ = cheerio.load(this.#html);
		return $(".container.seo-listing .row .row.search-results .col-xs-12 .search-result .result-body").map((idx, elem) => {
			const tempName = $(elem).find(".result-title").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("div.result-heading").text();
			const body = tempBody.split("•");
			if (!ArrayExtended.hasAllValues(body, 3)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get();
	}

	extractDataV4(): Provider[] {
		const $ = cheerio.load(this.#html);
		const data = $(".MuiGrid-root.MuiGrid-item .MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiBox-root").map((idx, elem) => {
			const tempName = $(elem).find("h3.MuiTypography-root.MuiTypography-h3").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("h5:nth-child(2)").text();
			const body = tempBody.split("•");
			if (!ArrayExtended.hasAllValues(body, 3)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age};
		}).get() as Provider[];
		return ArrayExtended.cleanObjectRepeats(data);
	}

}

export default ScrapeProvider;