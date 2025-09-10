import { AppShell, Flex } from '@mantine/core';
import MainLinks from './mainlinks';

import useStore from '@/components/stores/zstore.js';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';
export default function AppShellNavBar({ opened }) {
  const { navbarwidth } = useStore();
  return (
    <AppShell.Navbar
      p="md"
      // hiddenBreakpoint="sm"

      hidden={!opened}
      w={{ sm: 200, lg: navbarwidth }}
    >
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
        gap={{ base: 'sm', sm: 'xs' }}
      >
        {/* Header with logo */}
        <CreateTimesheetPage pickersize="xs" />

        {/* Links sections */}
        <MainLinks />
      </Flex>
    </AppShell.Navbar>
  );
}
