import {Parser} from "json2csv";

class ArrayExtended {
	static hasAllValues(body: Array<unknown>, length: number): boolean {
		return body.length === length;
	}

	static cleanObjectRepeats<objectType>(data: Array<objectType>): Array<objectType> {
		const dataStringify = data.map(item => JSON.stringify(item));
		const dataSet = new Set(dataStringify);
		const newData = [...dataSet].map(item => JSON.parse(item));
		return [...newData];
	}

	static jsonToCsv(json: Array<object>): string {
		const json2CsvParser = new Parser();
		return json2CsvParser.parse(json);
	}

	static isEmpty(array: Array<unknown>): boolean {
		return this.hasAllValues(array, 0);
	}
}

export default ArrayExtended;