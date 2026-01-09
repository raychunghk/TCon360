// /components/SessionPoller.tsx
'use client';

import { useEffect } from 'react';

import useStore from '@/components/stores/zstore.ts';
// eslint-disable-next-line react/prop-types
export function SessionPoller({ interval = 10000 }) {
    const { basepath } = useStore();
    useEffect(() => {
        console.log(`[SessionPoller] Starting polling every ${interval / 1000} seconds.`);

        const poller = setInterval(() => {
            console.log('[SessionPoller] Pinging /api/health to trigger middleware...');
            fetch(`${basepath}/api/betterhealth/1`).catch(err => {
                console.error('[SessionPoller] Ping failed:', err);
            });
        }, interval);

        // Cleanup function to stop polling when the component unmounts
        return () => {
            console.log('[SessionPoller] Stopping polling.');
            clearInterval(poller);
        };
    }, [interval]);

    return null; // This component does not render anything
}
