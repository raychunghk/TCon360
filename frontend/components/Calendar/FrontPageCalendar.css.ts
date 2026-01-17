// components/Calendar/FrontPageCalendar.css.ts
import { palette } from '@/styles/palette';
import { globalStyle, style } from '@vanilla-extract/css';

const calendarBorderRadius = '16px';
const calendarBorderRadiusmore = '17px';

export const calendarContainer = style({
  //background: `${palette.iceLight} !important`,
  padding: '8px',
  //borderRadius: calendarBorderRadius,
  //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  height: 'calc(100vh - 140px)', // Adjust 210px based on your header/footer height
});

export const calendarTheme = style({
  vars: {
    '--fc-border-color': palette.ice.darker,
    '--fc-page-bg-color': palette.ice.darker,
    '--fc-neutral-bg-color': palette.ice.base,
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
  border: `1px solid ${palette.ice.darker}`,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
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
  background: palette.ice.base,
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
  background: 'rgb(239 211 218);',
  boxShadow: `inset 0 0 0 2px ${palette.burgundy}`,
  color: 'white !important',
});

// Weekend-specific styling
globalStyle(`${calendarTheme} .fc-day-sun, ${calendarTheme} .fc-day-sat`, {
  backgroundColor: palette.ice.base,
});

globalStyle(`${calendarTheme} .fc-day-sun .fc-daygrid-day-number, ${calendarTheme} .fc-day-sat .fc-daygrid-day-number`, {
  color: `${palette.amberDark} !important`,
  fontWeight: 700,
});

// Style for .clsweekend
globalStyle(`${calendarTheme} .clsweekend `, {
  color: `${palette.amberDark} !important`,
  fontWeight: 700,
});

globalStyle(`${calendarTheme} .clsweekend  `, {
  backgroundColor: `${palette.ice.darker} !important`,
});

// Style for .clsPublicHoliday
globalStyle(`${calendarTheme} .clsPublicHoliday .fc-daygrid-day-frame`, {
  background: `linear-gradient(0deg, ${palette.burgundyLighter} 0%, ${palette.burgundyLight} 48%, ${palette.iceLight} 88%) !important`,
});
globalStyle(`${calendarTheme} .clsPublicHoliday .fc-daygrid-day-number`, {
  color: `${palette.burgundyDark} !important`,
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

// ============================================
// NEW MODERN THEME STYLES - APPEND BELOW
// ============================================

// Modern theme enhanced variables (extends original)
export const modernThemeEnhancements = style({
  vars: {
    // Extend ice palette with new 5-level system
    '--fc-ice-lightest': palette.ice.lightest,
    '--fc-ice-light': palette.ice.light,
    '--fc-ice-base': palette.ice.base,
    '--fc-ice-darker': palette.ice.darker,
    '--fc-ice-darkest': palette.ice.darkest,
  },
});

// Additional modern responsive utilities
globalStyle(`${calendarTheme} .fc .fc-col-header-cell-cushion`, {
  fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  padding: '12px 8px',
});

globalStyle(`${calendarTheme} .fc .fc-daygrid-day-number`, {
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  padding: '12px',
});

globalStyle(`${calendarTheme} .fc .fc-event`, {
  fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
  fontWeight: 500,
  lineHeight: 1.3,
  backgroundColor: palette.roseLight,
  borderLeft: `3px solid ${palette.burgundy}`,
  borderRadius: '4px',
  padding: '4px 8px',
  border: 'none',
  color: palette.burgundy,
});

globalStyle(`${calendarTheme} .fc .fc-toolbar-title`, {
  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
});

// Enhanced hover states
globalStyle(`${calendarTheme} .fc .fc-daygrid-day-frame:hover`, {
  background: palette.ice.light,
});

// Weekend enhancements
globalStyle(`${calendarTheme} .fc-day-sun .fc-daygrid-day-frame, ${calendarTheme} .fc-day-sat .fc-daygrid-day-frame`, {
  backgroundColor: palette.ice.lightest,
});

globalStyle(`${calendarTheme} .fc-day-sun .fc-daygrid-day-frame:hover, ${calendarTheme} .fc-day-sat .fc-daygrid-day-frame:hover`, {
  backgroundColor: palette.ice.darker,
});

// Public holiday modern styling
// Note: The class name in the HTML appears to be .clspublicholiday (lowercase)
// but the original code had .clsPublicHoliday in some places.
// We'll target both for compatibility.
globalStyle(`${calendarTheme} .clspublicholiday, ${calendarTheme} .clsPublicHoliday`, {
  backgroundColor: palette.roseLight,
  borderLeft: `3px solid ${palette.burgundy}`,
  padding: '4px 8px',
  fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
  fontWeight: 600,
  color: palette.burgundy,
  borderRadius: '4px',
  marginTop: '4px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Responsive adjustments
const mediaQuery = '@media (max-width: 768px)';

globalStyle(`${mediaQuery} ${calendarTheme} .fc .fc-daygrid-day-frame`, {
  minHeight: '80px',
});

globalStyle(`${mediaQuery} ${calendarTheme} .fc .fc-col-header-cell-cushion`, {
  padding: '8px 4px',
  fontSize: '0.75rem',
});

globalStyle(`${mediaQuery} ${calendarTheme} .fc .fc-event`, {
  fontSize: '0.65rem',
  padding: '2px 4px',
});

globalStyle(`${mediaQuery} ${calendarTheme} .fc .fc-toolbar`, {
  flexDirection: 'column',
  gap: '8px',
});

globalStyle(`${mediaQuery} ${calendarTheme} .fc .fc-button`, {
  padding: '6px 12px',
  fontSize: '0.85rem',
});

// Grid wrapper enhancement (for use outside FullCalendar)
export const gridWrapper = style({
  border: `1px solid ${palette.ice.darker}`,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  width: '100%',
});

// Calendar grid layout (for custom calendar implementation)
export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  height: '100%',
  minHeight: '400px',
  backgroundColor: palette.white,
});

// Weekday headers (for custom calendar)
export const weekdayLabel = style({
  backgroundColor: palette.ice.light,
  color: palette.navyDark,
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
  textAlign: 'center',
  padding: '12px 8px',
  borderBottom: `1px solid ${palette.ice.darker}`,
  letterSpacing: '0.5px',
});

// Day cell base styling (for custom calendar)
export const dayCell = style({
  minHeight: '110px',
  padding: '12px',
  backgroundColor: palette.white,
  borderRight: `1px solid ${palette.ice.darker}`,
  borderBottom: `1px solid ${palette.ice.darker}`,
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  ':hover': {
    backgroundColor: palette.ice.light,
  },
  '@media': {
    '(max-width: 768px)': {
      minHeight: '80px',
      padding: '8px',
    },
  },
});

// Day number styling (for custom calendar)
export const dayNumber = style({
  fontWeight: 700,
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  color: palette.navyDarker,
  marginBottom: '8px',
  display: 'block',
});

// Weekend styling (for custom calendar)
export const weekend = style([
  dayCell,
  {
    backgroundColor: palette.ice.lightest,
  },
]);

export const weekendHover = style({
  ':hover': {
    backgroundColor: palette.ice.darker,
  },
});

// Event text styling (for custom calendar)
export const eventText = style({
  fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
  fontWeight: 500,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginTop: '2px',
  color: palette.navy,
});

// Event container (for custom calendar)
export const eventContainer = style({
  flex: 1,
  overflow: 'hidden',
  width: '100%',
});
