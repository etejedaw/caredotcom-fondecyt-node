import fetch, {RequestInit} from "node-fetch";
import TimeTravel, {List} from "../interfaces/TimeTravel";
import DateTime from "../utils/DateTime";

class Wayback {
	readonly #uri: string;

	constructor(url: string) {
		this.#uri = url;
	}

	async getList(): Promise<List[]> {
		const fullList = await this.getFullList();
		const list = fullList.map(this.#transformDate);
		return list.filter(this.#checkDateRepeat);
	}

	async getFullList(): Promise<List[]> {
		try{
			const getUrl = await this.#getUrls();
			return getUrl.mementos.list;
		}
		catch {
			return [] as List[];
		}
	}

	async #getUrls(): Promise<TimeTravel> {
		const link = `http://timetravel.mementoweb.org/timemap/json/${this.#uri}`;
		const requestInit: RequestInit = {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		};
		const response = await fetch(link, requestInit);
		return await response.json();
	}

	#transformDate(item: List): List {
		const uri = item.uri;
		const datetime = new Date(item.datetime);
		return {uri, datetime};
	}

	#checkDateRepeat(item: List, index: number, self: List[]): boolean {
		const datetime = item.datetime;
		const formatDate = DateTime.toStandardString(datetime);
		return index === self.findIndex(newItem => {
			const newDatetime = newItem.datetime;
			const newFormatDate = DateTime.toStandardString(newDatetime);
			return formatDate === newFormatDate;
		});
	}

}

export default Wayback;