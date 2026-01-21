'use client';

import { palette } from '@/styles/palette';
import FullCalendar from '@fullcalendar/react';
import { Button, SegmentedControl } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { format } from 'date-fns';
import React from 'react';
import * as calendarStyles from './FrontPageCalendar.css';
import HeaderPopover from '@/components/MainShell/LayoutHeader/HeaderPopover';

interface CalendarHeaderProps {
  calendarRef: React.RefObject<FullCalendar | null>;
  activeStaff: any;
  customTitle: string;
  chargeableDays: number;
  currentCalendarDate: Date | null;
  onAddAppointment: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  calendarRef,
  chargeableDays,
  currentCalendarDate,
  onAddAppointment,
}) => {
  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
  };

  const handleViewChange = (value: string) => {
    calendarRef.current?.getApi().changeView(value);
  };

  // Get current view type for SegmentedControl
  const currentView = calendarRef.current?.getApi().view.type || 'dayGridMonth';

  return (
    <div className={calendarStyles.calendarHeaderWrapper}>
      {/* Left section: Navigation buttons */}
      <div className={calendarStyles.headerLeftSection}>
        <Button
          variant="filled"
          onClick={handlePrev}
          className={calendarStyles.navButton}
          leftSection={<IconChevronLeft size={16} />}
          aria-label="Previous month"
        />
        <Button
          variant="filled"
          onClick={handleToday}
          className={calendarStyles.todayButton}
          aria-label="Go to today"
        >
          Today
        </Button>
        <Button
          variant="filled"
          onClick={handleNext}
          className={calendarStyles.navButton}
          rightSection={<IconChevronRight size={16} />}
          aria-label="Next month"
        />
      </div>

      {/* Center section: Month/Year title with chargeable days */}
      <div className={calendarStyles.headerCenterSection}>
        {currentCalendarDate && (
          <>
            <span className={calendarStyles.monthYearText}>
              {format(currentCalendarDate, 'MMMM yyyy')}
            </span>
            <div className={calendarStyles.chargeableBadge}>
              Chargeable days:{' '}
              <span className={calendarStyles.chargeableValue}>{chargeableDays}</span>
            </div>
          </>
        )}
      </div>

      {/* Right-Center section: View selector */}
      <div className={calendarStyles.headerRightCenterSection}>
        <SegmentedControl
          value={currentView === 'cv' ? 'cv' : 'dayGridMonth'}
          onChange={handleViewChange}
          data={[
            { label: 'Month', value: 'dayGridMonth' },
            { label: 'Vacation', value: 'cv' },
          ]}
          className={calendarStyles.viewSelector}
          size="sm"
        />
      </div>

      {/* Rightmost section: Profile button */}
      <div className={calendarStyles.headerRightmostSection}>
        <HeaderPopover />
      </div>
    </div>
  );
};

export default CalendarHeader;