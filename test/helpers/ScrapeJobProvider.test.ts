import Getter from "../../src/helpers/Getter";
import ScrapeJobProvider from "../../src/helpers/ScrapeJobProvider";

test("Should return an empty object if any data of the page is empty", async () => {
	const URL = "https://web.archive.org/web/20171226001059/https://www.care.com/child-care-jobs/gilbert-az";
	const getter = await Getter.build(URL);
	const html = getter.html;
	const jobProvider = new ScrapeJobProvider(html!);
	const data = jobProvider.extract();
	data.forEach(job => {
		expect(job.title).not.toBe("");
		expect(job.workSchedule).not.toBe("");
		expect(job.priceRank).not.toBe("");
	});
});