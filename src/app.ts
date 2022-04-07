import Wayback from "./helpers/Wayback";
import GenerateUri from "./helpers/GenerateUri";
import Sleep from "./utils/Sleep";

const URL = "https://www.care.com";

const main = async () => {

	const generateUri = new GenerateUri(URL); //Genera las combinaciones de links

	for (const link of generateUri.getLinks()) {
		const wayback = new Wayback(link); //Solicita las URI en Wayback Machine
		const list = await wayback.getList();
		if(list.length !== 0)  console.log(list[0]);
		await Sleep.sleep(4000);
	}

};

main();