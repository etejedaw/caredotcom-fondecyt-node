import ExtraData from "../interfaces/ExtraData";
import OfferPageData from "../interfaces/OfferPageData";
import OfferProvider from "../interfaces/OfferProvider";

type MergeOfferData =
    & OfferProvider
    & OfferPageData
    & ExtraData;

export default MergeOfferData;