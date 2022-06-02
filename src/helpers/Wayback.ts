import fetch, {RequestInit} from "node-fetch";
import TimeTravel, {List} from "../interfaces/TimeTravel";

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
		const newList = list.filter((item, index, self) => {
			const datetime = item.datetime;
			const formatDate = `${datetime.getFullYear()}-${datetime.getUTCMonth()+1}-${datetime.getUTCDate()}`;
			return index === self.findIndex(t => {
				const newDatetime = t.datetime;
				const newFormatDate =`${newDatetime.getFullYear()}-${newDatetime.getUTCMonth()+1}-${newDatetime.getUTCDate()}`;
				return formatDate === newFormatDate;
			});
		});
		return newList;
	}

}

export default Wayback;