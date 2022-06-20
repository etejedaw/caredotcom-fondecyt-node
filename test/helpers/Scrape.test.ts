import ExtraData from "../../src/interfaces/ExtraData";
import Scrape from "../../src/helpers/Scrape";

describe("Scrape", () => {
	describe("getData", () => {
		it("should pass the test", () => {
			const html = "No html data";
			const extraData: ExtraData = {localArea: "new-york-ny", date: new Date()};
			const scrape = new Scrape(html, extraData);
			const data = scrape.getData();
		});
	});
});