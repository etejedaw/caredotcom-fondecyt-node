import GenerateUri from "../../src/helpers/GenerateUri";
import ExtraData from "../../src/interfaces/ExtraData";
import Wayback from "../../src/helpers/Wayback";
import Getter from "../../src/helpers/Getter";
import Scrape from "../../src/helpers/Scrape";

describe("Scrape", () => {
	const URL = "https://www.care.com";
	const generateUri = new GenerateUri(URL);

	describe("getData", () => {
		jest.setTimeout(10000);
		it("should return not empty data", async () => {
			const offerLinks = generateUri.getOfferLinks();
			const offerLink = offerLinks[0];
			const uri = offerLink.uri;
			const localArea = offerLink.localArea;
			const wayback = new Wayback(uri);
			const lists = await wayback.getList();
			const list = lists[0];
			const url = list.uri;
			const date = list.datetime;
			const extraData = {localArea, date} as ExtraData;
			const getter = await Getter.build(url);
			const html = getter.html;
			const scrape = new Scrape(html, extraData);
			expect(scrape.getData()).toHaveProperty("provider");
		});
	});
});