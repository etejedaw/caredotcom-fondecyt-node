import ScrapeProvider from "./ScrapeProvider";
import Provider from "../interfaces/Provider";
import PageData from "../interfaces/PageData";
import ExtraData from "../interfaces/ExtraData";

class Scrape {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	init() {
		const provider = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		return {
			...provider,
			...pageData,
			...extraData
		};
	}

	getProviders(): Provider[] {
		const scrapeProvider = new ScrapeProvider(this.#html);
		return scrapeProvider.init();
	}

	getPageData(): PageData[] {
		return [];
	}

	getExtraData(): ExtraData[] {
		return [];
	}
}

export default Scrape;