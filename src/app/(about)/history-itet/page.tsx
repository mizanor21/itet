'use cleint'

import AboutITET from "@/component/About/HistoryITET/AboutITET";
import TimeLine from "@/component/About/HistoryITET/TimeLine";
import BannerTitle from "@/component/BannerTitle/BannerTitle";


const page = () => {

    return (
        <div className="text-black overflow-hidden">
            <BannerTitle
                subTitle="About ITET"
                title="History of ITET" />

            <div>
                <AboutITET />
                <TimeLine />
            </div>

        </div>
    );
};

export default page;

