import Environment from "../config/Environment";

class GenerateUri {
	readonly #baseUrl: string;
	readonly #environment: Environment;

	constructor(baseUrl: string) {
		this.#baseUrl = baseUrl;
		this.#environment = new Environment();
	}

	getLinks(): Array<string> {
		const links = [] as Array<string>;
		this.#environment.OFFERS.forEach(offer => {
			this.#environment.LOCAL_AREAS.forEach(localArea => {
				const uri = `${this.#baseUrl}/${offer}/${localArea}`;
				links.push(uri);
			});
		});
		return links;
	}

}

export default GenerateUri;