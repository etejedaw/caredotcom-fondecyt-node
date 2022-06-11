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
		return extract;
	}

	extractDataV1(): PageData {
		const $ = cheerio.load(this.#html);
		const regex = /(\d[\d.|,]*)/g;
		const data = $("h3.college-sub-head-wrap").text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		const pageNumber = 0;
		return {pageNumber, providers, average};
	}

	extractDataV2(): PageData {
		return {} as PageData;
	}

}

export default ScrapePageData;