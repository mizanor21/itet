import Image from 'next/image';
import React from 'react';
import logo from '../../../../public/itet-logo.jpg'
import Link from 'next/link';


const MembershipNav = () => (
    <nav>
        <div className="md:flex items-center justify-between px-[5%] py-[2%]">
            {/* Logo and Branding */}
            <Link
                href={'/membership-overview'}
                className="flex items-center gap-2">
                <Image
                    src={logo}
                    alt="ITET Logo"
                    width={50}
                    height={100}
                />
                <div className=''>
                    <h1 className="font-medium text-sm sm:text-base text-white">The Institution of Textile Engineers <br />
                        & Technologists (ITET), Bangladesh
                    </h1>
                </div>
            </Link>
            <div className="lg:flex space-y-4 lg:space-y-0 my-5 lg:my-0">
                <div className='text-[15px]'>
                    Already Have An Account ?
                    <Link
                        href={'/membership-login'}
                        className='font-bold hover:text-orange-600'> Login
                    </Link>
                </div>
                <div>
                    <Link
                        href={'/'}
                        className="ml-4 lg:ml-[50px] px-4 py-2 rounded-md bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
                    // type="button"
                    >
                        Go Back To Home
                    </Link>
                </div>
            </div>

        </div>
    </nav>
);

export default MembershipNav;