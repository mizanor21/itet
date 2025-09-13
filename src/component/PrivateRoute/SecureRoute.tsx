'use client'

import { useRouter } from "next/navigation";
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ReactNode, useEffect } from 'react';
import { auth } from "../../../firebase.config";

interface SecureRouteProps {
    children: ReactNode;
}

const SecureRoute = ({ children }: SecureRouteProps) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/membership-login');
        }
    }, [user, loading, router]);

    if (loading) return <LoadingSpinner />;
    if (user) return <>{children}</>;

    // While redirecting, show loading spinner
    return <LoadingSpinner />;
};

export default SecureRoute;