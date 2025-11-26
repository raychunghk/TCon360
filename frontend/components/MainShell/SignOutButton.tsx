/* eslint-disable react/react-in-jsx-scope */
import styles from '@/styles/MainShell.module.css';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useState } from 'react';
export default function SignOutButton({ handleSignout }: { handleSignout: () => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Button
            className={styles.SignOutButton}
            onClick={handleSignout}
            leftSection={<IconLogout size={18} />}
            size="sm"
            radius="md"
        >
            Sign Out
        </Button>
    );
}