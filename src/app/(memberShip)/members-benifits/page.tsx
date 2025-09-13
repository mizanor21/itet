import Contact from "@/component/About/Constitution/Contact";
import BannerTitle from "@/component/BannerTitle/BannerTitle";
import BenefitCard from "@/component/MemberShip/MemberBenifits/BenefitCard";
import Benefits from "@/component/MemberShip/MemberBenifits/Benefits";
import React from 'react';

const page = () => {
    return (
        <div>
            <BannerTitle
                subTitle="Membership "
                title="Membership Benefits"
                description=""
            />
            <Benefits />
            <BenefitCard />
            <Contact />
        </div>
    );
};

export default page; 