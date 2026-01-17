'use client';

import { Card, Text } from '@mantine/core';
import commonstyle from '../styles/common.module.css';

function MyCard({
  title,
  children,
  cardwidth = 500,
  className,
  headerClassName,
}) {
  const sectionClassName = headerClassName
    ? headerClassName
    : commonstyle.mySection;

  return (
    <Card
      miw={cardwidth}
      withBorder
      className={`${commonstyle.mycard} ${className || ''}`}
    >
      <Card.Section
        className={sectionClassName}
        inheritPadding={!!headerClassName}
        mah={headerClassName ? undefined : 60}
        p={headerClassName ? undefined : 8}
        ta={headerClassName ? 'left' : 'center'}
      >
        <Text
          inherit={!!headerClassName}
          fw={headerClassName ? undefined : 600}
          fz={headerClassName ? undefined : '1.1rem'}
          c={headerClassName ? undefined : 'white'}
        >
          {title}
        </Text>
      </Card.Section>

      {children}
    </Card>
  );
}

export default MyCard;
