import ScrapeProvider from "./ScrapeProvider";
import Provider from "../interfaces/Provider";
import PageData from "../interfaces/PageData";
import ExtraData from "../interfaces/ExtraData";
import Data from "../types/Data";
import MergeData from "../types/MergeData";

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
		return {provider, pageData, extraData};
	}

	getMergeData(): MergeData[] {
		const providers = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		return providers.map(provider => Object.assign(provider, pageData, extraData));
	}

	getProviders(): Provider[] {
		const scrapeProvider = new ScrapeProvider(this.#html);
		return scrapeProvider.extract();
	}

	getPageData(): PageData {
		return {} as PageData;
	}

	getExtraData(): ExtraData {
		return this.#extraData;
	}
}

export default Scrape;