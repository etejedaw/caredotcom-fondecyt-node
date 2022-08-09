import JobProvider from "../interfaces/JobProvider";
import ArrayExtended from "../utils/ArrayExtended";
import cheerio from "cheerio";

class ScrapeJobProvider {
	readonly #html: string;
	readonly #ARRAY_MAX_LENGTH = 4;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): JobProvider[] {
		let extract = this.extractDataV1();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ArrayExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ArrayExtended.isEmpty(extract)) return [] as JobProvider[];
		return extract;
	}

	extractDataV1(): JobProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".container.seo-listing .row .row.search-results .col-xs-12 .search-result").map((idx, elem) => {
			const title = $(elem).find(".job-title").text().trim();
			const tempBody = $(elem).find(".result-heading").text().trim();
			const body = tempBody.split("•");
			if (!ArrayExtended.hasAllValues(body, this.#ARRAY_MAX_LENGTH)) return;
			const workSchedule = body[0].trim();
			const priceRank = body[1].trim();
			return {title, workSchedule, priceRank} as JobProvider;
		}).get();
	}

	extractDataV2(): JobProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".col-lg-9.search-results .row .col-xs-12.results .group .search-result").map((_idx, elem) => {
			const title = $(elem).find(".profile-name .visible-sm").text().trim();
			const workSchedule = $(elem).find(".col-xs-7.col-sm-3.text-block").text().trim();
			const priceRank = $(elem).find(".col-xs-5.col-sm-2.text-block").text().trim();
			return {title, workSchedule, priceRank} as JobProvider;
		}).get();
	}

	extractDataV3(): JobProvider[] {
		const $ = cheerio.load(this.#html);
		return $(".row.search-res-section .col-xs-12.col-lg-9 .search-result").map((_idx, elem) => {
			const title = $(elem).find(".job-title").text().trim();
			const workSchedule = $(elem).find(".row.job-detail-info .col-xs-6.col-sm-6").text().trim();
			const priceRank = $(elem).find(".row.job-detail-info .col-xs-5.col-sm-3").text().trim();
			return {title, workSchedule, priceRank} as JobProvider;
		}).get();
	}
}

export default ScrapeJobProvider;