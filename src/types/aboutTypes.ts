export type aboutItetData = {
    _id: string,
    title: string,
    bangla: string,
    english: string
}


export type timeLineData = {
    _id: string,
    description: string,
    year: string
}


export type missionVisionData = {
    _id: string;
    icon: string;
    titleEN: string;
    titleBN: string;
    themeColor: string;
    paragraphEN: string;
    paragraphBN: string;
}


// Membership Details types
export type MembershipData = {
    _id: string,
    title: string,
    image: string,
    manualFrom: string,
    eligibility: string,
    items: string[]
}


export type MembershipDetailsProps = {
    sections: {
        types: MembershipData,
        eligibility: MembershipData,
        rights: MembershipData,
    }
    pdfLink?: string,
    imageUrl: string
}