import path from "path";
import fs from "fs";

class Save {
	static toHtml(data: string, name?: string) {
		name = name || "page";
		const dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
		console.log("HTML saved");
	}

	static toCsv(data: string, name?: string) {
		name = name || "json2csv";
		const dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.csv`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
		console.log("CSV saved");
	}

}

export default Save;