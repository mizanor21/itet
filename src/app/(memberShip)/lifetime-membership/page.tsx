'use client';

import Membership from "@/component/MemberShip/Registration/Membership";
import MembershipNav from "@/component/MemberShip/Shared/MembershipNav";

export default function LifetimeMembershipPage() {
    const member = {
        title: 'Lifetime Member',
        price: 5100,
    };

    return (
        <main
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #F72370, #FFFFFF)',
            }}
        >
            <MembershipNav />
            <Membership member={member} />
        </main>
    );
}
