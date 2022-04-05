class Environment {
	readonly #STATES: Array<string>;
	readonly #LOCAL_AREAS: Array<string>;
	readonly #OFFERS: Array<string>;
	readonly #JOBS: Array<string>;

	constructor() {
		this.#STATES = ["al", "ak"];
		this.#LOCAL_AREAS = ["alabaster-al", "atmore-al"];
		this.#OFFERS = ["child-care", "babysitters"];
		this.#JOBS = ["nanny-jobs", "senior-care-jobs"];
	}

	get STATES() {
		return this.#STATES;
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