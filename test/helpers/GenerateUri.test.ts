import GenerateUri from "../../src/helpers/GenerateUri";
import Environment from "../../src/config/Environment";

describe("GenerateUri", () => {

	const URL = "https://www.care.com";
	const generateUri = new GenerateUri(URL);
	const localAreasLength = Environment.LOCAL_AREAS.length;

	describe("getOfferLinks", () => {
		it("should return a list of offer links", () => {
			const offerLinks = generateUri.getOfferLinks();
			const offerLinksLength = offerLinks.length;
			const realOffersLength = Environment.OFFERS.length;
			const realLength = realOffersLength*localAreasLength;
			expect(offerLinksLength).toEqual(realLength);
		});
	});

	describe("getJobsLinks", () => {
		it("should return a list of jobs links", () => {
			const jobsLinks = generateUri.getJobsLinks();
			const jobsLinksLength = jobsLinks.length;
			const realJobsLength = Environment.JOBS.length;
			const realLength = realJobsLength*localAreasLength;
			expect(jobsLinksLength).toEqual(realLength);
		});
	});

});