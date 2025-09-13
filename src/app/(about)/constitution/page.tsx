import Constitution from "@/component/About/Constitution/Constitution";
import Contact from "@/component/About/Constitution/Contact";
import BannerTitle from "@/component/BannerTitle/BannerTitle";


const Page = () => {

    return (
        <div>
            <BannerTitle
                subTitle="Constitution"
                title="Constitution"
            />
            <div>
                <Constitution />
                <Contact />
            </div>
        </div>
    )
}

export default Page;