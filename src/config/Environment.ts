class Environment {
	readonly #LOCAL_AREAS: Array<string>;
	readonly #OFFERS: Array<string>;
	readonly #JOBS: Array<string>;

	constructor() {
		this.#LOCAL_AREAS = ["chicago-il", "new-york-ny"];
		this.#OFFERS = ["child-care", "babysitters"];
		this.#JOBS = ["nanny-jobs", "senior-care-jobs"];
	}

	get LOCAL_AREAS() {
		return this.#LOCAL_AREAS;
	}

	get OFFERS() {
		return this.#OFFERS;
	}

	get JOBS() {
		return this.#JOBS;
	}

}

export default Environment;