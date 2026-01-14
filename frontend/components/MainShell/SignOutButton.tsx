/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import * as classes from './MainShell.css';

export default function SignOutButton({
  handleSignout,
}: {
  handleSignout: () => void;
}) {
  return (
    <Button
      className={classes.signOutButton}
      onClick={handleSignout}
      leftSection={<IconLogout size={18} />}
      size="sm"
      radius="md"
    >
      Sign Out
    </Button>
  );
}
