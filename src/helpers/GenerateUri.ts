import Environment from "../config/Environment";
import UriData from "../interfaces/UriData";
import DataType from "../enum/DataType";
import uriData from "../interfaces/UriData";

class GenerateUri {
	readonly #baseUrl: string;
	readonly #environment: Environment;

	constructor(baseUrl: string) {
		this.#baseUrl = baseUrl;
		this.#environment = new Environment();
	}

	getOfferLinks(): Array<UriData> {
		const links = this.#environment.OFFERS.map(offerName => {
			return this.#environment.LOCAL_AREAS.map(localArea => {
				const uri = `${this.#baseUrl}/${offerName}/${localArea}`;
				const dataType = DataType.OFFER;
				const information = offerName;
				return {uri, dataType, localArea, information};
			});
		});
		return links.flat() as Array<uriData>;
	}

	getJobsLinks(): Array<UriData> {
		const links = this.#environment.JOBS.map(jobName => {
			return this.#environment.LOCAL_AREAS.map(localArea => {
				const uri = `${this.#baseUrl}/${jobName}/${localArea}`;
				const dataType = DataType.JOB;
				const information = jobName;
				return {uri, dataType, localArea, information};
			});
		});
		return links.flat() as Array<uriData>;
	}

}

export default GenerateUri;