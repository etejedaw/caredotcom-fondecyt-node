import ScrapeOfferProvider from "./ScrapeOfferProvider";
import OfferProvider from "../interfaces/OfferProvider";
import OfferPageData from "../interfaces/OfferPageData";
import ExtraData from "../interfaces/ExtraData";
import Data from "../types/Data";
import ScrapeOfferPageData from "./ScrapeOfferPageData";
import ArrayExtended from "../utils/ArrayExtended";
import MergeData from "../types/MergeData";

class ScrapeOffers {
	readonly #html: string;
	readonly #extraData: ExtraData;

	constructor(html: string, extraData: ExtraData) {
		this.#html = html;
		this.#extraData = extraData;
	}

	getData(): Data<OfferProvider, OfferPageData> {
		const provider = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if(ArrayExtended.isEmpty(provider)) return {} as Data<OfferProvider, OfferPageData>;
		return {provider, pageData, extraData} as Data<OfferProvider, OfferPageData>;
	}

	getMergeData(): MergeData<OfferProvider, OfferPageData>[] {
		const providers = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if(ArrayExtended.isEmpty(providers)) return [] as MergeData<OfferProvider, OfferPageData>[];
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