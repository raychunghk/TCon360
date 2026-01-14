import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  IconClock,
  IconHome2,
  IconSettings,
  IconSunset2,
  IconUserEdit,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import useStore from '@/components/stores/zstore.ts';
import { palette } from '@/styles/palette';

import * as classes from './mainlinks.css';

type LinkItemProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  child?: LinkItemProps[];
  isChild?: boolean;
  LinkComponent?: React.ComponentType<{ href: string }>;
};

const defaultIconSize = '2rem';

function CustomLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { setMainshellOverlayVisible } = useStore();
  //const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    //setMainshellOverlayVisible(true);
    console.log('customLink:href?', href);
    console.log('customLink:pathname', pathname);
    if (pathname === href) {
      setMainshellOverlayVisible(false); // Hide overlay if the same route is clicked
    } else {
      setMainshellOverlayVisible(true); // Show overlay for different route
    }
  };
  return (
    <Link href={href} className={classes.link} onClick={handleClick}>
      <UnstyledButton className={classes.button}>{children}</UnstyledButton>
    </Link>
  );
}

function LinkItem({ icon, color, label, link, child, isChild }: LinkItemProps) {
  const { basepath, useReverseProxy } = useStore();
  const _link = useReverseProxy ? `${basepath ?? ''}${link}` : link;

  return (
    <div className={isChild ? classes.childItem : undefined}>
      <CustomLink href={_link}>
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm" inherit>
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
      icon: <IconHome2 size={defaultIconSize} />, // home
      color: palette.darkTeal,
      label: 'Home',
      link: '/',
    },
    {
      icon: <IconSunset2 size={defaultIconSize} />, // vacations
      color: palette.goldenYellow,
      label: 'Vacations',
      link: '/leaverequest',
    },
    {
      icon: <IconClock size={defaultIconSize} />, // timesheet
      color: palette.primaryRed,
      label: 'Time Sheet',
      link: '/timesheet/create',
    },
    {
      icon: <IconUserEdit size={'1.5rem'} />,
      color: palette.darkTeal,
      label: 'User Profile',
      link: '/staff/edit',
      // child: [
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
            icon: <IconSettings size={'1.5rem'} />,
            color: palette.darkOrange,
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
