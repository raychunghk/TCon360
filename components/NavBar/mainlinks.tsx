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
  IconUserEdit,
  IconSettings,
} from '@tabler/icons-react';
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  Anchor,
  NavLink,
} from '@mantine/core';
import Link from 'next/link';
import styles from './mainlinks.module.css';
import useStore from 'pages/reducers/zstore';
type LinkItemProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  child?: LinkItemProps[];
  isChild?: boolean;
  LinkComponent?: React.ComponentType<{ href: string }>;
};
const iconSizeStyle = {
  fontSize: '1.125rem',
};
const defaultIconSize = '2rem';

function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={styles.links}>
      <UnstyledButton className={styles.unstylebtn}>{children}</UnstyledButton>
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

          <Text size="sm">
            {label}
            {isChild}
          </Text>
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
  const { activeUser } = useStore();

  const data = [
    {
      icon: <IconHome2 size={defaultIconSize} />,
      color: 'blue',
      label: 'Home',
      link: '/',
    },
    {
      icon: <IconSunset2 size={defaultIconSize} />,
      color: 'grape',
      label: 'Leave Request',
      link: '/leaverequest',
    },
    {
      icon: <IconClock size={defaultIconSize} />,
      color: 'teal',
      label: 'Time Sheet',
      link: '/timesheet/create',
    },
    {
      icon: <IconUserEdit size={'1.5rem'} color="blue" />,
      color: 'teal',
      label: 'User Profile',
      link: '/staff/edit',
      // child: [
      //   // {
      //   //   icon: <IconUserPlus size={defaultIconSize} />,
      //   //   color: 'cyan.5',
      //   //   label: 'Create Profile',
      //   //   link: '/staff',
      //   // },
      //   {
      //     icon: <IconUserEdit size={defaultIconSize} />,
      //     color: 'cyan.5',
      //     label: 'Edit Profile',
      //     link: '/staff/edit',
      //   },
      // ],
    },

    ...(activeUser?.role?.name === 'admin'
      ? [
          {
            icon: <IconSettings size={'1.5rem'} color="orange" />,
            color: 'orange',
            label: 'Settings',
            link: '/admin',
          },
        ]
      : []),
    // {
    //   icon: <IconCalendarStats size={defaultIconSize} />,
    //   color: 'violet',
    //   label: 'Calendar',
    //   link: '/calendar',
    // },
  ];
  return (
    <div>
      {data.map((item) => (
        <LinkItem key={item.label} {...item} isChild={false} />
      ))}
    </div>
  );
}
