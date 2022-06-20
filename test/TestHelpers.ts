import GenerateUri from "../src/helpers/GenerateUri";
import Wayback from "../src/helpers/Wayback";
import Getter from "../src/helpers/Getter";
import Save from "../src/utils/Save";
import fs from "fs";
import path from "path";

class TestHelpers {

	static async init(dir: string) {
		if (!this.checkPublicDir(dir)) this.makePublicDir(dir);
		if (!this.hasPages(dir)) await TestHelpers.downloadHtml(dir);
	}

	static checkPublicDir(dir: string): boolean {
		const publicDir = dir || path.resolve(__dirname, dir);
		return fs.existsSync(publicDir);
	}

	static hasPages(dir: string) {
		const publicDir = dir || path.resolve(__dirname, dir);
		const contentDir = fs.readdirSync(publicDir);
		return contentDir.length !== 0;
	}

	static makePublicDir(dir: string) {
		const publicDir = dir || path.resolve(__dirname, dir);
		fs.mkdirSync(publicDir);
	}

	static async downloadHtml(dir: string) {
		const URL = "https://www.care.com";
		const publicDir = dir || path.resolve(__dirname, dir);
		let counter = 0;
		const generateUri = new GenerateUri(URL);
		const offerList = generateUri.getOfferLinks();
		for(const {uri} of offerList) {
			const wayback = new Wayback(uri);
			const list = await wayback.getList();
			if(list.length !== 0) {
				for (const url of list) {
					const pageUrl = url.uri;
					const getter = await Getter.build(pageUrl);
					const html = getter.html;
					const counterToString = counter.toString();
					const counterToFormat = counterToString.padStart(3,"0");
					if(html) {
						Save.toHtml(html, `page-${counterToFormat}`, publicDir);
						counter++;
					}
				}
			}
		}
	}

	static itemInFolder(dir: string): Array<string> {
		const publicDir = dir || path.resolve(__dirname, "../dist/src/public");
		if(!this.checkPublicDir(dir) || !this.hasPages(dir)) return [];
		return fs.readdirSync(publicDir);
	}

}

export default TestHelpers;