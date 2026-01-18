import { SIDEBAR_COMPONENT_WIDTH, SIDEBAR_COMPONENT_WIDTH_NUMBER } from '@/styles/constants';
import { palette, paletteAlpha } from '@/styles/palette';
import { globalStyle, style } from '@vanilla-extract/css';

// Modern "Create Timesheet" widget styling
export const container = style({
  borderRadius: '9px !important',
  width: SIDEBAR_COMPONENT_WIDTH,
});

// Legacy export (kept for compatibility)
export const header = style({
  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
  fontWeight: 700,
  color: palette.navyDarker,
  marginBottom: '20px',
  letterSpacing: '-0.02em',
});

export const widgetTitle = style({
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: palette.goldenYellow,
  background: palette.navyDark,
  marginBottom: '16px',
  padding: '10px 0',
  textAlign: 'center !important',
  fontWeight: 700,
});

export const myCardOverride = style({
  border: `1px solid ${palette.amberLight} !important`,
  boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35) !important',
  borderRadius: '9px !important',
  background: `${palette.ice.base} !important`,
  color: palette.white,


});

// MonthPicker styles using Mantine class selectors
export const monthPickerRoot = style({
  color: palette.navy,
});

export const monthPickerCalendarHeader = style({
  padding: '12px 16px',
  backgroundColor: palette.ice.light,
  borderRadius: '8px 8px 0 0',
});

export const monthPickerCalendarHeaderControl = style({
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
  ':hover': {
    backgroundColor: palette.ice.base,
  },
});

export const monthPickerCalendarHeaderControlIcon = style({
  color: palette.burgundy,
  width: '20px',
  height: '20px',
});

export const monthPickerCalendarHeaderLevel = style({
  color: palette.navyDarker,
  fontWeight: 600,
  fontSize: '1rem',
  ':hover': {
    color: palette.navy,
  },
});

export const monthPickerMonthsList = style({
  marginTop: '12px',
});

export const monthPickerMonthsListRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const monthPickerMonthsListCell = style({
  padding: '0px 4px !important',
});

export const monthPickerPickerControl = style({
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
  ':hover': {
    backgroundColor: palette.ice.base,
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  },
  ':focus': {
    outline: `2px solid ${palette.burgundyLight}`,
    outlineOffset: '2px',
  },
  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: palette.burgundy,
      color: palette.white,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontWeight: 700,
    },
  },
});

export const monthPickerControl = style({
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
  ':hover': {
    backgroundColor: palette.ice.base,
  },
});

export const monthGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
  gap: '8px',
  marginBottom: '16px',
});

// Legacy monthChip styles (kept for compatibility but not used)
export const monthChip = style({
  padding: '10px 12px',
  border: `1px solid ${palette.ice.darker}`,
  borderRadius: '8px',
  backgroundColor: palette.ice.light,
  color: palette.navyDarker,
  fontWeight: 600,
  fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: palette.ice.base,
    borderColor: palette.navyLight,
  },
});

export const monthChipActive = style([
  monthChip,
  {
    backgroundColor: palette.burgundy,
    color: palette.white,
    borderColor: palette.burgundyDark,
  },
]);

export const submitButton = style({
  width: '70%',
  padding: '12px',
  backgroundColor: `${palette.burgundy}!important`,

  color: palette.white,
  border: 'none',
  borderRadius: '10px',
  fontWeight: 700,
  boxShadow: `0 4px 12px ${paletteAlpha.black35}`,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  ':hover': {
    backgroundColor: palette.burgundyDark,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px ${paletteAlpha.black45}`,
  },
  ':active': {
    backgroundColor: palette.burgundyDarker,
    transform: 'translateY(0)',
  },
});

export const submitSection = style({
  marginTop: '16px',
  padding: '10px 0',
  backgroundColor: palette.navy,
});
// Navigation Arrow Buttons (Previous/Next)
globalStyle('.mantine-MonthPicker-monthsList', {
  marginTop: '0px !Important',
  width: `${SIDEBAR_COMPONENT_WIDTH_NUMBER - 45}px !Important`
});
globalStyle('.mantine-MonthPicker-calendarHeaderControl', {
  color: palette.burgundy,
  backgroundColor: 'transparent',
  border: 'none',
});
