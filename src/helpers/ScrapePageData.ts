import PageData from "../interfaces/PageData";
import cheerio from "cheerio";
import ObjectExtended from "../utils/ObjectExtended";

class ScrapePageData {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): PageData {
		let extract = this.extractDataV1();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV4();
		if(ObjectExtended.isEmpty(extract)) extract = this.#fillNoData();
		return this.#sanitizeNaN(extract);
	}

	extractDataV1(): PageData {
		const query = ".letterbox-expander .letterbox .sub-headline";
		return this.execScrapeQuery(query);
	}

	extractDataV2(): PageData {
		const query = "h3.college-sub-head-wrap";
		return this.execScrapeQuery(query);
	}

	extractDataV3(): PageData {
		const query = ".heroImg .body-1";
		return this.execScrapeQuery(query);
	}

	extractDataV4(): PageData {
		const query = ".MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item [role='dialog'] [data-testid='sub-text']";
		return this.execScrapeQuery(query);
	}

	execScrapeQuery(query: string): PageData {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $(query).text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	#fillNoData(): PageData {
		const providers = "No Data";
		const average = "No Data";
		return {providers, average};
	}

	#sanitizeNaN(pageData: PageData): PageData {
		let {providers, average} = {...pageData};
		if(String(providers) === "NaN") providers = "No Data";
		if(String(average) === "NaN") average = "No Data";
		return {providers, average};
	}

}

export default ScrapePageData;