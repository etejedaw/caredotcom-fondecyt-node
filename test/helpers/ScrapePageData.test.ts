import ScrapePageData from "../../src/helpers/ScrapePageData";
import path from "path";
import Load from "../../src/utils/Load";
import TestHelpers from "../TestHelpers";
import Scrape from "../../src/helpers/Scrape";

const publicDir = path.resolve(__dirname, "../../dist/src/public");

describe("ScrapePageData", () => {

	describe("public dir", () => {
		it("should exists the public folder in dist/", () => {
			const checkPublicDir = TestHelpers.checkPublicDir(publicDir);
			expect(checkPublicDir).toEqual(true);
		});

		it("should exists pages saves in public folders", () => {
			const itemInFolder = TestHelpers.itemInFolder(publicDir);
			expect(itemInFolder).not.toEqual(0);
		});
	});

	describe("extractData()", () => {
		const itemInFolder = TestHelpers.itemInFolder(publicDir);
		const newItemInFolder = itemInFolder.map(page => page.replace(".html", ""));
		const folderLength = newItemInFolder.length;
		it("should extract the data information of all the test pages", () => {
			const match = newItemInFolder.filter(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrapeProvider = new ScrapePageData(html);
				const scrape = scrapeProvider.extractData();
				if(Object.keys(scrape).length) return page;
			});
			const matchLength = match.length;
			expect(matchLength).toEqual(folderLength);
		});
	});

	describe("extractPage()", () => {
		const itemInFolder = TestHelpers.itemInFolder(publicDir);
		const newItemInFolder = itemInFolder.map(page => page.replace(".html", ""));
		const folderLength = newItemInFolder.length;
		it("should extract the page information of all the test pages", () => {
			const match = newItemInFolder.filter(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrapePageData = new ScrapePageData(html);
				const scrape = scrapePageData.extractPage();
				if(Object.keys(scrape).length) return page;
			});
			const matchLength = match.length;
			expect(matchLength).toEqual(folderLength);
		});
	});

	describe("extract()", () => {
		const itemInFolder = TestHelpers.itemInFolder(publicDir);
		const newItemInFolder = itemInFolder.map(page => page.replace(".html", ""));
		it("should return a not empty object", () => {
			newItemInFolder.forEach(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrape = new ScrapePageData(html);
				const data = scrape.extract();
				const dataLength = Object.keys(data).length;
				expect(dataLength).not.toEqual(0);
			});
		});

		it("should return all properties", () => {
			newItemInFolder.forEach(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrape = new ScrapePageData(html);
				const data = scrape.extract();
				expect(data).toHaveProperty("pageNumber");
				expect(data).toHaveProperty("providers");
				expect(data).toHaveProperty("average");
			});
		});

		it("should return the corresponding datatype in properties", () => {
			newItemInFolder.forEach(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrape = new ScrapePageData(html);
				const data = scrape.extract();
				expect(typeof data.pageNumber).toHaveProperty("number");
				expect(typeof data.providers).toHaveProperty("number");
				expect(typeof data.average).toHaveProperty("number");
			});
		});

	});

});