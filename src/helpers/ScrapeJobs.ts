import ExtraData from "../interfaces/ExtraData";
import JobData from "../types/JobData";
import MergeJobData from "../types/MergeJobData";
import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";

class ScrapeJobs {
	readonly #html: string;
	readonly #extraData: ExtraData;

	constructor(html: string, extraData: ExtraData) {
		this.#html = html;
		this.#extraData = extraData;
	}

	getData(): JobData {
		return {} as JobData;
	}

	getMergeData(): MergeJobData[] {
		return [] as MergeJobData[];
	}

	getProviders(): JobProvider[] {
		return [] as JobProvider[];
	}

	getPageData(): JobPageData {
		return {} as JobPageData;
	}

	getExtraData(): ExtraData {
		return this.#extraData;
	}

}

export default ScrapeJobs;