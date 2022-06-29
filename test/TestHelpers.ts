import GenerateUri from "../src/helpers/GenerateUri";
import Wayback from "../src/helpers/Wayback";
import Getter from "../src/helpers/Getter";
import Save from "../src/utils/Save";
import fs from "fs";
import SaveType from "../src/types/SaveType";
import DataType from "../src/enum/DataType";
import UriData from "../src/interfaces/UriData";

class TestHelpers {

	static checkPublicDir(publicDir: string): boolean {
		return fs.existsSync(publicDir);
	}

	static hasPages(publicDir: string) {
		const contentDir = fs.readdirSync(publicDir);
		return contentDir.length !== 0;
	}

	static makePublicDir(publicDir: string) {
		fs.mkdirSync(publicDir);
	}

	static async downloadHtml(publicDir: string, dataType: DataType) {
		const URL = "https://www.care.com";
		let counter = 0;
		const generateUri = new GenerateUri(URL);
		let list = [] as UriData[];
		switch (dataType) {
			case DataType.OFFER: {
				list = generateUri.getOfferLinks();
				break;
			}
			case DataType.JOB: {
				list = generateUri.getJobsLinks();
				break;
			}
			default: throw new Error("Invalid Option");

		}
		for(const {uri} of list) {
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
						const saveType: SaveType = {
							data: html,
							name: `page-${counterToFormat}`,
							dir: publicDir
						};
						Save.toHtml(saveType);
						counter++;
					}
				}
			}
		}
	}

	static itemInFolder(dir: string): Array<string> {
		if(!this.checkPublicDir(dir) || !this.hasPages(dir)) return [];
		return fs.readdirSync(dir);
	}

}

export default TestHelpers;