import fetch, {RequestInit} from "node-fetch";
import TimeTravel, {List} from "../interfaces/TimeTravel";
import DateTime from "../utils/DateTime";
import dateTime from "../utils/DateTime";

class Wayback {
	readonly #uri: string;

	constructor(url: string) {
		this.#uri = url;
	}

	async getList(): Promise<List[]> {
		const fullList = await this.getFullList();
		return this.#checkRepeat(fullList);
	}

	async getFullList(): Promise<List[]> {
		try{
			const getUrl = await this.#getUrls();
			return this.#normalizeDate(getUrl.mementos.list);
		}
		catch (error) {
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

	#normalizeDate(list: List[]): List[] {
		const newList = list.map(data => {
			const uri = data.uri;
			const datetime = new Date(data.datetime);
			return {uri, datetime};
		});
		return [...newList];
	}

	#checkRepeat(list: List[]): List[] {
		return list.filter((item, index, self) => {
			const datetime = item.datetime;
			const formatDate = DateTime.toStandardString(datetime);
			return index === self.findIndex(newItem => {
				const newDatetime = newItem.datetime;
				const newFormatDate = DateTime.toStandardString(newDatetime);
				return formatDate === newFormatDate;
			});
		});
	}

}

export default Wayback;