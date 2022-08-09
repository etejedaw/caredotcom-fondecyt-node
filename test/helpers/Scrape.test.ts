import ExtraData from "../../src/interfaces/ExtraData";
import ScrapeOffers from "../../src/helpers/ScrapeOffers";

describe("Empty ScrapeOffers", () => {
	const html = "";
	const extraData = {
		localArea: "new-york-ny",
		date: new Date(),
		information: "child-care"
	} as ExtraData;

	describe("getData()", () => {
		it("should return an empty object if html is empty", () => {
			const scrape = new ScrapeOffers(html, extraData);
			const data = scrape.getData();
			expect(data).toEqual({});
		});
	});

	describe("getMergeData()", () => {
		it("should return an empty array if html is empty", () => {
			const scrape = new ScrapeOffers(html, extraData);
			const data = scrape.getMergeData();
			expect(data).toEqual([]);
		});
	});

	describe("getProviders()", () => {
		it("should return an empty array if html is empty", () => {
			const scrape = new ScrapeOffers(html, extraData);
			const data = scrape.getProviders();
			expect(data).toEqual([]);
		});
	});

	describe("getPageData()", () => {
		it("should return 'No Data' in the objects values if html is empty", () => {
			const scrape = new ScrapeOffers(html, extraData);
			const data = scrape.getPageData();
			expect(data.providers).toBe("No Data");
			expect(data.average).toBe("No Data");
		});
	});
});