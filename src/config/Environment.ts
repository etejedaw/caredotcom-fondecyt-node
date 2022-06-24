import Load from "../utils/Load";
import path from "path";

class Environment {

	static get LOCAL_AREAS(): Array<string> {
		const dir = this.PUBLIC_DIR;
		const data = Load.txt("local_areas", dir);
		data.pop();
		return [...data];
	}

	static get OFFERS(): Array<string> {
		const dir = this.PUBLIC_DIR;
		const data = Load.txt("offers", dir);
		data.pop();
		return [...data];
	}

	static get JOBS(): Array<string> {
		const dir = this.PUBLIC_DIR;
		const data = Load.txt("jobs", dir);
		data.pop();
		return [...data];
	}

	static get URL(): string {
		return "https://www.care.com";
	}

	static get PUBLIC_DIR(): string {
		return path.resolve(__dirname, "../public");
	}

}

export default Environment;