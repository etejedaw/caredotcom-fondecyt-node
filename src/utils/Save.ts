import fs from "fs";
import SaveType from "../types/SaveType";

class Save {
	static toHtml(saveType: SaveType) {
		const {data, dir} = saveType;
		let {name} = saveType;
		name = name || "page";
		const file = `${dir}/${name}.html`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
	}

	static toCsv(saveType: SaveType) {
		const {data, dir} = saveType;
		let {name} = saveType;
		name = name || "json2csv";
		const file = `${dir}/${name}.csv`;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir);
		fs.writeFileSync(file, data);
	}

}

export default Save;