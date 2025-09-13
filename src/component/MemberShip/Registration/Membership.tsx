import React from "react";
import MultiStepForm from "./MultiStepForm/MultiStepForm";

export type MembersInfo = {
  title: string;
  price: number;
};

type MembershipProps = {
  member: MembersInfo;
};

const Membership: React.FC<MembershipProps> = ({ member }) => {
    return (
        <div>
            <span className="text-white flex flex-col items-center justify-center text-center text-[30px] mb-5">
                <p>
                    Multi-Step Registration Form for
                </p>
                <p className="font-bold">{member?.title}</p>
            </span>
            <div className="mt-5 mb-20">
                <MultiStepForm member={member}/>
            </div>
        </div>
    );
};

export default Membership;