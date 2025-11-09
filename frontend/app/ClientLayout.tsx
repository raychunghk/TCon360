'use client';
import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore';
import { LoadingOverlay } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
type ConfigProps = {
    basepath: string;
    prefix: string;
    useReverseProxy: boolean;
};

export default function ClientLayout({
    children,
    config,
}: {
    children: React.ReactNode;
    config: ConfigProps;
}) {
    const {
        basepath,
        setBasepath,
        setUseReverseProxy,
        setConfig,
        publicHolidays,
        loadPublicHolidays,
        isExiting,
        status,
        isAuthenticated
    } = useStore();

    const memoizedConfig = useMemo(() => config, [config]);
    const router = useRouter();
    const pathname = usePathname();

    // 1. EFFECT FOR CONFIGURATION SETUP
    // This runs to set the initial basepath if it's missing.
    useEffect(() => {
        console.log('ClientLayout Config Effect triggered', { basepath });

        if (!basepath && memoizedConfig.basepath) {
            console.log('Setting initial configuration based on props.');
            setBasepath(memoizedConfig.basepath);
            setUseReverseProxy(memoizedConfig.useReverseProxy);
            setConfig(memoizedConfig);
        }

        // Note: We don't need a cleanup function here as we are just setting state.
    }, [basepath, memoizedConfig]);


    // 2. EFFECT FOR DATA LOADING (Public Holidays)
    // This runs only when basepath is defined AND holidays need loading.
    useEffect(() => {
        console.log('ClientLayout Data Loading Effect triggered', { basepath, publicHolidays, isExiting });
        let isMounted = true;

        if ((basepath !== null && basepath !== undefined) && (!publicHolidays || publicHolidays.length === 0) && !isExiting && isMounted) {
            console.log('ClientLayout triggering loadPublicHolidays');
            loadPublicHolidays();
        }

        return () => {
            console.log('ClientLayout Data Loading Effect cleanup');
            isMounted = false;
        };
    }, [basepath, publicHolidays, isExiting]); // Dependencies ensure this runs when basepath updates




    if (status === 'loading' && !pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
        console.log('ClientLayout: Rendering loading state', { pathname });
        return (
            <Providers>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            </Providers>
        );
    }

    console.log('ClientLayout: Rendering children', { pathname, status, isAuthenticated });

    return <Providers>{children}</Providers>;
}