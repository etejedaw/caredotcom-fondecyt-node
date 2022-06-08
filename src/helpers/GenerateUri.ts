import Environment from "../config/Environment";
import UriData from "../interfaces/UriData";
import uriData from "../interfaces/UriData";
import DataType from "../enum/DataType";

class GenerateUri {
	readonly #baseUrl: string;
	readonly #environment: Environment;

	constructor(baseUrl: string) {
		this.#baseUrl = baseUrl;
		this.#environment = new Environment();
	}

	getOfferLinks(): Array<UriData> {
		const links = this.#environment.OFFERS.map(offerName => {
			return this.#environment.LOCAL_AREAS.map(localArea => this.#uriCombinations(offerName, localArea, DataType.OFFER));
		});
		return links.flat() as Array<uriData>;
	}

	getJobsLinks(): Array<UriData> {
		const links = this.#environment.JOBS.map(jobName => {
			return this.#environment.LOCAL_AREAS.map(localArea => this.#uriCombinations(jobName, localArea, DataType.JOB));
		});
		return links.flat() as Array<uriData>;
	}

	#uriCombinations(name: string, localArea: string, dataType: DataType): UriData {
		const uri = `${this.#baseUrl}/${name}/${localArea}`;
		const information = name;
		return {uri, dataType, localArea, information};
	}

}

export default GenerateUri;