import fetch, {RequestInit} from "node-fetch";
import TimeTravel, {List} from "../interfaces/TimeTravel";

class Wayback {
	readonly #uri: string;

	constructor(url: string) {
		this.#uri = url;
	}

	async #getUrls(): Promise<TimeTravel> {
		const link = `http://timetravel.mementoweb.org/timemap/json/${this.#uri}`;
		const initOpt: RequestInit = {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		};
		const response = await fetch(link, initOpt);
		return await response.json();
	}

	async getList(): Promise<List[]> {
		try{
			const timeTravel = await this.#getUrls();
			return timeTravel.mementos.list;
		}
		catch (error) {
			return [] as List[];
		}
	}

}

export default Wayback;