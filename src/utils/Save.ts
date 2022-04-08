import path from "path";
import fs from "fs";

class Save {
	static saveHtml(data: string, name?: string){
		name = name || "page";
		const dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
		console.log("HTML saved");
	}

	static loadHTML(name: string): string{
		const dir = path.resolve(__dirname, "../public");
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(file)) throw new Error("File not found");
		return fs.readFileSync(file, "utf8");
	}

}

export default Save;