import React from 'react';
import {
  IconHome2,
  IconGauge,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
   IconCalendarEvent,
  IconCalendarPlus,
  IconEyeglass,
  IconClock,
  IconLogout,
  IconSunset2,
  IconTree,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, Anchor, List } from '@mantine/core';
import Link from 'next/link';
import styles from './mainlinks.module.css';
type LinkItemProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  child?: LinkItemProps[];
  isChild?: boolean;
  LinkComponent?: React.ComponentType<{ href: string }>;
};
const data = [
  { icon: <IconHome2 size="1rem" />, color: 'blue', label: 'Home', link: '/' },
  {
    icon: <IconClock size="1rem" />,
    color: 'teal',
    label: 'Time Sheet',
    link: '#',
    child: [
      { icon: <IconEyeglass size="1rem" />, color: 'blue', label: 'View', link: '/timesheet' },
      { icon: <IconCalendarPlus size="1rem" />, color: 'blue', label: 'Create', link: '/timesheet/create' },
    ],
  },
  { icon: <IconCalendarStats size="1rem" />, color: 'violet', label: 'Calendar', link: '/calendar' },
  { icon: <IconSunset2 size="1rem" />, color: 'grape', label: 'Vacation', link: '/vacation' },
  { icon: <IconUser size="1rem" />, color: 'gray', label: 'User Info', link: '/user' },
  { icon: <IconTree size="1rem" />, color: 'gray', label: 'Test', link: '/test' },
];
function CustomLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.links}>
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
        {children}
      </UnstyledButton>
    </Link>
  );
}
function LinkItem({ icon, color, label, link, child, isChild }: LinkItemProps) {

  const marginLeft = isChild ? 20 : 0;
 
  return (
    <div style={{ marginLeft }}>
      <CustomLink href={link}>
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}{isChild}</Text>
        </Group>
      </CustomLink>

      {/* Render child links */}
      {child &&
        child.map((childLink) => (
          <LinkItem key={childLink.label} {...childLink} isChild={true} />
        ))}
    </div>
  );
}

// Use LinkItem component with CustomLink component as LinkComponent prop
export default function MainLinks() {
  return (
    <div>
      {data.map((item) => (
        <LinkItem key={item.label} {...item} isChild={false} />
      ))}
    </div>
  );
}