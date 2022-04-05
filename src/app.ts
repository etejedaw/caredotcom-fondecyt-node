import Wayback from "./utils/Wayback";

const URL = "https://www.care.com/babysitters/new-york-ny";

const main = async () => {
	const wayback = new Wayback(URL);
	const links = await wayback.getUrls();
	console.log(links);
};

main();