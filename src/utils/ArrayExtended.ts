class ArrayExtended {
	static hasAllValues(body: Array<string>, length: number): boolean {
		return body.length == length;
	}

	static cleanObjectRepeats<objectType>(data: Array<objectType>): Array<objectType> {
		const dataStringify = data.map(item => JSON.stringify(item));
		const dataSet = new Set(dataStringify);
		const newData = [...dataSet].map(item => JSON.parse(item));
		return [...newData];
	}
}

export default ArrayExtended;