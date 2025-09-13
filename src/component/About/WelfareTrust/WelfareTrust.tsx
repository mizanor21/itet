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
        "_id": "1",
        "name": "PROF. DR. ENGR. MD. ZULHASH UDDIN",
        "role": "Chairman",
        "category": "trustees",
        "image": "https://i.postimg.cc/X71qSShQ/Chairman-Prof-Dr-Md-Zulhash-Uddin.png"
    },
    {
        "_id": "2",
        "name": "ENGR. MD. ENAYET HOSSAIN",
        "role": "Member Secretary",
        "category": "trustees",
        "image": "https://i.postimg.cc/jS2LR3Gf/MEMBER-SECRETARY-Engr-Md-Enayet-Hossain.png"
    },
    {
        "_id": "3",
        "name": "ENGR.MD. EHSANUL KARIM KAISAR",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/26R6Fk3d/Member-Engr-Ehsanul-Karim-Kaiser.png"
        
    },
    {
        "_id": "4",
        "name": "ENGR. MD. SHAMSUZZAMAN, CIP",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/bv2rtDYN/Member-Engr-Md-Shamsuzzaman-CIP.png"
    },
    {
        "_id": "5",
        "name": "ENGR. NASHIR UDDIN MIA",
        "role": "Member",
        "category": "member",
        "image": "https://res.cloudinary.com/du04p5ikw/image/upload/v1757614091/Generated_Image_September_12_2025_-_12_07AM_ooho9w.png"
    },
    {
        "_id": "6",
        "name": "ENGR.MD. SAYEDUR RAHMAN",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/15J8h1YP/Member-Engr-Md-Sayedur-Rahman.png"
    },
    {
        "_id": "7",
        "name": "ENGR. MD. A.T.M SHAMSU UDDIN KHAN ",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/nhWMrYJP/Member-Engr-A-T-M-Shamsu-Uddin-Khan.png"
    },
    {
        "_id": "8",
        "name": "ENGR. ABDUS SOBHAN, CIP",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/MKpHFKsn/Member-Engr-ABDUS-SOBHAN-CIP.png"
    },
    {
        "_id": "9",
        "name": "ENGR.DEWAN SAIFUL ALAM MASUD",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/fR3LMqQZ/Member-Engr-Dewan-Saiful-Alam-Masud.png"
    },
    {
        "_id": "",
        "name": "ENGR.  A.K.M. MOHSIN AHMED ",
        "role": "Member",
        "category": "member",
        "image": "https://res.cloudinary.com/du04p5ikw/image/upload/v1757612373/Mohsin_l44loc.jpg"
    },
    {
        "_id": "10",
        "name": "ENGR. MD. MOYDUL ISLAM (MOID)",
        "role": "Member",
        "category": "member",
        "image": "https://i.postimg.cc/nr1ChyF4/Member-Engr-Md-Moydul-Islam-Moid.png"
    },
];

const CommitteeSection = ({ title, members }: CommitteeSectionProps) => (
    <div className="w-full mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 relative pl-4">
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
            {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" >
            {members?.map((member) => (
                <div
                    key={member._id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                    <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw border border-rose-500"
                            // quality={1}             // compression
                            // placeholder="blur"       // optional blurry placeholder
                            // blurDataURL="/images/hero-blur.jpg"
                        />
                    </div>
                    <div className="p-5">
                        <span className="inline-block  text-md font-medium text-purple-600 rounded-full mb-2">
                            {member.role}
                        </span>
                        <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const WelfareTrust = () => {
    // Group members by their category
    const groupedMembers = committeeData.reduce((acc, member) => {
        const category = member.category.trim();
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(member);
        return acc;
    }, {} as Record<string, CommitteeMember[]>);

    return (
        <div>
            <Container>
                <CommitteeSection title="Meet Our Trustees" members={groupedMembers.trustees} />
                <CommitteeSection title="Members" members={groupedMembers.member} />
        
            </Container>
        </div>
    );
}

export default WelfareTrust;