// components/Calendar/FrontPageCalendar.css.ts
import { style } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

export const calendarContainer = style({
  background: 'white',
  padding: '8px',
  borderRadius: '5px',
});

export const calendarTheme = style({
  vars: {
    '--fc-border-color': palette.iceDark,
    '--fc-page-bg-color': palette.iceDark,
    '--fc-neutral-bg-color': palette.ice,
    '--fc-neutral-text-color': palette.navyDark,
    '--fc-today-bg-color': 'rgba(122, 38, 49, 0.14)',
    '--fc-button-bg-color': palette.navyDark,
    '--fc-button-border-color': palette.navyDark,
    '--fc-button-text-color': '#ffffff',
    '--fc-button-hover-bg-color': palette.navy,
    '--fc-button-hover-border-color': palette.navy,
    '--fc-button-active-bg-color': palette.burgundy,
    '--fc-button-active-border-color': palette.burgundyDark,
  },
  selectors: {
    // Scrollgrid styling
    '& .fc .fc-scrollgrid, & .fc .fc-scrollgrid-section > *': {
      background: palette.iceDark,
    },

    // Column header styling
    '& .fc .fc-col-header-cell': {
      background: palette.cream,
    },

    '& .fc .fc-col-header-cell-cushion': {
      color: palette.navyDark,
      fontWeight: 700,
    },

    // Day grid styling
    '& .fc .fc-daygrid-day-frame': {
      background: '#ffffff',
      transition: 'background-color 120ms ease',
    },

    '& .fc .fc-daygrid-day-frame:hover': {
      background: palette.creamLight,
    },

    '& .fc .fc-daygrid-day-number': {
      color: palette.navyDark,
      fontWeight: 600,
    },

    // Today styling
    '& .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-frame': {
      background: 'rgba(122, 38, 49, 0.08)',
      boxShadow: `inset 0 0 0 2px ${palette.burgundy}`,
    },

    // Event styling
    '& .fc .fc-daygrid-event': {
      background: palette.spruce,
      borderColor: palette.spruceDark,
      color: '#ffffff',
    },

    '& .fc .fc-timegrid-event': {
      background: palette.navy,
      borderColor: palette.navyDark,
      color: '#ffffff',
    },

    '& .fc .fc-list-event-dot': {
      borderColor: palette.burgundy,
    },

    '& .fc .fc-event-title': {
      fontWeight: 600,
    },
  },
});