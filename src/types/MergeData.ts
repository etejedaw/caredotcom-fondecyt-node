import ExtraData from "../interfaces/ExtraData";

type MergeData<Provider, PageData> = Provider & PageData & ExtraData;

export default MergeData;
