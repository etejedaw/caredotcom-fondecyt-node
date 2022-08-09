import fs from "fs";

class Load {
	static html(name: string, dir: string): string {
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf8");
	}

	static txt(name: string, dir: string): Array<string> {
		const file = `${dir}/${name}.txt`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf-8").toString().split("\n");
	}

}

export default Load;