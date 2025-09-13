import Container from "@/component/Container/Container";
import Image from 'next/image';

interface CommitteeMember {
  _id: string;
  name: string;
  role: string;
  category: string;
  image: string;
}

interface CommitteeSectionProps {
  title: string;
  members: CommitteeMember[];
}

const committeeData = [
  {
    "_id": "finance1",
    "name": "Engr. Md. Zahirul Islam Liton",
    "role": "CONVENER",
    "category": "finance",
    "image": "https://i.ibb.co/fVVdWFyn/798c199d95d5c784ef6c6838be75f3572ea44de2.png"
  },
  {
    "_id": "finance2",
    "name": "Engr. Md. Shamim Dewan",
    "role": "JOINT-CONVENER",
    "category": "finance",
    "image": "https://i.ibb.co/MDn9VsLx/67ed5cc3b8550897ab55574e1411b8ce7a872d0f.png"
  },
  {
    "_id": "finance3",
    "name": "Engr. Md. Razib Hossain",
    "role": "JOINT-CONVENER",
    "category": "finance",
    "image": "https://i.ibb.co/MxDNfXNb/666b5826c31e5017b82de8bc5244eb0f168d0caa.png"
  },
  {
    "_id": "finance4",
    "name": "Engr. Md. Mostafizur Rahman Mamun",
    "role": "MEMBER SECRETARY",
    "category": "finance",
    "image": "https://i.ibb.co/kswPhHsP/7c1788cce76309aa4d92687b8873c15d587b4e8c.png"
  },

  {
    "_id": "membership1",
    "name": "Engr. Rezaul Karim Reza",
    "role": "CONVENER",
    "category": "membership",
    "image": "https://i.ibb.co/qMxz5Ndb/a419d0620b2e4fe92e0f33e9c1c1149d91a25f21.png"

  },
  {
    "_id": "membership2",
    "name": "Engr. Md. Ariful Islam",
    "role": "JOINT-CONVENER",
    "category": "membership",
    "image": "https://i.ibb.co/0j1Pktqy/580c22c8f62caf35ba307cb2a812d8f33f6e4e6f.png"

  },
  {
    "_id": "membership3", 
    "name": "Engr.Md.Nayb Ul Islam",
    "role": "JOINT-CONVENER",
    "category": "membership",
    "image": "https://i.ibb.co/hJ7BbHFX/33fec0f77bc9ba66797ef1428d964cd5a4c5e5d6.png"

  },
  {
    "_id": "membership4",
    "name": "Engr. Md. Arfan Ali Pk.",
    "role": "MEMBER SECRETARY",
    "category": "membership",
    "image": "https://i.ibb.co/1G1t6HTK/cedb720a834428d01435bb807bfe8c878f4482ce.png"

  },
  {
    "_id": "seminar1",
    "name": "Engr. S.M. Farhana Iqbal",
    "role": "CONVENER",
    "category": "seminarInnovation",
    "image": "https://i.ibb.co/DgKJpwrR/ea700ba69b407f13db6a6d15396df03cc51038c4.png"
  },
  {
    "_id": "seminar2",
    "name": "Engr. Monjus S.M. Russel",
    "role": "JOINT-CONVENER",
    "category": "seminarInnovation",
    "image": "https://i.ibb.co/4ZHRJNVZ/05c663f3843d14bd418cddd4c26b5afcc232b627.png"
  },
  {
    "_id": "seminar3",
    "name": "Engr. Md. Rezaul Karim Faruk",
    "role": "JOINT-CONVENER",
    "category": "seminarInnovation",
    "image": "https://i.ibb.co/k6QPR9rD/04dfc43f0a121fbed6ff0d8c483236bb8d72693c.png"

  },
  {
    "_id": "seminar4",
    "name": "Engr. Md. Farukul Islam Joni",
    "role": "MEMBER SECRETARY",
    "category": "seminarInnovation",
    "image": "https://i.ibb.co/LbBZmSR/37d9db3d5f7e1ecabf53e99167c56a002ab0109a.png"

  },
  {
    "_id": "welfare1",
    "name": "Engr. Muhammad Asiful Alam",
    "role": "CONVENER",
    "category": "socialWelfare",
    "image": "https://i.ibb.co/27g8jR0j/e4a1650f84c36877c601341e6b93aaf7accf94a0.png"
  },
  {
    "_id": "welfare2",
    "name": "Engr. Md Ayub Hossain Mukul",
    "role": "JOINT-CONVENER",
    "category": "socialWelfare",
    "image": "https://i.ibb.co/sSpsczm/fd76d801824f0690dbe52f8f06144caa0fd20bed.png"
  },
  {
    "_id": "welfare3",
    "name": "Engr. Md. Anwar Hossain",
    "role": "JOINT-CONVENER",
    "category": "socialWelfare",
    "image": "https://i.ibb.co/rGkrqWQ4/c333739abb95aeab0e9582e67366d028fcd72d99.png"

  },
  {
    "_id": "welfare4",
    "name": "Engr. Md. Moydul Islam (Moid)",
    "role": "MEMBER SECRETARY",
    "category": "socialWelfare",
    "image": "https://i.ibb.co/S7MvGgfH/47120d0ab27272dcb9c14c1aa495f591948debb1.png"

  },
  {
    "_id": "press1",
    "name": "Engr. Md. Sazedul Haque Shaluk",
    "role": "CONVENER",
    "category": "pressPublication",
    "image": "https://i.ibb.co/F4sVMMpC/97611da0b1d9d4a6e324eecffa24edb84872aeb2.png"
  },
  {
    "_id": "press2",
    "name": "Engr. Md. Saidur Rahman Robin",
    "role": "JOINT-CONVENER",
    "category": "pressPublication",
    "image": "https://i.ibb.co/Kx4y2xS1/0add672489d0d819795d67265fd1cc85703b997b.png"
  },
  {
    "_id": "press3",
    "name": "Engr. Suman Mir",
    "role": "JOINT-CONVENER",
    "category": "pressPublication",
    "image": "https://i.ibb.co/Lz5MYg03/e1993681379471c63d3b5d551554527063eddf17.png"
  },
  {
    "_id": "press4",
    "name": "Engr. Chandra Shekhar Das",
    "role": "MEMBER SECRETARY",
    "category": "pressPublication",
    "image": "https://i.ibb.co/FbQJR2n2/53396cfc84277c24cd53cf4f23f65ca392f543cd.png"
  },
  {
    "_id": "sports1",
    "name": "Engr. S.M. Mizanur Rahman",
    "role": "CONVENER",
    "category": "sportsCultural",
    "image": "https://i.ibb.co/RGpKFMNh/4d89cd21fc9403283725eae08121928782ca6f41.png"

  },
  {
    "_id": "sports2",
    "name": "Engr. Md. Saiful Islam Sumon",
    "role": "JOINT-CONVENER",
    "category": "sportsCultural",
    "image": "https://i.ibb.co/9kqkP8fB/fd3755775de957ced8968b7b7c05e47c22c520fa.png"

  },
  {
    "_id": "sports3",
    "name": "Engr. Shahidul Islam Chowdhury",
    "role": "JOINT-CONVENER",
    "category": "sportsCultural",
    "image": "https://i.ibb.co/fBCt4v7/1f83fd012c17d6d4a66fd224e77b4b423ef9f013.png"

  },
  {
    "_id": "sports4",
    "name": "Engr. Istiaque Ahmed Nabil",
    "role": "MEMBER SECRETARY",
    "category": "sportsCultural",
    "image": "https://i.ibb.co/3mj0G4Vt/edaaf96dd5dcf67f85d69f1dca773391ee1ee2dd.png"
  },
  {
    "_id": "office1",
    "name": "Engr. Md. Aminul Islam",
    "role": "CONVENER",
    "category": "officeManagement",
    "image": "https://i.postimg.cc/FFfvB7VP/3b80f2e476e58b617f99ad690d71692d85d1a33a.png"
  },
  {
    "_id": "office2",
    "name": "Engr. Md. Tuhin Ebna Sahir",
    "role": "MEMBER SECRETARY",
    "category": "officeManagement",
    "image": "https://i.postimg.cc/SQw4FkZm/2eb2354834442cbe75f842312a121db389c156b2.png"
  },
  {
    "_id": "office3",
    "name": "Engr. Russel Ahmad",
    "role": "MEMBER SECRETARY",
    "category": "officeManagement",
    "image": "https://i.postimg.cc/4NVgXqMV/b26f850b1bba16cbdaab7b16e4c01946fe189a83.png"
  },
  {
    "_id": "office4",
    "name": "Engr. A.S.M. Ashik Istiak (Likhon)",
    "role": "MEMBER SECRETARY",
    "category": "officeManagement",
    "image": "https://i.postimg.cc/DwhK05kD/1b50ad2a3e67e918605c16e66389fdfab779ffbb.png"
  }
];

