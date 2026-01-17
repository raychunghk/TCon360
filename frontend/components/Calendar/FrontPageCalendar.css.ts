import { style } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

// FullCalendar theme customization variables
export const calendarTheme = style({
  vars: {
    '--fc-border-color': palette.ice.darker,
    '--fc-page-bg-color': palette.ice.darkest,
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
  selectors: {
    // Scrollgrid styling
    '& .fc .fc-scrollgrid, & .fc .fc-scrollgrid-section > *': {
      background: palette.ice.darker,
      borderColor: palette.ice.darker,
    },
    
    // Header styling
    '& .fc .fc-col-header-cell': {
      background: palette.ice.base,
      borderColor: palette.ice.darker,
    },
    '& .fc .fc-col-header-cell-cushion': {
      color: palette.navyDark,
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
      letterSpacing: '0.5px',
      padding: '12px 8px',
    },
    
    // Day cell styling
    '& .fc .fc-daygrid-day': {
      background: palette.white,
      borderColor: palette.ice.darker,
      transition: 'background-color 0.2s ease',
      ':hover': {
        background: palette.ice.light,
      },
    },
    
    '& .fc .fc-daygrid-day.fc-day-today': {
      background: 'rgba(122, 38, 49, 0.14)',
    },
    
    '& .fc .fc-daygrid-day.fc-day-sat, & .fc .fc-daygrid-day.fc-day-sun': {
      background: palette.ice.lightest,
      ':hover': {
        background: palette.ice.darker,
      },
    },
    
    // Event styling  
    '& .fc .fc-event': {
      fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
      fontWeight: 500,
      lineHeight: 1.3,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginTop: '2px',
      backgroundColor: palette.roseLight,
      borderLeft: `3px solid ${palette.burgundy.base}`,
      borderRadius: '4px',
      padding: '4px 8px',
      border: 'none',
      color: palette.burgundy.base,
    },
    
    '& .fc .fc-daygrid-event': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    
    // Day number styling
    '& .fc .fc-daygrid-day-number': {
      fontWeight: 700,
      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
      color: palette.navy.darker,
      marginBottom: '8px',
      display: 'block',
      padding: '12px',
    },
    
    // Button styling
    '& .fc .fc-button': {
      fontWeight: 700,
      borderRadius: '8px',
      padding: '8px 16px',
    },
    
    // Toolbar styling
    '& .fc .fc-toolbar-title': {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      fontWeight: 700,
      color: palette.navy.darker,
      letterSpacing: '-0.02em',
    },
    
    // Responsive adjustments
    '@media (max-width: 768px)': {
      '& .fc .fc-daygrid-day': {
        minHeight: '80px',
      },
      '& .fc .fc-col-header-cell-cushion': {
        padding: '8px 4px',
        fontSize: '0.75rem',
      },
      '& .fc .fc-daygrid-event': {
        fontSize: '0.65rem',
      },
    },
  },
});

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
  color: palette.navyDark,
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
  color: palette.navyDarker,
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
    boxShadow: `inset 0 0 0 2px ${palette.burgundy}`,
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
  color: palette.navy,
});

// Public holiday styling - migrated from styles.css
export const clspublicholiday = style({
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

// Event container for multiple events
export const eventContainer = style({
  flex: 1,
  overflow: 'hidden',
  width: '100%',
});

// Legacy/Original container styling for backward compatibility
export const calendarContainer = style({
  width: '100%',
  padding: '16px',
  '@media': {
    '(max-width: 768px)': {
      padding: '8px',
    },
  },
});
