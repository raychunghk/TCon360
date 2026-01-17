import { style } from '@vanilla-extract/css';
import { palette, paletteAlpha } from '@/styles/palette';

// Modern "Create Timesheet" widget styling
export const container = style({
  background: paletteAlpha.white06,
  border: `1px solid ${paletteAlpha.white10}`,
  borderRadius: '16px',
  padding: '20px',
  boxShadow: 'none',
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
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: palette.slate,
  marginBottom: '16px',
  fontWeight: 700,
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
  padding: '12px',
  backgroundColor: palette.burgundy,
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
});
