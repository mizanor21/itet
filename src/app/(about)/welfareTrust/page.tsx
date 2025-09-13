import Contact from "@/component/About/Constitution/Contact";
import WelfareTrust from "@/component/About/WelfareTrust/WelfareTrust";
import BannerTitle from "@/component/BannerTitle/BannerTitle";

const page = () => {

    return (
        <div className=" text-black overflow-hidden">
            <BannerTitle
                subTitle="About Us"
                title="Welfare Trust"
                description="A pillar of wisdom, experience, and ethical leadership — the Board of Trustees of ITET ensures the institution stays true to its mission, fosters transparency, and promotes sustainable growth in the textile engineering community." />
            <WelfareTrust />
            <Contact />
        </div>
    );
};

export default page;
