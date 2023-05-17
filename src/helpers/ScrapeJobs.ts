import ExtraData from "../interfaces/ExtraData";
import Data from "../types/Data";
import MergeData from "../types/MergeData";
import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";
import ArrayExtended from "../utils/ArrayExtended";
import ScrapeJobProvider from "./ScrapeJobProvider";
import ScrapeJobPageData from "./ScrapeJobPageData";

class ScrapeJobs {
	readonly #html: string;
	readonly #extraData: ExtraData;

	constructor(html: string, extraData: ExtraData) {
		this.#html = html;
		this.#extraData = extraData;
	}

	getData(): Data<JobProvider, JobPageData> {
		const provider = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if (ArrayExtended.isEmpty(provider))
			return {} as Data<JobProvider, JobPageData>;
		return { provider, pageData, extraData } as Data<JobProvider, JobPageData>;
	}

	getMergeData(): MergeData<JobProvider, JobPageData>[] {
		const providers = this.getProviders();
		const pageData = this.getPageData();
		const extraData = this.getExtraData();
		if (ArrayExtended.isEmpty(providers))
			return [] as MergeData<JobProvider, JobPageData>[];
		return providers.map(provider =>
			Object.assign(provider, pageData, extraData)
		);
	}

	getProviders(): JobProvider[] {
		const scrapeProvider = new ScrapeJobProvider(this.#html);
		return scrapeProvider.extract();
	}

	getPageData(): JobPageData {
		const scrapePageData = new ScrapeJobPageData(this.#html);
		return scrapePageData.extract();
	}

	getExtraData(): ExtraData {
		return this.#extraData;
	}
}

export default ScrapeJobs;
