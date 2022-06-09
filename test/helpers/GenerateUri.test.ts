import GenerateUri from "../../src/helpers/GenerateUri";
import Environment from "../../src/config/Environment";

describe("GenerateUri", () => {

	const URL = "https://www.care.com";
	const environment = new Environment();
	const generateUri = new GenerateUri(URL);
	const localAreasLength = environment.LOCAL_AREAS.length;

	describe("getOfferLinks", () => {
		it("should return a list of links", () => {
			const offerLinks = generateUri.getOfferLinks();
			const offerLinksLength = offerLinks.length;
			const realOffersLength = environment.OFFERS.length;
			const realLength = realOffersLength*localAreasLength;
			expect(offerLinksLength).toEqual(realLength);
		});
	});

	describe("getJobsLinks", () => {
		it("should return a list of links", () => {
			const jobsLinks = generateUri.getJobsLinks();
			const jobsLinksLength = jobsLinks.length;
			const realJobsLength = environment.JOBS.length;
			const realLength = realJobsLength*localAreasLength;
			expect(jobsLinksLength).toEqual(realLength);
		});
	});

});