import Load from "../utils/Load";
import path from "path";
import DataType from "../enum/DataType";

class Environment {

	static get LOCAL_AREAS(): Array<string> {
		const dir = this.INPUT_DIR;
		const data = Load.txt("local_areas", dir);
		data.pop();
		return [...data];
	}

	static get OFFERS(): Array<string> {
		const dir = this.INPUT_DIR;
		const data = Load.txt("offers", dir);
		data.pop();
		return [...data];
	}

	static get JOBS(): Array<string> {
		const dir = this.INPUT_DIR;
		const data = Load.txt("jobs", dir);
		data.pop();
		return [...data];
	}

	static get URL(): string {
		return "https://www.care.com";
	}

	static get OUTPUT_DIR(): string {
		return path.resolve(__dirname, "../output");
	}

	static get INPUT_DIR(): string {
		return path.resolve(__dirname, "../../../src/public");
	}

	static get DATA_TYPE(): DataType {
		const extraction = process.env.DATA_TYPES_EXTRACTION || DataType.NONE;
		switch (extraction) {
			case "job": return DataType.JOB;
			case "offer": return DataType.OFFER;
			default: return DataType.NONE;
		}
	}

}

export default Environment;