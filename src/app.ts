import Wayback from "./helpers/Wayback";
import GenerateUri from "./helpers/GenerateUri";
import Getter from "./helpers/Getter";
import Sleep from "./utils/Sleep";
import Save from "./utils/Save";
import Scrape from "./helpers/Scrape";
import Csv from "./utils/Csv";

const URL = "https://www.care.com";

const main = async () => {

	const emptyUri: any = [];
	const emptyScrape: any = [];
	const dataArray: any = [];

	const generateUri = new GenerateUri(URL);
	const uris = generateUri.getLinks();

	for (const uri of uris) {
		const wayback = new Wayback(uri);
		const list = await wayback.getList();
		if (list.length !== 0) {
			for (const url of list) {
				const pageUrl = url.uri;
				const getter = await Getter.build(pageUrl);
				const html = getter.html;
				const scrape = new Scrape(html);
				const data = scrape.extractData();
				if (data.length !== 0) dataArray.push(...data);
				else emptyScrape.push(url.uri);
			}
		}
		else emptyUri.push(uri);
		await Sleep.sleep(4000);
	}

	const dataCsv = Csv.toCsv(dataArray);
	Save.toCsv(dataCsv, "data");

};

main();