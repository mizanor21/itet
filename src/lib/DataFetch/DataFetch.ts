
import { DirectoryData } from "@/types/memberPortalTypes";
import useSWR, { mutate } from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Custom error type
interface FetchError extends Error {
    status?: number;
    info?: unknown;
}

// ✅ Enhanced fetcher
const fetcher = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);

    if (!response.ok) {
        const error: FetchError = new Error('An error occurred while fetching the data');
        error.status = response.status;
        error.info = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
};



// ✅ Members Data Fetch Hook
export const useMembersData = () => {
    const { data, error } = useSWR<DirectoryData[]>(
        `${API_URL}/api/members`,
        fetcher
    );

    return { data, error, mutate, isLoading: !data && !error };
};

