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
		const link = `https://web.archive.org/web/timemap/json/${this.#uri}`;
		const requestInit: RequestInit = {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		};
		const response = await fetch(link, requestInit);
		const json = await response.json() as Array<Array<string>>;
		return this.#normalizeData(json);
	}

	#normalizeData(array: Array<Array<string>>): TimeTravel {
		array.shift();
		const list = array.map(data => {
			if(data.length != 11) return;
			const datetime = new Date(this.#normalizeDate(data[1]));
			const uri = `http://web.archive.org/web/${data[1]}/${data[2]}`;
			return {datetime, uri} as List;
		});
		return {
			original_uri: this.#uri,
			timegate_uri: " ",
			timemap_uri: { json_format: `https://web.archive.org/web/timemap/json/${this.#uri}`},
			mementos: {list}
		} as TimeTravel;
	}

	#normalizeDate(date: string): string {
		const year = date.slice(0,4);
		const month = date.slice(4,6);
		const day = date.slice(6,8);
		const hour = date.slice(8,10);
		const minute = date.slice(10,12);
		const second = date.slice(12,14);
		return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
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