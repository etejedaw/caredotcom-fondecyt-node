class Sleep {
	static async sleep(milliseconds: number){
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	}

}

export default Sleep;