import JobPageData from "../interfaces/JobPageData";
import ObjectExtended from "../utils/ObjectExtended";
import cheerio from "cheerio";
import OfferPageData from "../interfaces/OfferPageData";

class ScrapeJobPageData {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): JobPageData {
		let extract = this.extractDataV1();
		if(ObjectExtended.isEmpty(extract)) extract = this.#fillNoData();
		return this.#sanitizeNaN(extract);
	}

	extractDataV1(): JobPageData {
		const query = ".container-fluid .heroImg .col-xs-12.text-center.intro .body-1.hero-subhead";
		return this.#execScrapeQuery(query);
	}

	#execScrapeQuery(query: string): JobPageData {
		const $ = cheerio.load(this.#html);
		const regex = /(\d[\d.|,]*)/g;
		const data = $(query).text();
		const pageData = data.match(regex);
		if(!pageData) return {} as JobPageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		return {providers} as JobPageData;
	}

	#fillNoData(): JobPageData {
		const providers = "No Data";
		return {providers};
	}

	#sanitizeNaN(pageData: JobPageData): JobPageData {
		let {providers} = {...pageData};
		if(String(providers) === "NaN") providers = "No Data";;
		return {providers};
	}
}

export default ScrapeJobPageData;