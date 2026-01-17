'use client';

import { usePathname } from 'next/navigation';
import { AppShell, Box, Divider, Flex, NavLink } from '@mantine/core';
import useStore from '@/components/stores/zstore.ts';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';
import * as classes from './AppShellNavBar.css';
import {
  IconClock,
  IconHome2,
  IconSettings,
  IconSunset2,
  IconUserEdit,
} from '@tabler/icons-react';

export default function AppShellNavBar({ opened }) {
  const { navbarwidth, activeUser } = useStore();
  const pathname = usePathname();

  const isActiveRoute = (href: string): boolean => {
    // Exact match for root
    if (href === '/') {
      return pathname === '/' || pathname === '';
    }
    // Start with for other routes
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: <IconHome2 size="1.2rem" /> },
    { href: '/leaverequest', label: 'Vacations', icon: <IconSunset2 size="1.2rem" /> },
    { href: '/timesheet/create', label: 'Time Sheet', icon: <IconClock size="1.2rem" /> },
    { href: '/staff/edit', label: 'User Profile', icon: <IconUserEdit size="1.2rem" /> },
    ...(activeUser?.role?.name === 'admin'
      ? [{ href: '/admin', label: 'Settings', icon: <IconSettings size="1.2rem" /> }]
      : []),
  ];

  return (
    <AppShell.Navbar
      p="md"
      hidden={!opened}
      w={{ base: 220, sm: 240, lg: navbarwidth }}
      className={classes.navbar}
    >
      <Flex direction="column" gap="lg" h="100%">
        <Box className={classes.createTimesheetWrapper}>
          <CreateTimesheetPage pickersize="xs" />
        </Box>

        <Divider my="sm" className={classes.divider} />

        <Box className={classes.linksWrapper}>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              leftSection={item.icon}
              active={isActiveRoute(item.href)}
              className={`
                ${classes.navLink}
                ${isActiveRoute(item.href) ? classes.navLinkActive : ''}
              `}
            />
          ))}
        </Box>

        <Box flex={1} />
      </Flex>
    </AppShell.Navbar>
  );
}
