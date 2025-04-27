'use client';

import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore';
import { usePublicHolidays } from '@/components/util/usePublicHolidays';
import '@/styles/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useEffect } from 'react';

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
    const faviconUrl = `${config.prefix}/favicon.svg`;
    const { basepath, setBasepath, setUseReverseProxy, setConfig } = useStore();
    const { publicHolidays, loadPublicHolidays } = usePublicHolidays();
    useEffect(() => {
        console.log('on layout');
        if (!basepath) {
            setBasepath(config.basepath);
            setUseReverseProxy(config.useReverseProxy);
            setConfig(config);
        }
    }, [basepath, setBasepath, setUseReverseProxy, config.basepath, config.useReverseProxy]);

    return (
        basepath && (
            <>
                <head>
                    <ColorSchemeScript />
                    <link rel="shortcut icon" href={faviconUrl} />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                    />
                </head>
                <body>
                    <Providers>{children}</Providers>
                </body>
            </>
        )
    );
}