import { style } from '@vanilla-extract/css';
import { palette } from '@/styles/palette';

export const themeSwitch = style({
  display: 'flex',
  gap: '8px',
  padding: '8px',
  borderRadius: '12px',
  backgroundColor: palette.ice.light,
  flexWrap: 'wrap',
});

export const button = style({
  padding: '8px 16px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '0.85rem',
});

export const active = style([
  button,
  {
    backgroundColor: palette.white,
    color: palette.navy.darker,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
]);

export const inactive = style([
  button,
  {
    backgroundColor: 'transparent',
    color: palette.slate,
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
  },
]);
