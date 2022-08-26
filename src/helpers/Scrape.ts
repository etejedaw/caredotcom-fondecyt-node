import Environment from "../config/Environment";
import ArrayExtended from "../utils/ArrayExtended";
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
						const data = ScrapeHelper.scrapeData(html, extraData, DataType.OFFER);
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
		const jobLinks = ScrapeHelper.getLinks(DataType.JOB);
		for (const job of jobLinks) {
			const list = await ScrapeHelper.getWaybackList(job.uri);
			ScrapeHelper.createCsv(DataType.JOB, job.information, Environment.OUTPUT_DIR);
			if (list.length !== 0) {
				for (const link of list) {
					const extraData = ScrapeHelper.generateExtraData(job, link);
					const html = await ScrapeHelper.getHtml(link.uri);
					if(html) {
						const data = ScrapeHelper.scrapeData(html, extraData, DataType.JOB);
						let csv: string;
						if(data.length === 0) csv = "";
						else csv = ArrayExtended.jsonToCsv(data);
						const dir = ScrapeHelper.generateDir(DataType.JOB, job.information);
						ScrapeHelper.addToCsv(dir, csv);
						console.info("CSV Updated");
					}
					else console.error(`CANT EXTRACT: ${job.uri}`);
				}
			}
			else console.error(`NOT FOUND: ${job.uri}`);
		}
	}

}

export default Scrape;