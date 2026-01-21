'use client';

import { palette } from '@/styles/palette';
import FullCalendar from '@fullcalendar/react';
import { Button, ButtonGroup, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { format } from 'date-fns';
import React from 'react';
import * as calendarStyles from './FrontPageCalendar.css';

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

  const handleMonthView = () => {
    calendarRef.current?.getApi().changeView('dayGridMonth');
  };

  const handleCustomView = () => {
    calendarRef.current?.getApi().changeView('cv');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {/* Left Navigation Group */}
      <Group gap="xs">
        {/* Center Title Group */}
        <div className={calendarStyles.customHeaderContainer}>
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
        <ButtonGroup>
          <Button
            variant="filled"
            onClick={handleMonthView}
            className="btn-theme text-white f-12"
            style={{ backgroundColor: palette.navyDark }}
          >
            Month
          </Button>
          <Button
            variant="filled"
            onClick={handleCustomView}
            className="btn-theme text-white f-12"
            style={{ backgroundColor: palette.navyDark }}
          >
            Vacations
          </Button>
        </ButtonGroup>

      </Group>



      {/* Right Action Group */}
      <Group gap="xs"> <ButtonGroup>
        <Button
          variant="filled"
          onClick={handlePrev}
          className="btn-theme text-white f-12"
          leftSection={<IconChevronLeft size={16} />}
          style={{ backgroundColor: palette.navyDark }}
        >

        </Button>
        <Button
          variant="filled"
          onClick={handleToday}
          className="btn-theme text-white f-12"
          style={{ backgroundColor: palette.navyDark }}
        >
          Today
        </Button>
        <Button
          variant="filled"
          onClick={handleNext}
          className="btn-theme text-white f-12"
          rightSection={<IconChevronRight size={16} />}
          style={{ backgroundColor: palette.navyDark }}
        >

        </Button>
      </ButtonGroup>

      </Group>
    </div>
  );
};

export default CalendarHeader;
