import cheerio from "cheerio";
import OfferProvider from "../interfaces/OfferProvider";
import ArrayExtended from "../utils/ArrayExtended";
import ObjectExtended from "../utils/ObjectExtended";

class ScrapeOfferProvider {
	readonly #html: string;
	readonly #OBJECT_MAX_LENGTH = 4;
	readonly #ARRAY_MAX_LENGTH = 3;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): OfferProvider[] {
		let extract = this.extractDataV1();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV4();
		if(ArrayExtended.isEmpty(extract)) return [] as OfferProvider[];
		return extract;
	}

	extractDataV1(): OfferProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".search-results .row .results .group .individual-result.clearfix .result-wrap").map((idx, elem) => {
			const name = $(elem).find(".profile-name").text().trim();
			const priceRank = $(elem).find(".info-blocks .block1").text().trim();
			const experience = $(elem).find(".info-blocks .block2").text().trim();
			const age = $(elem).find(".info-blocks .block3").text().trim();
			const body = {name, priceRank, experience, age} as OfferProvider;
			if (!ObjectExtended.hasAllValues(body, this.#OBJECT_MAX_LENGTH)) return;
			return body;
		}).get();
	}

	extractDataV2(): OfferProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".mob-row .result .result-body .individual-info").map((_idx, elem) => {
			const name = $(elem).find(".pro-title").text().trim();
			const priceRank = $(elem).find(".provider-detail-info .row .col-xs-5").text().trim();
			const experience = $(elem).find(".provider-detail-info .row .col-xs-7").text().trim();
			const age = $(elem).find(".provider-detail-info .row .hidden-xs").text().trim();
			const body = {name, priceRank, experience, age} as OfferProvider;
			if (!ObjectExtended.hasAllValues(body, this.#OBJECT_MAX_LENGTH)) return;
			return body;
		}).get();
	}

	extractDataV3(): OfferProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".container.seo-listing .row .row.search-results .col-xs-12 .search-result .result-body").map((idx, elem) => {
			const tempName = $(elem).find(".result-title").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("div.result-heading").text();
			const body = tempBody.split("•");
			if (!ArrayExtended.hasAllValues(body, this.#ARRAY_MAX_LENGTH)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age} as OfferProvider;
		}).get();
	}

	extractDataV4(): OfferProvider[] {
		const $ = cheerio.load(this.#html);
		const data = $(".MuiGrid-root.MuiGrid-item .MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiGrid-root.MuiGrid-item .MuiBox-root .MuiBox-root").map((idx, elem) => {
			const tempName = $(elem).find("h3.MuiTypography-root.MuiTypography-h3").text().trim();
			const name = tempName.split("|")[0];
			const tempBody = $(elem).find("h5:nth-child(2)").text();
			const body = tempBody.split("•");
			if (!ArrayExtended.hasAllValues(body, this.#ARRAY_MAX_LENGTH)) return;
			const priceRank = body[0].trim();
			const experience = body[1].trim();
			const age = body[2].trim();
			return {name, priceRank, experience, age} as OfferProvider;
		}).get() as OfferProvider[];
		return ArrayExtended.cleanObjectRepeats(data);
	}

}

export default ScrapeOfferProvider;