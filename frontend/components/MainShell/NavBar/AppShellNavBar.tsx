/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { AppShell, Box, Divider, Flex, Text, Title } from '@mantine/core';

import useStore from '@/components/stores/zstore.ts';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';

import { SIDEBAR_COMPONENT_WIDTH_NUMBER } from '@/styles/constants';
import SignOutButton from '../SignOutButton';
import * as classes from './AppShellNavBar.css';
import MainLinks from './mainlinks';

export default function AppShellNavBar({ opened, handleSignout }) {
  const { navbarwidth } = useStore();

  return (
    <AppShell.Navbar
      p="md"
      hidden={!opened}
      w={{ base: 220, sm: 240, lg: navbarwidth }}
      className={classes.navbar}
    >
      <Flex direction="column" gap="lg" h="100%">
        {/* TCon360 Branding Header */}
        <Box className={classes.brandingWrapper}>
          <Title order={2} className={classes.brandingTitle}>
            TCon<span className={classes.goldAccent}>360</span>
          </Title>
          <Text className={classes.brandingSubtitle}>
            Timesheet Management
          </Text>
        </Box>

        <Divider my={4} className={classes.divider} />

        <Box className={classes.createTimesheetWrapper}>
          <CreateTimesheetPage pickersize="xs" cardWidth={SIDEBAR_COMPONENT_WIDTH_NUMBER} />
        </Box>

        <Divider my={4} className={classes.divider} />

        <Box className={classes.linksWrapper}>
          <MainLinks />
        </Box>

        <Box pb="md" w={SIDEBAR_COMPONENT_WIDTH_NUMBER} style={{ alignSelf: 'center' }}>
          <SignOutButton handleSignout={handleSignout} />
        </Box>
      </Flex>
    </AppShell.Navbar>
  );
}
