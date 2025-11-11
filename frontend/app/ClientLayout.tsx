'use client';
import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore';
import { LoadingOverlay } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

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
        isAuthenticated,
        setStatus,
        setIsAuthenticated,
        setActiveUser,
        setAuthtoken,
    } = useStore(
        useShallow((state) => ({
            basepath: state.basepath,
            setBasepath: state.setBasepath,
            setUseReverseProxy: state.setUseReverseProxy,
            setConfig: state.setConfig,
            publicHolidays: state.publicHolidays,
            loadPublicHolidays: state.loadPublicHolidays,
            isExiting: state.isExiting,
            status: state.status,
            isAuthenticated: state.isAuthenticated,
            setStatus: state.setStatus,
            setIsAuthenticated: state.setIsAuthenticated,
            setActiveUser: state.setActiveUser,
            setAuthtoken: state.setAuthtoken,
        })),
    );

    const router = useRouter();
    const pathname = usePathname();

    // Set initial configuration
    useEffect(() => {
        console.log('ClientLayout: Setting initial configuration based on props.');
        if (basepath === null || basepath === undefined) {
            setBasepath(config.basepath || '');
        }
        setUseReverseProxy(config.useReverseProxy);
        setConfig(config);
    }, [basepath, config, setBasepath, setUseReverseProxy, setConfig]);

    // Validate authentication state after rehydration
    useEffect(() => {
        console.log('ClientLayout: Validating authentication state', { status, isAuthenticated });
        if (status === 'loading') {
            // Keep loading state until validation completes
            return;
        }
        if (isAuthenticated && status === 'authenticated') {
            console.log('ClientLayout: Authenticated state confirmed');
            // Optionally validate with a lightweight API call or cookie check here
        } else {
            console.log('ClientLayout: No valid authentication, redirecting to login');
            setIsAuthenticated(false);
            setStatus('unauthenticated');
            setActiveUser(null);
            setAuthtoken('');
            if (!pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
                router.push('/auth/login');
            }
        }
    }, [status, isAuthenticated, pathname, router, setIsAuthenticated, setStatus, setActiveUser, setAuthtoken]);

    // Load public holidays
    useEffect(() => {
        console.log('ClientLayout: Data Loading Effect triggered', { basepath, publicHolidays, isExiting });
        let isMounted = true;

        if (basepath !== null && basepath !== undefined && (!publicHolidays || publicHolidays.length === 0) && !isExiting && isMounted) {
            console.log('ClientLayout: Triggering loadPublicHolidays');
            loadPublicHolidays();
        }

        return () => {
            console.log('ClientLayout: Data Loading Effect cleanup');
            isMounted = false;
        };
    }, [basepath, publicHolidays, isExiting, loadPublicHolidays]);

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