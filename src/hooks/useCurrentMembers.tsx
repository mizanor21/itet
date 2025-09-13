'use client'

import { useMembersData } from "@/lib/DataFetch/DataFetch";
import  { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { DirectoryData } from "@/types/memberPortalTypes";

const useCurrentMembers = () => {

    const { data: memberDirectoryData = [], isLoading, mutate } = useMembersData();
    const [user, loading] = useAuthState(auth);
    const [currentMember, setCurrentMember] = useState<DirectoryData | null>(null);


    useEffect(() => {
        if (!loading && user && memberDirectoryData.length > 0) {
            const member = memberDirectoryData.find(member =>
                member.emailAddress === user.email &&
                member.approveType === "Approved" &&
                member.status === "Active"
            );
            setCurrentMember(member ?? null);
        }
    }, [user, loading, memberDirectoryData]);

    return [currentMember, isLoading, mutate] as const;
};

export default useCurrentMembers;