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
import ObjectExtended from "../utils/ObjectExtended";
import MergeData from "../types/MergeData";
import OfferProvider from "../interfaces/OfferProvider";
import OfferPageData from "../interfaces/OfferPageData";
import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";
import ScrapeJobs from "./ScrapeJobs";

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

	static scrapeData(html: string, extraData: ExtraData, dataType: DataType) {
		switch (dataType) {
		  case DataType.JOB: {
			const scrape = new ScrapeJobs(html, extraData);
			return scrape.getMergeData();
		  }
		  case DataType.OFFER: {
			const scrape = new ScrapeOffers(html, extraData);
			return scrape.getMergeData();
		  }
		  default: throw new Error("Invalid Option");
		}
	}

	static createCsv(dataType: DataType, information: string, dir: string) {
		const name = `${dataType}-${information}.csv`;
		const dirName = `${dir}/${name}`;
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
		if (!fs.existsSync(dirName)) {
			const header = this.generateHeader(dataType);
			fs.writeFileSync(dirName, header);
			console.info(`> ${name} CREATED`);
		}
	}

	static generateHeader(dataType: DataType): string {
		switch (dataType) {
			case DataType.OFFER: return ObjectExtended.toCsv({
				name: null,
				priceRank: null,
				experience: null,
				age: null,
				providers: null,
				average: null,
				url: null,
				date: null,
				localArea: null,
				information: null,
			} as unknown as MergeData<OfferProvider, OfferPageData>).concat("\n");
			case DataType.JOB: return ObjectExtended.toCsv({
				title: null,
				workSchedule: null,
				priceRank: null,
				providers: null,
				localArea: null,
				date: null,
				information: null,
				url: null
			} as unknown as MergeData<JobProvider, JobPageData>).concat("\n");
			default: throw new Error("Bad option");
		}
	}

	static generateDir(dataType: DataType, information: string): string {
		return `${Environment.OUTPUT_DIR}/${dataType}-${information}.csv`;
	}

	static addToCsv(dir: string, data: string) {
		const line = data.split("\n");
		line.splice(0,1);
		const newData = line.join("\n");
		if (newData.length === 0) return;
		fs.appendFileSync(dir, newData.concat("\n"));
	}
}

export default ScrapeHelper;