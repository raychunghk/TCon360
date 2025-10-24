'use client';
import { Loader, Stack, Tabs, Text } from '@mantine/core';
import { IconCalendarEvent, IconDatabasePlus, IconSunMoon, IconUser } from '@tabler/icons-react';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { MainShell } from '@/components/MainShell/MainShell';
import BackupRestoreTab from '@/components/admin/BackupRestoreTab';
import CalendarManagementTab from '@/components/admin/CalendarManagerTab';
import UserManagementTab from '@/components/admin/UserManagerTab';
import useStore from '@/components/stores/zstore';

// Type Definitions
interface User {
    id?: number;
    role?: { name: string; permissions?: string[] };
}

interface StoreState {
    activeUser: User | null;
    basepath: string;
}

interface TabConfig {
    value: string;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
}

// Tab Configuration
const tabs: TabConfig[] = [
    {
        value: 'userManagement',
        label: 'User Management',
        icon: <IconUser size={20} />,
        component: <UserManagementTab />,
    },
    {
        value: 'calendarManagement',
        label: 'Calendar Management',
        icon: <IconCalendarEvent size={20} />,
        component: <CalendarManagementTab />,
    },
    {
        value: 'dataManagement',
        label: 'Backup/Restore',
        icon: <IconDatabasePlus size={20} />,
        component: <BackupRestoreTab />,
    },
    {
        value: 'themeManagement',
        label: 'Change Theme',
        icon: <IconSunMoon size={20} />,
        component: <ColorSchemeToggle />,
    },
];

// Child component to handle useSearchParams
function AdminContent() {
    const [activeTab, setActiveTab] = useState<string>('userManagement');
    // Corrected destructuring to get activeUser and basepath
    const [activeUser, basepath] = useStore(useShallow((state) => [state.activeUser, state.basepath]));
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const tabId = searchParams.get('tab');
        const validTab = tabs.find((tab) => tab.value === tabId);
        if (validTab) {
            setActiveTab(tabId as string);
        } else if (tabId) {
            router.replace('/admin?tab=userManagement', { scroll: false });
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (activeUser && activeUser?.role?.name !== 'admin') {
            console.log('AdminContent: Redirecting to login due to non-admin role', { activeUser });
            router.push('/login');
        }
    }, [activeUser, router]);

    if (!activeUser) {
        return (
            <MainShell contentpadding="md">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>
                <Stack align="center" mt="xl">
                    <Loader size="lg" />
                    <Text>Loading...</Text>
                </Stack>
            </MainShell>
        );
    }

    if (activeUser?.role?.name !== 'admin') {
        return (
            <MainShell contentpadding="md">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>
                <Stack align="center" mt="xl">
                    <Text size="lg" c="red">
                        Unauthorized: You do not have permission to access this page.
                    </Text>
                    <Text>
                        Please <a href="/login">log in</a> with an admin account.
                    </Text>
                </Stack>
            </MainShell>
        );
    }

    return (
        <MainShell contentpadding="md">
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <Tabs
                value={activeTab}
                onChange={(value) => {
                    setActiveTab(value as string);
                    router.push(`/admin?tab=${value}`, { scroll: false });
                }}
                aria-label="Admin dashboard tabs"
                style={{ width: '100%', height: '100%' }}
            >
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Tab key={tab.value} value={tab.value} leftSection={tab.icon}>
                            {tab.label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
                {tabs.map((tab) => (
                    <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
                        <Suspense
                            fallback={
                                <Stack align="center" mt="xl">
                                    <Loader size="lg" />
                                    <Text>Loading {tab.label}...</Text>
                                </Stack>
                            }
                        >
                            {tab.component}
                        </Suspense>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </MainShell>
    );
}

export default function AdminPage() {
    return (
        <Suspense
            fallback={
                <MainShell contentpadding="md">
                    <Stack align="center" mt="xl">
                        <Loader size="lg" />
                        <Text>Loading Admin Dashboard...</Text>
                    </Stack>
                </MainShell>
            }
        >
            <AdminContent />
        </Suspense>
    );
}