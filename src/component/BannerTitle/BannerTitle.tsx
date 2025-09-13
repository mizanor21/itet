'use client';

import Link from 'next/link';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { FC } from 'react';

interface BannerTitleProps {
    title: string;
    subTitle: string;
    description?: string;
}

const BannerTitle: FC<BannerTitleProps> = ({ title, subTitle, description }) => {
    return (
        <div className="py-10 md:py-20 bg-gradient-to-b from-yellow-50 to-white">
            <div className="font-title space-y-6 lg:space-y-8 text-center px-4 ">
                <div className="space-y-3">
                    <div className="flex justify-center gap-1 items-center text-base text-gray-900 font-bold pb-2 md:pb-4">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <MdOutlineKeyboardDoubleArrowRight />
                        <h4>{subTitle}</h4>
                    </div>
                    <h1 className="text-[#B07210] font-bold text-2xl md:text-3xl lg:text-5xl">
                        {title}
                    </h1>
                    <p className='mx-[20%] text-center flex justify-center text-gray-500'>
                        {description}
                    </p>
                </div>
            </div>
        </div>


    );
};

export default BannerTitle;
