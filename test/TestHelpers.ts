import GenerateUri from "../src/helpers/GenerateUri";
import Wayback from "../src/helpers/Wayback";
import Getter from "../src/helpers/Getter";
import Save from "../src/utils/Save";
import fs from "fs";
import path from "path";

class TestHelpers {
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
					Save.toHtml(html, `page-${i}`, publicDir);
					i++;
				}
			}
		}
	}

	static checkPublicDir(): boolean {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		return fs.existsSync(publicDir);
	}

	static makePublicDir() {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		fs.mkdirSync(publicDir);
	}

	static hasPages() {
		const publicDir = path.resolve(__dirname, "../dist/src/public");
		const contentDir = fs.readdirSync(publicDir);
		return contentDir.length !== 0;
	}

}

export default TestHelpers;