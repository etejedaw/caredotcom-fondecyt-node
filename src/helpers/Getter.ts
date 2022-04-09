import request from "request-promise";

class Getter {
	readonly #url: string;
	readonly #html: string;

	private constructor(url: string, html: string) {
		this.#url = url;
		this.#html = html;
	}

	static async build(url: string): Promise<Getter> {
		const html = await request.get(url);
		return new Getter(url, html);
	}

	get html() {
		return this.#html;
	}

}

export default Getter;