import DataType from "./enum/DataType";
import GetData from "./helpers/GetData";
import Environment from "./config/Environment";

const main = async () => {
	switch (Environment.DATA_TYPE) {
		case DataType.JOB: {
			await GetData.initJobs();
			break;
		}
		case DataType.OFFER: {
			await GetData.initOffers();
			break;
		}
		default: throw new Error("Invalid Option");
	}

};

main();