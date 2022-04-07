import Wayback from "./utils/Wayback";

const URL = "https://www.care.com";

const main = async () => {

	const links = [
		"https://www.care.com/child-care/chicago-il",
		"https://www.care.com/child-care/new-work-ny",
		"https://www.care.com/babysitters/chicago-il",
		"https://www.care.com/babysitters/new-work-ny"
	];

	const wayback_1 = new Wayback(links[1]);
	const urls_1 = await wayback_1.getList();
	console.log(urls_1[0]);

	await sleep(4000);

	const wayback_0 = new Wayback(links[0]);
	const urls_0 = await wayback_0.getList();
	console.log(urls_0[0]);

	await sleep(4000);

	const wayback_2 = new Wayback(links[2]);
	const urls_2 = await wayback_2.getList();
	console.log(urls_2[0]);

};

const sleep = async (milliseconds: number) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

main();