import ScrapeProvider from "../../src/helpers/ScrapeProvider";
import path from "path";
import Load from "../../src/utils/Load";
import TestHelpers from "../TestHelpers";

describe("ScrapeProvider", () => {

	beforeAll(async () => await TestHelpers.init());

	const publicDir = path.resolve(__dirname, "../../dist/src/public");
	const html = Load.html("page-001", publicDir);
	const scrape = new ScrapeProvider(html);
	const data = scrape.init();

	describe("init()", () => {
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

});

