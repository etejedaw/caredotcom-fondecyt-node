import Wayback from "./helpers/Wayback";
import GenerateUri from "./helpers/GenerateUri";
import Getter from "./helpers/Getter";
import Sleep from "./utils/Sleep";
import Save from "./utils/Save";

const URL = "https://www.care.com";

const main = async () => {

	const generateUri = new GenerateUri(URL); //Genera las combinaciones de links

	let count = 0;

	for (const link of generateUri.getLinks()) {
		const wayback = new Wayback(link); //Solicita las URI en Wayback Machine
		const list = await wayback.getList();
		if(list.length !== 0) {
			for (const url of list) { //Recorre cada url de la lista obtenida por Wayback Machine
				const pageUrl = url.uri;
				const page = await Getter.build(pageUrl);
				Save.saveHtml(page.html, `page-${count}`);
				count++;
				await Sleep.sleep(2000);
			}
		}
		await Sleep.sleep(4000);
	}
};

main();