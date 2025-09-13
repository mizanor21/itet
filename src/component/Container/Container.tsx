'use client'

import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
    return (
        <div className={`mx-[5%] md:mx-[5%] lg:mx-[5%] xl:mx-[6%] 2xl:mx-[8%] ${className}`}>
            {children}
        </div>
    );
};

export default Container;