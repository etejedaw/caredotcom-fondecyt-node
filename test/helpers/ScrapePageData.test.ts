import ScrapePageData from "../../src/helpers/ScrapePageData";

describe("Empty ScrapePageData", () => {
	const html = "";

	describe("extract()", () => {
		it("should return an 'No Data' object if html is empty", () => {
			const scrapePageData = new ScrapePageData(html);
			const pageData = scrapePageData.extract();
			expect(pageData.providers).toBe("No Data");
			expect(pageData.average).toBe("No Data");
		});
	});

});