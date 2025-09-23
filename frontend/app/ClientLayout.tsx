'use client';
import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore.js';
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
    const { basepath, setBasepath, setUseReverseProxy, setConfig, publicHolidays, loadPublicHolidays, isExiting, status, isAuthenticated } = useStore();
    const memoizedConfig = useMemo(() => config, [config]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('ClientLayout useEffect triggered', { basepath, publicHolidays, isExiting, status, pathname });
        let isMounted = true;

        if (!basepath && memoizedConfig.basepath) {
            setBasepath(memoizedConfig.basepath);
            setUseReverseProxy(memoizedConfig.useReverseProxy);
            setConfig(memoizedConfig);
        }
        if (basepath && (!publicHolidays || publicHolidays.length === 0) && !isExiting && isMounted) {
            console.log('ClientLayout triggering loadPublicHolidays');
            loadPublicHolidays();
        }

        return () => {
            console.log('ClientLayout useEffect cleanup');
            isMounted = false;
        };
    }, [basepath]);

    useEffect(() => {
        if ((status === 'unauthenticated' || !isAuthenticated) && !isExiting && !pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
            console.log('ClientLayout: Redirecting to login', { status, isAuthenticated, pathname });
            router.push('/auth/login');
        }
    }, [status, isAuthenticated]);
    // Skip loading overlay for /auth/login and /auth/signup
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