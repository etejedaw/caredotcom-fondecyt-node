import ScrapeOfferProvider from "../../src/helpers/ScrapeOfferProvider";

describe("Empty ScrapeOfferProvider", () => {
	const html = "";

	describe("extract()", () => {
		it("should return an empty array if html is empty", () => {
			const scrapeProvider = new ScrapeOfferProvider(html);
			const providers = scrapeProvider.extract();
			expect(providers).toEqual([]);
		});
	});

});

