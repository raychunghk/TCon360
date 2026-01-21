// components/Calendar/FrontPageCalendar.css.ts
import { palette, paletteAlpha } from '@/styles/palette';
import { globalStyle, style } from '@vanilla-extract/css';

const calendarBorderRadius = '16px';
const calendarBorderRadiusmore = '17px';

export const calendarContainer = style({
  //background: `${palette.iceLight} !important`,
  padding: '8px',
  //borderRadius: calendarBorderRadius,
  //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  height: '100%',
  overflow: 'auto',
  width: '100%',
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
  background: palette.pearl.dark,
});
globalStyle(`${calendarTheme} .fc .fc-day-sun`, {
  background: paletteAlpha.burgundy15,
});
globalStyle(`${calendarTheme} .fc .fc-day-sat`, {
  background: paletteAlpha.burgundy15,
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
  color: `${palette.navyDarker} !important`,
  fontWeight: 700,
  backgroundColor: `${palette.cream} !important`,
  opacity: '0.6 !important',

});
globalStyle(`${calendarTheme} .clsweekend .fc-event-title`, {
  color: `${palette.burgundy} !important`,
});


// Style for .clsPublicHoliday
globalStyle(`${calendarTheme} .clsPublicHoliday .fc-daygrid-day-frame`, {
  background: `linear-gradient(0deg, ${palette.burgundyLighter} 0%, ${palette.burgundyLight} 48%, ${palette.ice.light} 88%) !important`,
});
globalStyle(`${calendarTheme} .clsPublicHoliday .fc-daygrid-day-number`, {
  color: `${palette.burgundyDark} !important`,
});

// Event styling
globalStyle(`${calendarTheme} .fc .fc-daygrid-event`, {
  background: palette.spruce,
  borderColor: palette.ice.base,
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
  fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
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
  height: '90%',
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



globalStyle('.fc-daygrid-day.fc-day-sun .fc-event-title, .fc-daygrid-day.fc-day-sat .fc-event-title', {
  color: `${palette.burgundyDark} !important`,
  opacity: '1 !important',
});
globalStyle(`${calendarTheme} .fc .fc-event-title`, {
  textWrap: `auto`,
});

// ============================================
// CUSTOM HEADER STYLES
// ============================================

export const customHeaderContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  margin: '0 auto',
  padding: '8px 0',
  '@media': {
    '(max-width: 768px)': {
      gap: '8px',
      padding: '4px 0',
    },
  },
});

export const monthYearText = style({
  fontWeight: 700,
  color: palette.navyDarker,
  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  letterSpacing: '-0.02em',
  '@media': {
    '(max-width: 768px)': {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    },
  },
});

export const chargeableBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 16px',
  borderRadius: '5px',
  backgroundColor: palette.pearl.dark,
  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
  border: `2px solid ${palette.ice.darker}`,
  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 768px)': {
      padding: '3px 12px',
      fontSize: '0.75rem',
    },
  },
});

export const chargeableValue = style({
  fontWeight: 700,
  color: palette.navyDarker,
  marginLeft: '4px',
});

// ============================================
// CUSTOM CALENDAR HEADER STYLES (70px height)
// ============================================

export const calendarHeaderWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '70px',
  padding: '0 16px',
  backgroundColor: palette.white,
  borderBottom: `1px solid ${palette.ice.darker}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  '@media': {
    '(max-width: 768px)': {
      padding: '0 8px',
      height: '70px',
    },
  },
});

// Layout sections
export const headerLeftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
});

export const headerCenterSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  flex: 1,
  textAlign: 'center',
  '@media': {
    '(max-width: 768px)': {
      gap: '2px',
    },
  },
});

export const headerRightCenterSection = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  '@media': {
    '(max-width: 768px)': {
      display: 'none', // Hide on mobile to save space
    },
  },
});

export const headerRightmostSection = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

// Button styles
export const navButton = style({
  backgroundColor: `${palette.navyDark} !important`,
  border: `1px solid ${palette.navyDark}`,
  borderRadius: '6px',
  padding: '8px 12px',
  minWidth: '44px',
  height: '36px',
  color: 'white !important',
  transition: 'all 200ms ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: `${palette.navy} !important`,
    borderColor: palette.navy,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.20)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    '(max-width: 768px)': {
      padding: '6px 8px',
      minWidth: '36px',
      height: '32px',
    },
  },
});

export const todayButton = style({
  backgroundColor: `${palette.burgundy} !important`,
  border: `1px solid ${palette.burgundy}`,
  borderRadius: '6px',
  padding: '8px 16px',
  height: '36px',
  color: 'white !important',
  fontWeight: 600,
  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
  transition: 'all 200ms ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: `${palette.burgundyLight} !important`,
    borderColor: palette.burgundyLight,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(122, 38, 49, 0.30)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    '(max-width: 768px)': {
      padding: '6px 12px',
      height: '32px',
      fontSize: '0.75rem',
    },
  },
});

export const viewSelector = style({
  height: '36px',
  selectors: {
    '& .mantine-SegmentedControl-root': {
      height: '100%',
    },
    '& .mantine-SegmentedControl-item': {
      padding: '8px 16px',
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
      fontWeight: 500,
      transition: 'all 200ms ease',
    },
    '& .mantine-SegmentedControl-item[data-active]': {
      backgroundColor: palette.burgundy,
      color: 'white',
    },
    '& .mantine-SegmentedControl-item[data-active]:hover': {
      backgroundColor: palette.burgundyLight,
    },
    '& .mantine-SegmentedControl-item:not([data-active]):hover': {
      backgroundColor: palette.ice.light,
    },
  },
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
});

// Responsive adjustments for header
globalStyle(`@media (max-width: 768px) ${headerCenterSection} .${monthYearText}`, {
  fontSize: 'clamp(1rem, 4vw, 1.1rem)',
});

globalStyle(`@media (max-width: 768px) ${headerCenterSection} .${chargeableBadge}`, {
  padding: '2px 8px',
  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
});