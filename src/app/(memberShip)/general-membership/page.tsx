import Membership from "@/component/MemberShip/Registration/Membership";
import MembershipNav from "@/component/MemberShip/Shared/MembershipNav";

export default function page() {
    const MembersInfo = {
        title: 'General Member',
        price: 1530,
    };
    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #234BD1, #FFFFFF)',
        }}>
            <MembershipNav />
            <Membership member={MembersInfo} />
        </main>
    );
}