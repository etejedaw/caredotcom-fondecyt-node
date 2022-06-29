import OfferProvider from "../interfaces/OfferProvider";
import OfferPageData from "../interfaces/OfferPageData";
import ExtraData from "../interfaces/ExtraData";

type OfferData = {
    provider: OfferProvider[];
    pageData: OfferPageData;
    extraData: ExtraData;
}

export default OfferData;