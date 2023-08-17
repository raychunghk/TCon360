import { AppShell, Navbar } from '@mantine/core';
import MainLinks from './mainlinks';
import CreateTimesheetPage from '../timesheet/createform';
export default function AppShellNavBar({ opened }) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 230 }}
    >
      <Navbar.Section>
        {/* Header with logo */}
        <CreateTimesheetPage pickersize="xs" />
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        {/* Links sections */}
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}
