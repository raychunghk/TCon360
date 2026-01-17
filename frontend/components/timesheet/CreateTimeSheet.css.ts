import { style } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

// Modern theme styling for CreateTimeSheet
export const container = style({
  background: palette.white,
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
});

export const header = style({
  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
  fontWeight: 700,
  color: palette.navyDarker,
  marginBottom: '20px',
  letterSpacing: '-0.02em',
});

export const monthGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
  gap: '8px',
  marginBottom: '16px',
});

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
  width: '100%',
  padding: '12px 20px',
  backgroundColor: palette.burgundy,
  color: palette.white,
  border: 'none',
  borderRadius: '10px',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  ':hover': {
    backgroundColor: palette.burgundyDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

// Legacy export for backward compatibility
export const submitSection = style({
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});