const CommitteeSection = ({ title, members }: CommitteeSectionProps) => (
  <div className="w-full px-4 mb-8">
    <h2 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-2 text-gray-700">
      {title.replace(/([A-Z])/g, ' $1').trim()} Committee
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {members.map((member) => (
        <div
          key={member._id}
          className="bg-white rounded-xl shadow p-2 text-center">
          <div className="relative aspect-square w-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="text-[10px] text-yellow-600 font-semibold mt-2">
            {member.role}
          </p>
          <p className="text-[12px] font-medium text-gray-800">{member.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function StandingCommittees() {
  // Group members by their category
  const groupedMembers = committeeData.reduce((acc, member) => {
    const category = member.category.trim(); // Remove any whitespace
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {} as Record<string, CommitteeMember[]>);

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-20">
      <Container>
        <div >
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-10 text-black">
            STANDING COMMITTEES OF ITET
          </h1>

          <div className="space-y-16">
            <div className="lg:flex gap-4">
              <CommitteeSection title="Finance" members={groupedMembers.finance} />
              <CommitteeSection title="Membership" members={groupedMembers.membership} />
            </div>
            <div className="lg:flex gap-4">
              <CommitteeSection title="Seminar, Innovation & Skill Advancement Committee" members={groupedMembers.seminarInnovation} />
              <CommitteeSection title="Social Welfare and Event Management Committee" members={groupedMembers.socialWelfare} />
            </div>
            <div className="lg:flex gap-4">
              <CommitteeSection title="Press & Publication" members={groupedMembers.pressPublication} />
              <CommitteeSection title="Sports & Cultural" members={groupedMembers.sportsCultural} />
            </div>
            <div className="lg:grid grid-cols-2 gap-4">
              <CommitteeSection title="Office Management" members={groupedMembers.officeManagement} />
         </div>
          </div>
        </div>
      </Container>
    </div>
  );
}