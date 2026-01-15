// components/MainShell/MainShell.css.ts
import { createTheme, globalStyle, style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

/* ── Theme – unchanged ─────────────────────────────────────── */

export const mantineTheme = createTheme({
  /* …your colors… */
});

/* ── Global styles ─────────────────────────────────────────── */

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: 'Inter, system-ui, sans-serif',
  backgroundColor: 'var(--mantine-color-body)',
});

globalStyle('.fc-header-toolbar', {
  padding: '0 15px',
});

/* ── Header layout & title ─────────────────────────────────── */

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  height: 60,
  background: `linear-gradient(90deg, ${palette.navyDark} 0%, ${palette.navy} 55%, ${palette.navyDark} 100%)`,
  color: 'rgba(255, 255, 255, 0.92)',
  boxShadow: `0 2px 12px ${paletteAlpha.black35}`,
  borderBottom: `1px solid ${paletteAlpha.navyLight55}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000,
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const headerIcon = style({
  color: palette.amberLight,
});
export const headerTitle = style({
  fontSize: 'clamp(18px, 2.5vw, 28px)',
  fontWeight: 700,
  letterSpacing: '-0.4px',
  lineHeight: 1.2,
  display: 'inline-block',

  background: `linear-gradient(90deg, ${palette.creamLight} 0%, ${palette.amberLight} 50%, ${palette.burgundyLight} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: '#ffffff',
  WebkitTextStroke: `0.4px ${palette.amberDark}`,
  textStroke: `0.4px ${palette.amberDark}`,
  paintOrder: 'stroke fill',

  // Optional subtle lift (no fog)

  // === Updated text shadow – subtle, clean lift without heavy glow ===

  paddingBottom: '2px',

  '@media': {
    '(max-width: 768px)': {
      fontSize: 'clamp(16px, 4vw, 22px)',
      letterSpacing: '-0.3px',
      textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)',
    },
  },

  selectors: {
    '&:hover': {
      textShadow:
        '0 4px 12px rgba(0, 0, 0, 0.75), 0 2px 6px rgba(122, 38, 49, 0.35)',
      transform: 'translateY(-1px)',
      transition: 'all 180ms ease',
    },
  },
});
// In MainShell.css.ts
export const welcomeText = style({
  color: 'rgba(255, 255, 255, 0.82)',
  fontWeight: 500,
  letterSpacing: '0.5px',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '16px',
    },
  },
});

/* ── Sidebar & nav links ───────────────────────────────────── */

export const sidebar = style({
  width: 260,
  background: palette.navyDark,
  borderRight: `1px solid ${palette.navyLight}`,
  padding: '16px 8px',
  overflowY: 'auto',
  boxShadow: '2px 0 18px rgba(0,0,0,0.18)',
});

export const navLink = style({
  borderRadius: 12,
  margin: '4px 8px',
  transition: 'all 0.25s ease',
  position: 'relative',
  overflow: 'hidden',
  ':before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: palette.burgundy,
    transform: 'scaleY(0)',
    transition: 'transform 0.3s ease',
  },
  selectors: {
    '&[data-active="true"]': {
      background: paletteAlpha.burgundy15,
      color: palette.creamLight,
      fontWeight: 600,
    },
    '&[data-active="true"]::before': {
      transform: 'scaleY(1)',
    },
    '&:hover': {
      background: paletteAlpha.burgundy10,
      transform: 'translateX(4px)',
      boxShadow: '0 0 10px rgba(122, 38, 49, 0.18)',
    },
  },
});

export const navLinkIcon = style({
  color: palette.iceDark,
  selectors: {
    '&[data-active="true"] &': {
      color: palette.burgundyLight,
    },
  },
});

/* ── Popover & sign-out button ─────────────────────────────── */

export const popoverDropdown = style({
  background: `linear-gradient(180deg, ${palette.navyDark} 0%, ${palette.navy} 55%, ${palette.burgundyDark} 100%)`,
  borderRadius: 12,
  color: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  padding: 16,
  border: '1px solid rgba(184, 201, 205, 0.35)',
});

export const signOutButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  color: 'white',
  backgroundColor: `${palette.burgundy} !important`,
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 16px',
  border: `1px solid ${paletteAlpha.burgundy25}`,
  transition: 'all 160ms ease',
  ':hover': {
    backgroundColor: `${palette.burgundyLight} !important`,
    borderColor: palette.burgundyLight,
    boxShadow: `0 0 0 3px ${paletteAlpha.burgundy25}`,
  },
  ':active': {
    transform: 'translateY(1px)',
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});
// Header inner group (replaces pl={15})
export const headerInner = style({
  width: '100%',
  paddingLeft: 15,
});

export const logoLink = style({
  display: 'flex',
  alignItems: 'center',
});

// Footer container
export const footer = style({
  height: 30,
  backgroundColor: palette.ice,
  borderTop: `1px solid ${palette.iceDark}`,
});

// Footer content centering
export const footerCenter = style({
  height: 30,
});
