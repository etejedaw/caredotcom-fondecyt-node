import DataInformation from "./DataInformation";

interface Care extends DataInformation{
    name: string;
    priceRank: string;
    experience: string;
    age: number;
}

export default Care;