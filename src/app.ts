import Scrape from "./helpers/Scrape";
import Environment from "./config/Environment";

async function main() {
	console.info(`Extracting ${Environment.DATA_TYPE.toUpperCase()}`);
	await Scrape.init(Environment.DATA_TYPE);
	console.info("Web Scraper Successfully");
}

void main();
