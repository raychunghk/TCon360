/* eslint-disable react/react-in-jsx-scope */
import { AppShell, Box, Divider, Flex } from '@mantine/core';

import useStore from '@/components/stores/zstore.ts';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';

import * as classes from './AppShellNavBar.css';
import MainLinks from './mainlinks';

export default function AppShellNavBar({ opened }) {
  const { navbarwidth } = useStore();

  return (
    <AppShell.Navbar
      p="md"
      hidden={!opened}
      w={{ base: 220, sm: 240, lg: navbarwidth }}
      className={classes.navbar}
    >
      <Flex direction="column" gap="lg" h="100%">
        <Box className={classes.createTimesheetWrapper}>
          <CreateTimesheetPage pickersize="xs" cardWidth={190} />
        </Box>

        <Divider my="sm" className={classes.divider} />

        <Box className={classes.linksWrapper}>
          <MainLinks />
        </Box>

        <Box flex={1} />
      </Flex>
    </AppShell.Navbar>
  );
}
