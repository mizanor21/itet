import MissionVision from '@/component/About/MissionVision/MissionVision'
import BannerTitle from '@/component/BannerTitle/BannerTitle'



const page = () => {
    return (
        <div>
            <BannerTitle
                subTitle='Mission & Vision'
                title='ITET’s Mission & Vision' />

            <MissionVision />
        </div>
    )
}

export default page;

