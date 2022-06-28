import ScrapeProvider from "../../src/helpers/ScrapeProvider";

describe("Empty ScrapeProvider", () => {
	const html = "";

	describe("extract()", () => {
		it("should return an empty array if html is empty", () => {
			const scrapeProvider = new ScrapeProvider(html);
			const providers = scrapeProvider.extract();
			expect(providers).toEqual([]);
		});
	});

});

