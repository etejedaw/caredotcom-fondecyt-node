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
}

export default ScrapeJobProvider;