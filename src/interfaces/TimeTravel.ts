interface TimeTravel {
    original_uri: string;
    timegate_uri: string;
    mementos:     Mementos;
    timemap_uri:  TimemapURI;
}

interface Mementos {
    list: List[];
}

 interface List {
    datetime: Date;
    uri:      string;
}

interface TimemapURI {
    json_format: string;
}

export default TimeTravel;
