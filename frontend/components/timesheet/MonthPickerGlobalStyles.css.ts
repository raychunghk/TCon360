import { globalStyle } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

// Global styles for Mantine MonthPicker components using correct class selectors

// MonthPicker Root Container
globalStyle('.mantine-MonthPicker-root', {
  color: palette.navy,
});

// Calendar Header (Year and Navigation)
globalStyle('.mantine-MonthPicker-calendarHeader', {
  padding: '12px 16px',
  backgroundColor: palette.ice.light,
  borderRadius: '8px 8px 0 0',
});

// Navigation Arrow Buttons (Previous/Next)
globalStyle('.mantine-MonthPicker-calendarHeaderControl', {
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
});

// Navigation Arrow Buttons hover state
globalStyle('.mantine-MonthPicker-calendarHeaderControl:hover', {
  backgroundColor: palette.ice.base,
});

// Arrow Icons
globalStyle('.mantine-MonthPicker-calendarHeaderControlIcon', {
  color: palette.burgundy,
  width: '20px',
  height: '20px',
});

// Year Display Button
globalStyle('.mantine-MonthPicker-calendarHeaderLevel', {
  color: palette.navyDarker,
  fontWeight: 600,
  fontSize: '1rem',
});

// Year Display Button hover state
globalStyle('.mantine-MonthPicker-calendarHeaderLevel:hover', {
  color: palette.navy,
});

// Months List Table
globalStyle('.mantine-MonthPicker-monthsList', {
  marginTop: '12px',
});

// Month List Rows
globalStyle('.mantine-MonthPicker-monthsListRow', {
  display: 'flex',
  justifyContent: 'space-between',
});

// Month List Cells (Table Cells)
globalStyle('.mantine-MonthPicker-monthsListCell', {
  padding: '4px',
});

// Month Buttons (CRITICAL - Replace monthChip)
globalStyle('.mantine-MonthPicker-pickerControl', {
  width: '50px',
  height: '50px',
  backgroundColor: palette.ice.light,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  color: palette.navyDarker,
  border: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.85rem',
  transition: 'all 0.2s ease',
});

// Month Buttons hover state
globalStyle('.mantine-MonthPicker-pickerControl:hover', {
  backgroundColor: palette.ice.base,
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
});

// Month Buttons focus state
globalStyle('.mantine-MonthPicker-pickerControl:focus', {
  outline: `2px solid ${palette.burgundyLight}`,
  outlineOffset: '2px',
});

// Month Buttons SELECTED/ACTIVE state
globalStyle('.mantine-MonthPicker-pickerControl[data-selected="true"]', {
  backgroundColor: palette.burgundy,
  color: palette.white,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  fontWeight: 700,
});

// MonthPicker Control (navigation buttons)
globalStyle('.mantine-MonthPicker-control', {
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
});

// MonthPicker Control hover state
globalStyle('.mantine-MonthPicker-control:hover', {
  backgroundColor: palette.ice.base,
});

// MonthPicker Navigation Buttons
globalStyle('.mantine-MonthPicker-navButton', {
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
});

// MonthPicker Navigation Buttons hover state
globalStyle('.mantine-MonthPicker-navButton:hover', {
  backgroundColor: palette.ice.base,
});
