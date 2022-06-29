import JobProvider from "../interfaces/JobProvider";
import ArrayExtended from "../utils/ArrayExtended";
import cheerio from "cheerio";

class ScrapeJobProvider {
	readonly #html: string;

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
		return $("").map((idx, elem) => {

		}).get();
	}
}

export default ScrapeJobProvider;