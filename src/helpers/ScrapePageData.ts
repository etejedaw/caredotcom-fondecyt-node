import PageData from "../interfaces/PageData";
import cheerio, {html} from "cheerio";
import ObjectExtended from "../utils/ObjectExtended";
import extraData from "../interfaces/ExtraData";

class ScrapePageData {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): PageData {
		const data = this.extractData();
		const pages = this.extractPage();
		return Object.assign(data, pages);
	}

	extractData(): {providers: number, average: number} {
		let extract = this.extractDataV1();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV2();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV3();
		if(ObjectExtended.isEmpty(extract)) extract = this.extractDataV4();
		return extract;
	}

	extractDataV1(): {providers: number, average: number} {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $(".letterbox-expander .letterbox .sub-headline").text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	extractDataV2(): {providers: number, average: number} {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $("h3.college-sub-head-wrap").text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	extractDataV3(): {providers: number, average: number} {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $(".heroImg .body-1").text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	extractDataV4(): {providers: number, average: number} {
		const $ = cheerio.load(this.#html);
		//return numbers by ',' or '.'
		const regex = /(\d[\d.|,]*)/g;
		const data = $(".MuiGrid-root.MuiGrid-container .MuiGrid-root.MuiGrid-item [role='dialog'] [data-testid='sub-text']").text();
		const pageData = data.match(regex);
		if(!pageData) return {} as PageData;
		const providersTemp = pageData[0].replace(",", "");
		const providers = parseInt(providersTemp);
		const average = parseFloat(pageData[1]);
		return {providers, average};
	}

	extractPage(): {pageNumber: number} {
		let extract = this.extractPageV1();
		if (ObjectExtended.isEmpty(extract)) extract = this.extractPageV2();
		return extract;
	}

	extractPageV1(): {pageNumber: number} {
		return {} as {pageNumber: number};
	}

	extractPageV2(): {pageNumber: number} {
		return {} as {pageNumber: number};
	}

}

export default ScrapePageData;