import DataType from "../enum/DataType";
import GenerateUri from "./GenerateUri";
import Environment from "../config/Environment";
import { List } from "../interfaces/TimeTravel";
import Wayback from "./Wayback";
import UriData from "../interfaces/UriData";
import ExtraData from "../interfaces/ExtraData";
import Sleep from "../utils/Sleep";
import Getter from "./Getter";
import ScrapeOffers from "./ScrapeOffers";
import fs from "fs";

class ScrapeHelper {
	static getLinks(dataType: DataType) {
		const generateUri = new GenerateUri(Environment.URL);
		switch (dataType) {
			case DataType.JOB:
				return generateUri.getJobsLinks();
			case DataType.OFFER:
				return generateUri.getOfferLinks();
			default:
				throw new Error("No dataType option selected");
		}
	}

	static async getWaybackList(url: string): Promise<List[]> {
		const wayback = new Wayback(url);
		return await wayback.getList();
	}

	static generateExtraData(uriData: UriData, link: List): ExtraData {
		return {
			url: link.uri,
			date: link.datetime,
			localArea: uriData.localArea,
			information: uriData.information
		} as ExtraData;
	}

	static async getHtml(link: string): Promise<string | undefined> {
		await Sleep.sleep(400);
		const getter = await Getter.build(link);
		return getter.html;
	}

	static scrapeData(html: string, extraData: ExtraData) {
		const scrape = new ScrapeOffers(html, extraData);
		return scrape.getMergeData();
	}

	static createCsv(dataType: DataType, information: string, dir: string) {
		const name = `${dataType}-${information}.csv`;
		const dirName = `${dir}/${name}`;
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
		if (!fs.existsSync(dirName)) fs.writeFileSync(dirName, "");
	}

	static generateDir(dataType: DataType, information: string): string {
		return `${Environment.OUTPUT_DIR}/${DataType.OFFER}-${information}.csv`;
	}

	static addToCsv(dir: string, data: string) {
		fs.appendFileSync(dir, data.concat("\n"));
	}
}

export default ScrapeHelper;