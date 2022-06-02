import DateTime from "../../src/utils/DateTime";

describe("DateTime", () => {

	describe("toStandardString", () => {
		it("should take a date in Date format and return a string in YYYY-MM-DD format", () => {
			const dateString1 = "1994-4-20";
			const dateString2 = "1995-12-11";

			const dateFormat1 = new Date(dateString1);
			const dateFormat2 = new Date(dateString2);

			const datetime1 = DateTime.toStandardString(dateFormat1);
			const datetime2 = DateTime.toStandardString(dateFormat2);

			expect(dateString1).toEqual(datetime1);
			expect(dateString2).toEqual(datetime2);
		});
	});
});