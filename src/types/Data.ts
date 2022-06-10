import Provider from "../interfaces/Provider";
import PageData from "../interfaces/PageData";
import ExtraData from "../interfaces/ExtraData";

type Data = {
    provider: Provider[];
    pageData: PageData;
    extraData: ExtraData;
}

export default Data;