import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const MAIN_URL = "https://web.archive.org/web/2021*/https://www.care.com/babysitters/new-york-ny";

async function main() {
	await extractWeb();
}

const extractWeb = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(MAIN_URL);
	const content = await page.content();

	const dir = path.resolve(__dirname, "../public");
	const saveDir = `${dir}/page.html`;
	if(!fs.existsSync(dir)) fs.mkdirSync(dir);
	fs.writeFileSync(saveDir, content);
	console.log(`saved in ${saveDir}`);

	await browser.close();
	console.log("navegador cerrado");
};

main();