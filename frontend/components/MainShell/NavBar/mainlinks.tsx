import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  IconClock,
  IconHome2,
  IconSettings,
  IconSunset2,
  IconUserEdit
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import useStore from '@/components/stores/zstore';
import { usePathname } from 'next/navigation';
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
const iconSizeStyle = {
  fontSize: '1.125rem',
};
const defaultIconSize = '2rem';

function CustomLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { MainshellOverlayVisible, setMainshellOverlayVisible } = useStore();
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
    <Link href={href} className={styles.links} onClick={handleClick}>
      <UnstyledButton className={styles.unstylebtn}>{children}</UnstyledButton>
    </Link>
  );
}
function LinkItem({ icon, color, label, link, child, isChild }: LinkItemProps) {
  const marginLeft = isChild ? 20 : 0;
  const { basepath, useReverseProxy } = useStore();
  const _link = useReverseProxy ? `${basepath ?? ''}${link}` : link;
  return (
    <div style={{ marginLeft }}>
      <CustomLink href={_link}>
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
        child.map((childLink) => <LinkItem key={childLink.label} {...childLink} isChild={true} />)}
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
      label: 'Vacations',
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
