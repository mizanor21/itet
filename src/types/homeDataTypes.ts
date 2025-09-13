export type MarketItem = {
    company: string;
    type: string;
    price: number;
};

export type MarketData = {
    _id: number,
    category: string;
    icon: string;
    unit: string;
    moreLink: string;
    items: MarketItem[];
};

export type EventsData = {
    _id: string,
    title: string,
    date: string,
    time: string,
    batch: string,
    location: string,
}

export type RightSliderData = {
    _id: string,
    image: string
}


export type Items = {
    _id: string,
    title: string,
    icon: string,
    description: string,
    bg: string,
    dot: string,
    text: string,
    position: string,
}

export type ChairmanInfo = {
    _id: string,
    image: string,
    name: string,
    role: string,
    tagline: string,
    message: string
};


export type AlumniData = {
    _id: string,
    name: string,
    designation: string,
    message: string,
    image: string,
    facebook: string,
    instagram: string,
    linkedIn: string
};


export type GalleryData = {
    _id: string,
    image: string,
    title: string

};