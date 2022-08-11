class ObjectExtended {

	static hasAllValues(obj: object, length: number): boolean {
		return Object.keys(obj).length === length;
	}

	static isEmpty(obj: object) {
		return Object.keys(obj).length === 0;
	}

	static hasEmptyValues(obj: object): boolean {
		const keys = Object.keys(obj) as Array<keyof object>;
		return keys.some(key => obj[key] === "");
	}
}

export default ObjectExtended;