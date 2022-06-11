class ObjectExtended {
	static hasAllValues(object: object, length: number): boolean {
		return Object.keys(object).length === length;
	}

	static isEmpty(object: object) {
		return Object.keys(object).length === 0;
	}
}

export default ObjectExtended;