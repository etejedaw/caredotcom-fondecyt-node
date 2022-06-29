import OfferPageData from "../interfaces/OfferPageData";
import cheerio from "cheerio";
import ObjectExtended from "../utils/ObjectExtended";

class ScrapeOfferPageData {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): OfferPageData {
		let extract = this.extractDataV1();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV4();
		if(ObjectExtended.isEmpty(extract)) extract = this.#fillNoData();
		return this.#sanitizeNaN(extract);
	}

	extractDataV1(): OfferPageData {
		const query = ".letterbox-expander .letterbox .sub-headline";
		return this.#execScrapeQuery(query);
	}

	extractDataV2(): OfferPageData {
		const query = "h3.college-sub-head-wrap";
		return this.#execScrapeQuery(query);
	}

	extractDataV3(): OfferPageData {
		const query = ".heroImg .body-1";
		return this.#execScrapeQuery(query);
	}

	extractDataV4(): OfferPageData {
		const query = ".MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item [role='dialog'] [data-testid='sub-text']";
		return this.#execScrapeQuery(query);
	}

	#execScrapeQuery(query: string): OfferPageData {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $(query).text();
		const pageData = data.match(regex);
		if(!pageData) return {} as OfferPageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	#fillNoData(): OfferPageData {
		const providers = "No Data";
		const average = "No Data";
		return {providers, average};
	}

	#sanitizeNaN(pageData: OfferPageData): OfferPageData {
		let {providers, average} = {...pageData};
		if(String(providers) === "NaN") providers = "No Data";
		if(String(average) === "NaN") average = "No Data";
		return {providers, average};
	}

}

export default ScrapeOfferPageData;