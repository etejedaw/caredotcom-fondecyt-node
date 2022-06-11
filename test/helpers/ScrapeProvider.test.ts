import ScrapeProvider from "../../src/helpers/ScrapeProvider";
import path from "path";
import Load from "../../src/utils/Load";
import TestHelpers from "../TestHelpers";

const publicDir = path.resolve(__dirname, "../../dist/src/public");

describe("ScrapeProvider", () => {

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

	describe("extract()", () => {
		const html = Load.html("page-001", publicDir);
		const scrape = new ScrapeProvider(html);
		const data = scrape.extract();

		it("should return a not empty array", () => {
			const dataLength = data.length;
			expect(dataLength).not.toEqual(0);
		});

		it("should return all providers properties", () => {
			data.forEach(provider => {
				expect(provider).toHaveProperty("age");
				expect(provider).toHaveProperty("experience");
				expect(provider).toHaveProperty("name");
				expect(provider).toHaveProperty("priceRank");
			});
		});

		it("should return the corresponding datatype in properties", () => {
			data.forEach(provider => {
				expect(typeof provider.age).toBe("string");
				expect(typeof provider.experience).toBe("string");
				expect(typeof provider.name).toBe("string");
				expect(typeof provider.priceRank).toBe("string");
			});
		});
	});

	describe("extractData()", () => {
		const itemInFolder = TestHelpers.itemInFolder(publicDir);
		const newItemInFolder = itemInFolder.map(page => page.replace(".html", ""));
		const folderLength = newItemInFolder.length;
		it("should extract the information of all the test pages", () => {
			const match = newItemInFolder.filter(page => {
				const dir = path.resolve(__dirname, publicDir);
				const html = Load.html(page, dir);
				const scrapeProvider = new ScrapeProvider(html);
				const scrape = scrapeProvider.extract();
				if(scrape.length) return page;
			});
			const matchLength = match.length;
			expect(matchLength).toEqual(folderLength);
		});

	});

});

