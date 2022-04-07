import Wayback from "./utils/Wayback";
import GenerateUri from "./utils/GenerateUri";

const URL = "https://www.care.com";

const main = async () => {

	const generateUri = new GenerateUri(URL); //Genera las combinaciones de links

	for (const link of generateUri.getLinks()) {
		const wayback = new Wayback(link); //Solicita las URI en Wayback Machine
		const list = await wayback.getList();
		if(list.length !== 0)  console.log(list[0]);
		await sleep(4000);
	}

};

const sleep = async (milliseconds: number) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

main();