import Environment from "../config/Environment";
import UriData from "../interfaces/UriData";
import DataType from "../enum/DataType";

class GenerateUri {
	readonly #baseUrl: string;

	constructor(baseUrl: string) {
		this.#baseUrl = baseUrl;
	}

	getOfferLinks(): Array<UriData> {
		const links = Environment.OFFERS.map(offerName => {
			return Environment.LOCAL_AREAS.map(localArea => this.#uriCombinations(offerName, localArea, DataType.OFFER));
		});
		return links.flat();
	}

	getJobsLinks(): Array<UriData> {
		const links = Environment.JOBS.map(jobName => {
			return Environment.LOCAL_AREAS.map(localArea => this.#uriCombinations(jobName, localArea, DataType.JOB));
		});
		return links.flat();
	}

	#uriCombinations(name: string, localArea: string, dataType: DataType): UriData {
		const uri = `${this.#baseUrl}/${name}/${localArea}`;
		const information = name;
		return {uri, dataType, localArea, information};
	}

}

export default GenerateUri;