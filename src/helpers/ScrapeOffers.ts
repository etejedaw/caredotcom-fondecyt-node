import ScrapeOfferProvider from "./ScrapeOfferProvider";
import OfferProvider from "../interfaces/OfferProvider";
import OfferPageData from "../interfaces/OfferPageData";
import ExtraData from "../interfaces/ExtraData";
import OfferData from "../types/OfferData";
import MergeOfferData from "../types/MergeOfferData";
import ScrapeOfferPageData from "./ScrapeOfferPageData";
import ArrayExtended from "../utils/ArrayExtended";

class ScrapeOffers {
	readonly #html: string;
	readonly #extraData: ExtraData;

	constructor(html: string, extraData: ExtraData) {
		this.#html = html;
		this.#extraData = extraData;
	}

	getData(): OfferData {
		const provider = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		const data = {provider, pageData, extraData};
		if(ArrayExtended.isEmpty(provider)) return {} as OfferData;
		return data;
	}

	getMergeData(): MergeOfferData[] {
		const providers = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if(ArrayExtended.isEmpty(providers)) return [] as MergeOfferData[];
		return providers.map(provider => Object.assign(provider, pageData, extraData));
	}

	getProviders(): OfferProvider[] {
		const scrapeProvider = new ScrapeOfferProvider(this.#html);
		return scrapeProvider.extract();
	}

	getPageData(): OfferPageData {
		const scrapePageData = new ScrapeOfferPageData(this.#html);
		return scrapePageData.extract();
	}

	getExtraData(): ExtraData {
		return this.#extraData;
	}

}

export default ScrapeOffers;