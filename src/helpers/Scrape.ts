import GenerateUri from "./GenerateUri";
import Environment from "../config/Environment";
import Wayback from "./Wayback";
import ExtraData from "../interfaces/ExtraData";
import Sleep from "../utils/Sleep";
import Getter from "./Getter";
import ScrapeOffers from "./ScrapeOffers";
import ArrayExtended from "../utils/ArrayExtended";
import SaveType from "../types/SaveType";
import Save from "../utils/Save";
import MergeData from "../types/MergeData";
import OfferProvider from "../interfaces/OfferProvider";
import OfferPageData from "../interfaces/OfferPageData";
import ScrapeJobs from "./ScrapeJobs";
import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";

class Scrape {
	static async initOffers() {
		const generateUri = new GenerateUri(Environment.URL);
		const offerLinks = generateUri.getOfferLinks();
		let allData = [] as MergeData<OfferProvider, OfferPageData>[];
		for (const offer of offerLinks) {
			const uri = offer.uri;
			const localArea = offer.localArea;
			const information = offer.information;
			const wayback = new Wayback(uri);
			const list = await wayback.getList();
			if(list.length !== 0) {
				for (const link of list) {
					const url = link.uri;
					const date = link.datetime;
					const extraData = {localArea, date, information} as ExtraData;
					await Sleep.sleep(4000);
					const getter = await Getter.build(url);
					const html = getter.html;
					if (html) {
						const scrape = new ScrapeOffers(html, extraData);
						const data = scrape.getMergeData();
						allData = allData.concat(data);
						const csv = ArrayExtended.jsonToCsv(allData);
						const saveType = {
							data: csv,
							name: "offers",
							dir: Environment.OUTPUT_DIR
						} as SaveType;
						Save.toCsv(saveType);
						console.info("CSV Updated");
					} else console.error(`CANT EXTRACT: ${url}`);
				}
			}
			else console.error(`NOT FOUND: ${uri}`);
		}
	}

	static async initJobs() {
		const generateUri = new GenerateUri(Environment.URL);
		const jobLinks = generateUri.getJobsLinks();
		let allData = [] as MergeData<JobProvider, JobPageData>[];
		for (const job of jobLinks) {
			const uri = job.uri;
			const localArea = job.localArea;
			const information = job.information;
			const wayback = new Wayback(uri);
			const list = await wayback.getList();
			if (list.length !== 0) {
				for (const link of list) {
					const url = link.uri;
					const date = link.datetime;
					const extraData = {localArea, date, information} as ExtraData;
					await Sleep.sleep(4000);
					const getter = await Getter.build(url);
					const html = getter.html;
					if(html) {
						const scrape = new ScrapeJobs(html, extraData);
						const data = scrape.getMergeData();
						allData = allData.concat(data);
						const csv = ArrayExtended.jsonToCsv(allData);
						const saveType = {
							data: csv,
							name: "jobs",
							dir: Environment.OUTPUT_DIR
						} as SaveType;
						Save.toCsv(saveType);
						console.info("CSV Updated");
					}
					else console.error(`CANT EXTRACT: ${url}`);
				}
			}
			else console.error(`NOT FOUND: ${uri}`);
		}
	}

}

export default Scrape;