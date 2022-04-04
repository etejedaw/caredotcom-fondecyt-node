import puppeteer from "puppeteer";

class Getter {
	readonly #url: string;
	readonly #html: string;

	private constructor(url: string, html: string) {
		this.#url = url;
		this.#html = html;
	}

	static async build(url: string): Promise<Getter>{
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);
		const html = await page.content();
		await browser.close();
		return new Getter(url, html);
	}

	get url(){
		return this.#url;
	}

	get html(){
		return this.#html;
	}

}

export default Getter;