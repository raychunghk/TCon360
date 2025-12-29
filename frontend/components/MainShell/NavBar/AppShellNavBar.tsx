/* eslint-disable react/react-in-jsx-scope */
import { AppShell, Box, Divider, Flex } from '@mantine/core';
import MainLinks from './mainlinks';

import useStore from '@/components/stores/zstore.ts';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';
export default function AppShellNavBar({ opened }) {
  const { navbarwidth } = useStore();
  return (
    <AppShell.Navbar p="md" hidden={!opened} w={{ base: 220, sm: 240, lg: navbarwidth }}
      bg="var(--mantine-color-gray-1) !important"
      style={{ borderRight: '1px solid var(--mantine-color-gray-3) !important' }}>
      <Flex direction="column" gap="lg" h="100%">
        {/* Header with logo */}
        <Box>
          <CreateTimesheetPage pickersize="xs" />
        </Box>

        <Divider my="sm" />

        {/* Links sections */}
        <MainLinks />
        <Box flex={1} />
      </Flex>
    </AppShell.Navbar>
  );
}
