import ExtraData from "../interfaces/ExtraData";
import PageData from "../interfaces/PageData";
import Provider from "../interfaces/Provider";

type MergeData =
    & Provider
    & PageData
    & ExtraData;

export default MergeData;