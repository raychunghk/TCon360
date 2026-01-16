// components/Calendar/FrontPageCalendar.css.ts
import { palette } from '@/styles/palette';
import { globalStyle, style } from '@vanilla-extract/css';

const calendarBorderRadius = '16px';
const calendarBorderRadiusmore = '17px';

export const calendarContainer = style({
  background: `${palette.iceLight} !important`,
  padding: '8px',
  borderRadius: calendarBorderRadius,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  height: 'calc(100vh - 210px)', // Adjust 210px based on your header/footer height
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
});

/**
 * We use globalStyle to target FullCalendar's internal classes.
 * We prefix them with `${calendarTheme}` to ensure these styles 
 * only apply when they are inside our specific calendar component.
 */

// Main view container for rounded corners
globalStyle(`${calendarTheme} .fc-view-harness`, {
  borderRadius: calendarBorderRadius,
  overflow: 'hidden',
  border: `1px solid ${palette.iceDark}`,
});

globalStyle(`${calendarTheme} .fc-scrollgrid`, {
  borderRadius: calendarBorderRadius,
});

globalStyle(`${calendarTheme} .fc-col-header`, {
  borderRadius: calendarBorderRadius,
});

globalStyle(`${calendarTheme} .fc-scrollgrid-section > th`, {
  borderRadius: `0px ${calendarBorderRadius} 0px 0px`,
});

globalStyle(`${calendarTheme} .fc-scrollgrid-section > td`, {
  borderRadius: `0px 0px ${calendarBorderRadius} ${calendarBorderRadius}`,
});

globalStyle(`${calendarTheme} thead .fc-scroller-harness`, {
  borderRadius: `${calendarBorderRadiusmore} ${calendarBorderRadiusmore} 0 0`,
  overflow: 'hidden',
  //border: `1px solid ${palette.iceDark}`,
});

// Scrollgrid styling
globalStyle(`${calendarTheme} .fc .fc-scrollgrid, ${calendarTheme} .fc .fc-scrollgrid-section > *`, {
  background: palette.ice,
});

// Column header styling
globalStyle(`${calendarTheme} .fc .fc-col-header-cell`, {
  background: palette.cream,
});

globalStyle(`${calendarTheme} .fc .fc-col-header-cell-cushion`, {
  color: palette.navyDark,
  fontWeight: 700,
});

// Day grid styling
globalStyle(`${calendarTheme} .fc .fc-daygrid-day-frame`, {
  background: '#ffffff',
  transition: 'background-color 120ms ease',
});

globalStyle(`${calendarTheme} .fc .fc-daygrid-day-frame:hover`, {
  background: palette.creamLight,
});

globalStyle(`${calendarTheme} .fc .fc-daygrid-day-number`, {
  color: palette.navyDark,
  fontWeight: 600,
});

// Today styling
globalStyle(`${calendarTheme} .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-frame`, {
  background: 'rgba(244, 106, 124, 0.08)',
  boxShadow: `inset 0 0 0 2px ${palette.burgundy}`,
  color: 'white !important',
});

// Event styling
globalStyle(`${calendarTheme} .fc .fc-daygrid-event`, {
  background: palette.spruce,
  borderColor: palette.spruceDark,
  color: '#ffffff',
});

globalStyle(`${calendarTheme} .fc .fc-timegrid-event`, {
  background: palette.navy,
  borderColor: palette.navyDark,
  color: '#ffffff',
});

globalStyle(`${calendarTheme} .fc .fc-list-event-dot`, {
  borderColor: palette.burgundy,
});

globalStyle(`${calendarTheme} .fc .fc-event-title`, {
  fontWeight: 600,
});

// Apply border-radius to the bottom corners of the calendar grid
globalStyle(`${calendarTheme} table.fc-scrollgrid-sync-table > tbody > tr:last-child > td:first-child div`, {
  borderBottomLeftRadius: calendarBorderRadius,
});

globalStyle(`${calendarTheme} table.fc-scrollgrid-sync-table > tbody > tr:last-child > td:last-child div`,
  {
    borderBottomRightRadius: calendarBorderRadius,
  });