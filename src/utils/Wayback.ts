import fetch from "node-fetch";
import TimeTravel from "../interfaces/TimeTravel";

class Wayback{
	readonly #uri: string;

	constructor(url: string) {
		this.#uri = url;
	}

	get url(){
		return this.#uri;
	}

	async getUrls(): Promise<TimeTravel>{
		const link = `http://timetravel.mementoweb.org/timemap/json/${this.#uri}`;
		const response = await fetch(link);
		return await response.json();
	}

}

export default Wayback;