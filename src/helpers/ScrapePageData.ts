import PageData from "../interfaces/PageData";

class ScrapePageData {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	extract(): PageData {
		return {} as PageData;
	}

	extractDataV1(): PageData {
		return {} as PageData;
	}
}

export default ScrapePageData;