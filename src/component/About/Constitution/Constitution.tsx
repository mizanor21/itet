'use client'

import Container from "@/component/Container/Container";
import { FaArrowRight } from "react-icons/fa";


type ConstitutionDataType = {
    title: string;
    description: string;
    downloadText: string;
    fileName: string;
    documentpdf: string;
};

const Constitution = () => {

    const constitutionData: ConstitutionDataType = {
        title: "The Constitution of The Institution of Textile Engineers and Technologists, Bangladesh (ITET)",
        description: "This Constitution outlines the mission, structure, and governance of ITET, ensuring transparency, accountability, and excellence in advancing textile engineering and technology.",
        downloadText: "Download Full Constitution PDF",
        fileName: "Constitution_of_ITET.pdf",
        documentpdf: "https://drive.google.com/file/d/1tXfpW8C0H3pSh_zoQhjoaP7KkNk7GTsl/view?usp=sharing",
    };


    return (
        <div>
            <Container>
                <div className="flex items-center py-6">
                    <div className="w-1 h-14 bg-[#B07210] mr-6"></div>
                    <div className="flex items-center">
                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900">
                            {constitutionData.title}
                        </h2>
                    </div>
                </div>
                <p className="text-gray-800 text-md lg:text-xl">
                    {constitutionData.description}
                </p>

                <a
                    href={constitutionData.documentpdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sky-500 hover:text-sky-600 hover:underline font-bold mt-4"
                    download={constitutionData.fileName}
                >
                    {constitutionData.downloadText} <FaArrowRight className="ml-1 h-4 w-4" />
                </a>
            </Container>
        </div>
    )
}

export default Constitution;