import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";
import ExtraData from "../interfaces/ExtraData";

type JobData = {
	provider: JobProvider[];
	jobData: JobPageData;
	extraData: ExtraData;
}

export default JobData;