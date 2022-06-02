class DateTime {
	static toStandardString(date: Date): string {
		const year = date.getFullYear();
		const month = date.getUTCMonth()+1;
		const day = date.getUTCDate();
		return `${year}-${month}-${day}`;
	}
}

export default DateTime;