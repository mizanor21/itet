'use client'
import BannerTitle from "@/component/BannerTitle/BannerTitle";
import HowToAplied from "@/component/MemberShip/Overview/HowToAplied";
import MembershipPricing from "@/component/MemberShip/Overview/MembershipPricing";



const page = () => {
    return (
        <div>
            <BannerTitle
                subTitle="Membership "
                title="Membership Overview"
                description="Become a recognized member of Bangladesh’s leading textile engineering community."
            />
            <MembershipPricing />
            <HowToAplied/>
        </div>
    )
}

export default page;