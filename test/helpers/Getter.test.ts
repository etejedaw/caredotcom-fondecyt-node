import Getter from "../../src/helpers/Getter";

describe("Getter", () => {
	it("should return an undefined html if the page to scrape is empty", async () => {
		const uri = "";
		const getter = await Getter.build(uri);
		const html = getter.html;
		expect(html).toBe(undefined);
	});

	it("should return an undefined html if the page to scrape has an error to get", async() => {
		const uri = "https://web.archive.org/web/20150530094157/https://www.care.com/nanny-jobs/chicago-il";
		const getter = await Getter.build(uri);
		const html = getter.html;
		expect(html).toBe(undefined);
	});
});