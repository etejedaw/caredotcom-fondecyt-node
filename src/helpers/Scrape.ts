import GenerateUri from "./GenerateUri";
import Environment from "../config/Environment";
import Wayback from "./Wayback";
import ExtraData from "../interfaces/ExtraData";
import Sleep from "../utils/Sleep";
import Getter from "./Getter";
import ArrayExtended from "../utils/ArrayExtended";
import SaveType from "../types/SaveType";
import Save from "../utils/Save";
import MergeData from "../types/MergeData";
import ScrapeJobs from "./ScrapeJobs";
import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";
import DataType from "../enum/DataType";
import ScrapeHelper from "./ScrapeHelper";

class Scrape {
	static async initOffers() {
		const offerLinks = ScrapeHelper.getLinks(DataType.OFFER);
		for (const offer of offerLinks) {
			const list = await ScrapeHelper.getWaybackList(offer.uri);
			ScrapeHelper.createCsv(DataType.OFFER, offer.information, Environment.OUTPUT_DIR);
			if(list.length !== 0) {
				for (const link of list) {
					const extraData = ScrapeHelper.generateExtraData(offer, link);
					const html = await ScrapeHelper.getHtml(link.uri);
					if (html) {
						const data = ScrapeHelper.scrapeData(html, extraData);
						let csv: string;
						if(data.length === 0) csv = "";
						else csv = ArrayExtended.jsonToCsv(data);
						const dir = ScrapeHelper.generateDir(DataType.OFFER, offer.information);
						ScrapeHelper.addToCsv(dir, csv);
						console.info("CSV Updated");
					}
					else console.error(`CANT EXTRACT: ${link.uri}`);
				}
			}
			else console.error(`NOT FOUND: ${offer.uri}`);
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
					const extraData = {localArea, date, information, url} as ExtraData;
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