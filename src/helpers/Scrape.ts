import Environment from "../config/Environment";
import ArrayExtended from "../utils/ArrayExtended";
import DataType from "../enum/DataType";
import ScrapeHelper from "./ScrapeHelper";

class Scrape {
	static async init(dataType: DataType) {
		const dataLinks = ScrapeHelper.getLinks(dataType);
		for (const data of dataLinks) {
			console.info(`Searching Archive links in: ${data.uri}`);
			const list = await ScrapeHelper.getWaybackList(data.uri);
			ScrapeHelper.createCsv(
				dataType,
				data.information,
				Environment.OUTPUT_DIR
			);
			if (list.length !== 0) {
				for (const link of list) {
					const extraData = ScrapeHelper.generateExtraData(data, link);
					const html = await ScrapeHelper.getHtml(link.uri);
					if (html) {
						const dataScraped = ScrapeHelper.scrapeData(
							html,
							extraData,
							dataType
						);
						let csv: string;
						if (dataScraped.length === 0) csv = "";
						else csv = ArrayExtended.jsonToCsv(dataScraped);
						const dir = ScrapeHelper.generateDir(dataType, data.information);
						ScrapeHelper.addToCsv(dir, csv);
						console.info(`CSV Updated. Extracted: ${link.uri}`);
					} else console.error(`Can't Extract: ${link.uri}`);
				}
			} else console.error(`Not Found: ${data.uri}`);
		}
	}
}

export default Scrape;
