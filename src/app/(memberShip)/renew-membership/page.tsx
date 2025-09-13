
import Renew from "@/component/MemberShip/Registration/Renew/Renew";
import MembershipNav from "@/component/MemberShip/Shared/MembershipNav";


interface MembersInfo {
    title: string;
    price: number;
}

export default function page() {
    const MembersInfo: MembersInfo = {
        title: 'General Member',
        price: 1020,
    };
    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #31AEC5, #FFFFFF)',
        }}>
            <MembershipNav />
            <Renew member={MembersInfo} />
        </main>
    );
}