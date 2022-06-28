import ScrapeProvider from "./ScrapeProvider";
import Provider from "../interfaces/Provider";
import PageData from "../interfaces/PageData";
import ExtraData from "../interfaces/ExtraData";
import Data from "../types/Data";
import MergeData from "../types/MergeData";
import ScrapePageData from "./ScrapePageData";
import ArrayExtended from "../utils/ArrayExtended";

class Scrape {
	readonly #html: string;
	readonly #extraData: ExtraData;

	constructor(html: string, extraData: ExtraData) {
		this.#html = html;
		this.#extraData = extraData;
	}

	getData(): Data {
		const provider = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		const data = {provider, pageData, extraData};
		if(ArrayExtended.isEmpty(provider)) return {} as Data;
		return data;
	}

	getMergeData(): MergeData[] {
		const providers = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if(ArrayExtended.isEmpty(providers)) return [] as MergeData[];
		return providers.map(provider => Object.assign(provider, pageData, extraData));
	}

	getProviders(): Provider[] {
		const scrapeProvider = new ScrapeProvider(this.#html);
		return scrapeProvider.extract();
	}

	getPageData(): PageData {
		const scrapePageData = new ScrapePageData(this.#html);
		return scrapePageData.extract();
	}

	getExtraData(): ExtraData {
		return this.#extraData;
	}

}

export default Scrape;