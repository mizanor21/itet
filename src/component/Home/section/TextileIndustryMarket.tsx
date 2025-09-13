'use client'

import Image from 'next/image';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Container from '@/component/Container/Container';
import { MarketData } from '@/types/homeDataTypes';

const TextileIndustryMarket = () => {

    const marketData: MarketData[] = [
        {
            _id: 1,
            category: "Yarn Prices",
            icon: "https://i.postimg.cc/ryR1T3nB/L1.png",
            unit: "BDT/kg",
            moreLink: "#",
            items: [
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 }
              
            ],
        },
        {
            _id: 2,
            category: "Chemical Prices",
            icon: "https://i.postimg.cc/5yzLmQQ4/L2.png",
            unit: "BDT/kg",
            moreLink: "#",
            items: [
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 }
              
            ],
        },
        {
            _id: 3,
            category: "Fabrics & Accessories Prices",
            icon: "https://i.postimg.cc/mDtQt5bF/L3.png",
            unit: "BDT/cone",
            moreLink: "#",
            items: [
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 },
                { company: "ABC", type: "100% Cotton Yarn", price: 0 }
                
            ],
        },
    ];


    return (
        <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 lg:py-20">
            <Container>
                <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-3 text-center pt-8">
                    Textile Market Updates
                </h2>

                <p className="text-center text-gray-600 mb-8">
                    Real-Time Pricing Insights on Industry Materials.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketData.map((block, i) => (
                        <div
                            key={i}
                            className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-300 h-full"
                        >
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-yellow-600/20 rounded-lg">
                                            <Image
                                                src={block.icon}
                                                alt={`${block.category} icon`}
                                                width={32}
                                                height={32}
                                                sizes=''
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {block.category}
                                        </h3>
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="More options"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {block.items?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center p-4 bg-stone-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {item.company}
                                                </h4>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {item.type}
                                                </p>
                                            </div>
                                            <div className="ml-4 flex items-center">
                                                <span className="text-sm font-semibold text-green-600">
                                                    {item.price.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-1">
                                                    {block.unit}
                                                </span>
                                                <button
                                                    className="ml-3 text-xs text-blue-500 hover:text-blue-700"
                                                    aria-label="View details"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom part - now always at the bottom */}
                            <div className="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                                <a
                                    href={block.moreLink}
                                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                                    aria-label={`View more ${block.category}`}
                                >
                                    View all {block.category}
                                    <FaLongArrowAltRight className='text-xl ml-2' />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TextileIndustryMarket;