// app/ClientLayout.tsx
'use client'; // Mark as a Client Component

import Providers from '@/components/providers';
import useStore from '@/components/stores/zstore';
import { usePublicHolidays } from '@/components/util/usePublicHolidays';



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
    // faviconUrl is no longer needed here as the <link> tag is in RootLayout
    const { basepath, setBasepath, setUseReverseProxy, setConfig } = useStore();
    const { publicHolidays, loadPublicHolidays } = usePublicHolidays(); // This hook might be better placed within Providers if it depends on context

    useEffect(() => {
        console.log('on layout');
        // This conditional ensures the state is set only once or if basepath is not yet initialized
        if (!basepath) {
            setBasepath(config.basepath);
            setUseReverseProxy(config.useReverseProxy);
            setConfig(config); // Added setConfig to update the full config object
        }
    }, [basepath, setBasepath, setUseReverseProxy, config, setConfig]); // Added 'config' and 'setConfig' to dependency array

    // Remove the conditional rendering of the entire layout.
    // The layout structure (<html>, <body>, <head>) is handled by the server component.
    // This client component simply provides the client-side context/providers.
    // If 'basepath' is critical for rendering content within 'Providers' or 'children',
    // those components should handle their own loading states or conditional rendering.
    return (
        <Providers>{children}</Providers>
    );
}