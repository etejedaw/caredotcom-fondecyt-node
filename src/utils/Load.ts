import path from "path";
import fs from "fs";

class Load {
	static html(name: string, dir?: string): string {
		dir = dir || path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf8");
	}

	static txt(name: string, dir?: string): Array<string> {
		dir = dir || path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.txt`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf-8").toString().split("\n");
	}

}

export default Load;