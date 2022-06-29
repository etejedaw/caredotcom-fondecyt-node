import ScrapeOfferPageData from "../../src/helpers/ScrapeOfferPageData";

describe("Empty ScrapeOfferPageData", () => {
	const html = "";

	describe("extract()", () => {
		it("should return an 'No OfferData' object if html is empty", () => {
			const scrapePageData = new ScrapeOfferPageData(html);
			const pageData = scrapePageData.extract();
			expect(pageData.providers).toBe("No OfferData");
			expect(pageData.average).toBe("No OfferData");
		});
	});

});