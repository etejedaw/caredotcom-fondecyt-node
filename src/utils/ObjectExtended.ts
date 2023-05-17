import { Parser } from "json2csv";

class ObjectExtended {
	static hasAllValues(obj: object, length: number): boolean {
		return Object.keys(obj).length === length;
	}

	static isEmpty(obj: object) {
		return Object.keys(obj).length === 0;
	}

	static hasEmptyValues(obj: object): boolean {
		const keys = Object.keys(obj) as Array<keyof object>;
		return keys.some(key => obj[key] === "");
	}

	static toCsv(data: object): string {
		const json2CsvParser = new Parser();
		return json2CsvParser.parse(data);
	}
}

export default ObjectExtended;
