import {Parser} from "json2csv";

class Csv {
	static toCsv(json: Array<object>) {
		const json2CsvParser = new Parser();
		return json2CsvParser.parse(json);
	}

}

export default Csv;