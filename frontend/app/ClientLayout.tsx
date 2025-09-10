'use client';
import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore.js';
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
    const { basepath, setBasepath, setUseReverseProxy, setConfig, publicHolidays, loadPublicHolidays } = useStore();
    const memoizedConfig = useMemo(() => config, [config]);

    useEffect(() => {
        console.log('ClientLayout useEffect triggered', { basepath, publicHolidays });
        let isMounted = true;

        if (!basepath && memoizedConfig.basepath) {
            setBasepath(memoizedConfig.basepath);
            setUseReverseProxy(memoizedConfig.useReverseProxy);
            setConfig(memoizedConfig);
        }
        if (basepath && (!publicHolidays || publicHolidays.length === 0) && isMounted) {
            console.log('ClientLayout triggering loadPublicHolidays');
            loadPublicHolidays();
        }

        return () => {
            console.log('ClientLayout useEffect cleanup');
            isMounted = false;
        };
    }, [basepath, memoizedConfig, setBasepath, setUseReverseProxy, setConfig, publicHolidays, loadPublicHolidays]);

    return <Providers>{children}</Providers>;
}