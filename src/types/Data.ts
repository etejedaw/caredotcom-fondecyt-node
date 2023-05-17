import ExtraData from "../interfaces/ExtraData";

type Data<Provider, PageData> = {
	provider: Provider[];
	pageData: PageData;
	extraData: ExtraData;
};

export default Data;
