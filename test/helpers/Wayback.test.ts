import Wayback from "../../src/helpers/Wayback";
import GenerateUri from "../../src/helpers/GenerateUri";
import DateTime from "../../src/utils/DateTime";
import Sleep from "../../src/utils/Sleep";

describe("Wayback", () => {

	const URL = "https://www.care.com";
	const generateUri = new GenerateUri(URL);
	const offerLinks = generateUri.getOfferLinks();
	const uri = offerLinks[0].uri;
	const wayback = new Wayback(uri);

	jest.setTimeout(10000);

	describe("getList", () => {
		it("should return a list without duplicated in date", async() => {
			const list = await wayback.getList();
			await Sleep.sleep(4000);
			const fullList = await wayback.getFullList();
			const newFullList = fullList.map(list => list.datetime);
			const fullListDate = newFullList.map(list => {
				const transformDate = new Date(list);
				const date = DateTime.toStandardString(transformDate);
				return date;
			});
			const fullListTransformed = new Set(fullListDate);

			const sizeList = list.length;
			const sizeFullList = fullListTransformed.size;

			expect(sizeList).toEqual(sizeFullList);
		});
	});

});