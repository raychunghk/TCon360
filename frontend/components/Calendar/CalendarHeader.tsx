'use client';

import HeaderPopover from '@/components/MainShell/LayoutHeader/HeaderPopover';
import FullCalendar from '@fullcalendar/react';
import { Button, SegmentedControl } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React from 'react';
import * as calendarStyles from './FrontPageCalendar.css';

type CalendarViewType = 'dayGridMonth' | 'cv';

interface CalendarHeaderProps {
  calendarRef: React.RefObject<FullCalendar | null>;
  customTitle: string;
  chargeableDays: number;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ calendarRef, customTitle, chargeableDays }) => {
  const [view, setView] = React.useState<CalendarViewType>('dayGridMonth');

  React.useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    setView(api.view.type === 'cv' ? 'cv' : 'dayGridMonth');
  }, [calendarRef, customTitle]);

  const monthYear = React.useMemo(() => {
    if (!customTitle) return '';

    const lower = customTitle.toLowerCase();
    const idxChargeable = lower.indexOf(' chargeable');
    if (idxChargeable !== -1) return customTitle.slice(0, idxChargeable);

    const idxChargable = lower.indexOf(' chargable');
    if (idxChargable !== -1) return customTitle.slice(0, idxChargable);

    return customTitle;
  }, [customTitle]);

  const prevHandle = () => {
    calendarRef.current?.getApi().prev();
  };

  const nextHandle = () => {
    calendarRef.current?.getApi().next();
  };

  const todayHandle = () => {
    calendarRef.current?.getApi().today();
  };

  const viewChangeHandle = (nextView: string) => {
    const next = (nextView === 'cv' ? 'cv' : 'dayGridMonth') as CalendarViewType;
    setView(next);
    calendarRef.current?.getApi().changeView(next);
  };

  return (
    <div className={calendarStyles.calendarHeaderWrapper}>
      <div className={calendarStyles.headerLeftSection}>
        <div className={calendarStyles.titleContainer}>
          <span className={calendarStyles.monthYearText}>{monthYear}</span>
          <div className={calendarStyles.chargeableBadge}>
            Chargeable days: <span className={calendarStyles.chargeableValue}>{chargeableDays}</span>
          </div>
        </div>
      </div>

      <div className={calendarStyles.headerCenterSection}>
        <SegmentedControl
          value={view}
          onChange={viewChangeHandle}
          data={[
            { label: 'Month', value: 'dayGridMonth' },
            { label: 'Vacation', value: 'cv' },
          ]}
          className={calendarStyles.viewSelector}
          size="sm"
        />
      </div>

      <div className={calendarStyles.headerRightmostSection}>
        <HeaderPopover />
        <div className={calendarStyles.buttonGroup}>
          <Button
            variant="filled"
            onClick={prevHandle}
            className={calendarStyles.navButton}
            aria-label="Previous month"
          >
            <IconChevronLeft size={16} />
          </Button>
          <Button
            variant="filled"
            onClick={todayHandle}
            className={calendarStyles.todayButton}
            aria-label="Go to today"
          >
            Today
          </Button>
          <Button variant="filled" onClick={nextHandle} className={calendarStyles.navButton} aria-label="Next month">
            <IconChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
