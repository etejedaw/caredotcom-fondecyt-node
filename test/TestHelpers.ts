import GenerateUri from "../src/helpers/GenerateUri";
import Wayback from "../src/helpers/Wayback";
import Getter from "../src/helpers/Getter";
import Save from "../src/utils/Save";
import fs from "fs";
import path from "path";

class TestHelpers {

	static async init() {
		if (!this.checkPublicDir()) this.makePublicDir();
		if (!this.hasPages()) await TestHelpers.downloadHtml();
	}

	static checkPublicDir(): boolean {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		return fs.existsSync(publicDir);
	}

	static hasPages() {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		const contentDir = fs.readdirSync(publicDir);
		return contentDir.length !== 0;
	}

	static makePublicDir() {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		fs.mkdirSync(publicDir);
	}

	static async downloadHtml() {
		const URL = "https://www.care.com";
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		let i = 0;
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
					const iToString = i.toString();
					const j = iToString.padStart(3,"0");
					Save.toHtml(html, `page-${j}`, publicDir);
					i++;
				}
			}
		}
	}

	static itemInFolder(): number {
		if(!this.checkPublicDir() || !this.hasPages()) return 0;
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		const contentDir = fs.readdirSync(publicDir);
		return contentDir.length;
	}

}

export default TestHelpers;