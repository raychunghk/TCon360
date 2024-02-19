import { AppShell, Flex } from '@mantine/core';
import MainLinks from './mainlinks';
import CreateTimesheetPage from '../timesheet/createform';
export default function AppShellNavBar({ opened }) {
  return (
    <AppShell.Navbar
      p="md"
      // hiddenBreakpoint="sm"

      hidden={!opened}
      w={{ sm: 200, lg: 230 }}
    >
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
        gap={{ base: 'sm', sm: 'lg' }}
      >
        {/* Header with logo */}
        <CreateTimesheetPage pickersize="xs" />

        {/* Links sections */}
        <MainLinks />
      </Flex>
    </AppShell.Navbar>
  );
}
