import JobProvider from "../interfaces/JobProvider";
import JobPageData from "../interfaces/JobPageData";
import ExtraData from "../interfaces/ExtraData";

type MergeJobData =
	& JobProvider
	& JobPageData
	& ExtraData;

export default MergeJobData;