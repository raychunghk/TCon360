import { style } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

// Grid wrapper styling
export const gridWrapper = style({
  border: `1px solid ${palette.ice.darker}`,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  width: '100%',
});

// Calendar grid layout
export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  height: '100%',
  minHeight: '400px',
  backgroundColor: palette.white,
});

// Weekday headers
export const weekdayLabel = style({
  backgroundColor: palette.ice.light,
  color: palette.navy.dark,
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
  textAlign: 'center',
  padding: '12px 8px',
  borderBottom: `1px solid ${palette.ice.darker}`,
  letterSpacing: '0.5px',
});

// Day cell base styling
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

// Day number styling
export const dayNumber = style({
  fontWeight: 700,
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  color: palette.navy.darker,
  marginBottom: '8px',
  display: 'block',
});

// Weekend styling - enhanced with hover
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

// Selected day styling
export const selected = style([
  dayCell,
  {
    backgroundColor: palette.roseLight,
    boxShadow: `inset 0 0 0 2px ${palette.burgundy.base}`,
  },
]);

// Event text styling with responsive sizing
export const eventText = style({
  fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
  fontWeight: 500,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginTop: '2px',
  color: palette.navy.base,
});

// Public holiday styling - migrated from styles.css
export const clspublicholiday = style({
  backgroundColor: palette.roseLight,
  borderLeft: `3px solid ${palette.burgundy.base}`,
  padding: '4px 8px',
  fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
  fontWeight: 600,
  color: palette.burgundy.base,
  borderRadius: '4px',
  marginTop: '4px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Event container for multiple events
export const eventContainer = style({
  flex: 1,
  overflow: 'hidden',
  width: '100%',
});

// Responsive adjustments
export const calendarContainer = style({
  width: '100%',
  padding: '16px',
  '@media': {
    '(max-width: 768px)': {
      padding: '8px',
    },
  },
});
