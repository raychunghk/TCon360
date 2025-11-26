/* eslint-disable react/react-in-jsx-scope */
'use client';
import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore';
import { LoadingOverlay } from '@mantine/core';
import { SessionProvider, useSession } from 'next-auth/react'; // Import SessionProvider
import { usePathname } from 'next/navigation';
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
        })),
    );


    const pathname = usePathname();
    const { data: session, status: sessionStatus } = useSession();

    // Sync Zustand store with NextAuth session
    useEffect(() => {
        console.log('ClientLayout: Syncing with NextAuth session', { sessionStatus, session });
        if (sessionStatus === 'loading') {
            setStatus('loading');
            return;
        }
        if (session?.user) {
            setIsAuthenticated(true);
            setStatus('authenticated');
            setActiveUser(session.user);
        } else {
            setIsAuthenticated(false);
            setStatus('unauthenticated');
            setActiveUser(null);
            // No client-side redirect; middleware handles it
        }
    }, [sessionStatus, session, pathname, setIsAuthenticated, setStatus, setActiveUser]);

    // Set initial configuration
    useEffect(() => {
        console.log('ClientLayout: Setting initial configuration', { basepath });
        if (basepath === null || basepath === undefined) {
            setBasepath(config.basepath || '');
        }
        setUseReverseProxy(config.useReverseProxy);
        setConfig(config);
    }, [basepath, config, setBasepath, setUseReverseProxy, setConfig]);

    // Load public holidays
    useEffect(() => {
        console.log('ClientLayout Data Loading Effect triggered', { basepath, publicHolidays, isExiting });


        if (basepath && !publicHolidays && !isExiting) {
            if (!publicHolidays) {
                console.log('ClientLayout: Triggering loadPublicHolidays');
                loadPublicHolidays();
            }
        }

        return () => {
            console.log('ClientLayout Data Loading Effect cleanup');

        };
    }, [basepath, publicHolidays, isExiting, sessionStatus]);

    if (sessionStatus === 'loading' && !pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
        console.log('ClientLayout: Rendering loading state', { pathname });
        return (
            <Providers>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            </Providers>
        );
    }

    console.log('ClientLayout: Rendering children', { pathname, sessionStatus, isAuthenticated });

    return (
        <SessionProvider basePath={config.basepath ? `${config.basepath}/api/auth` : '/api/auth'}>
            <Providers>{children}</Providers>
        </SessionProvider>
    );
}