import React from 'react';
import {
  IconHome2,
  IconGauge,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSunset2,
  IconTree,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}
const data = [
  { icon: <IconHome2 size="1rem" />, color: 'blue', label: 'Home', link: '/' },
  {
    icon: <IconCalendarStats size="1rem" />,
    color: 'teal',
    label: 'Time Sheet',
    link: '/timesheet',
  },
  {
    icon: <IconCalendarStats size="1rem" />,
    color: 'violet',
    label: 'Calendar',
    link: '/calendar',
  },
  {
    icon: <IconSunset2 size="1rem" />,
    color: 'grape',
    label: 'Vacation',
    link: '/vacation',
  },
  {
    icon: <IconUser size="1rem" />,
    color: 'gray',
    label: 'User Info',
    link: '/user',
  },
  {
    icon: <IconTree size="1rem" />,
    color: 'gray',
    label: 'Test',
    link: '/test',
  },
];
import styles from './mainlinks.module.css';
function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <Link href={link} className={styles.links}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

export default function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
