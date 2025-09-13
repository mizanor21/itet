
import InterimCommittess from "@/component/About/committee/InterimCommittess";
import StandingCommittees from "@/component/About/committee/StandingCommittees";
import Contact from "@/component/About/Constitution/Contact";
import BannerTitle from "@/component/BannerTitle/BannerTitle";
import React from "react";


const page = () => {

    return (
        <div>
            <BannerTitle
                subTitle="About Us"
                title="Committee Members"
                description="At ITET, our leadership team is made up of visionary textile engineers and technologists who work tirelessly to advance the institution’s mission." />

            <InterimCommittess />
            <StandingCommittees />
            <Contact />
        </div >
    );
}


export default page;