import path from "path";
import fs from "fs";

class Save {
	static toHtml(data: string, name?: string, dir?: string) {
		name = name || "page";
		dir = dir || path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
	}

	static toCsv(data: string, name?: string, dir?: string) {
		name = name || "json2csv";
		dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.csv`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
	}

}

export default Save;