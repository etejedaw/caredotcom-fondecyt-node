import path from "path";
import fs from "fs";

class Load {
	static html(name: string): string {
		const dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf8");
	}

}

export default Load;