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
		if(list.length !== 0){
			for (const url of list){ //Recorre cada url de la lista obtenida por Wayback Machine
				const pageUrl = url.uri;
				const page = await Getter.build(pageUrl);
				Save.saveHtml(page.html, `page-${count}`);
				count++;
				await Sleep.sleep(4000);
			}
		}
		await Sleep.sleep(4000);
	}

/*
	const generateUri = new GenerateUri(URL);

	// Example 1

	const uri1 = generateUri.getLinks()[0];
	const wayback1 = new Wayback(uri1);
	const links1 = await wayback1.getList();
	const link1 = links1[0].uri;

	const page1 = await Getter.build(link1);

	Save.saveHtml(page1.html, "page1");

	//
	await Sleep.sleep(4000);
	//
	//Example 2

	const uri2 = generateUri.getLinks()[2];
	const wayback2 = new Wayback(uri2);
	const links2 = await wayback2.getList();
	const link2 = links2[0].uri;

	const page2 = await Getter.build(link2);

	Save.saveHtml(page2.html, "page2");



 */
};

main();