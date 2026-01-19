// components/MainShell/MainShell.css.ts
import { createTheme, globalStyle, style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

/* ── Theme – unchanged ─────────────────────────────────────── */

export const mantineTheme = createTheme({
  /* …your colors… */
});

/* ── Global styles ─────────────────────────────────────────── */
const footerheight = 35
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

export const MainShell = style({
  background: `${palette.iceLight} !important`
})
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  height: 60,
  background: `linear-gradient(90deg, ${palette.burgundyDarker} 0%, ${palette.burgundyDark} 55%, ${palette.navyDarker} 100%)`,
  borderBottomStyle: `none !important`,
  color: 'rgba(255, 255, 255, 0.92)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000, // Header below footer (9999), above main content
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const headerIcon = style({
  color: palette.goldenYellow,
});
export const headerTitle = style({
  fontSize: 'clamp(18px, 2.5vw, 26px)',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1,

  // High-contrast gradient: Cream to very light Amber
  background: `linear-gradient(180deg, #FFFFFF 0%, ${palette.creamLight} 60%, ${palette.amberLight} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  // Clean shadow for "lift" instead of stroke
  filter: 'drop-shadow(0 2px 0px rgba(0,0,0,0.4))',

  display: 'inline-block',
  transition: 'all 0.3s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
      WebkitBackgroundClip: 'text',
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
export const headerSubtitle = style({
  color: palette.creamLight,
  opacity: 0.85,
  borderLeft: '1px solid rgba(255,255,255,0.2)',
  paddingLeft: '12px',
  fontSize: '14px',
  fontWeight: 500,
  marginLeft: '12px',
});
/* ── Sidebar & nav links ───────────────────────────────────── */

export const sidebar = style({
  width: 260,
  background: 'white',
  borderRight: '1px solid #e2e8f0',
  padding: '16px 8px',
  overflowY: 'auto',
  boxShadow: '2px 0 12px rgba(0,0,0,0.05)',
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
    background: '#f97316',
    transform: 'scaleY(0)',
    transition: 'transform 0.3s ease',
  },
  selectors: {
    '&[data-active="true"]': {
      background: 'rgba(249,115,22,0.1)',
      color: '#d97706',
      fontWeight: 600,
    },
    '&[data-active="true"]::before': {
      transform: 'scaleY(1)',
    },
    '&:hover': {
      background: 'rgba(249,115,22,0.06)',
      transform: 'translateX(4px)',
      boxShadow: '0 0 8px rgba(249,115,22,0.15)',
    },
  },
});

export const navLinkIcon = style({
  color: '#6b7280',
  selectors: {
    '&[data-active="true"] &': {
      color: '#f97316',
    },
  },
});

/* ── Popover & sign-out button ─────────────────────────────── */

export const popoverDropdown = style({
  background:
    'linear-gradient(to top, #051937, #0a2448, #0e2f59, #123b6b, #15487e)',
  borderRadius: 12,
  color: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  padding: 16,
  border: '1px solid rgba(249,115,22,0.2)',
});

export const signOutButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  maxWidth: 280,
  color: 'white',
  backgroundColor: `${palette.burgundy} !important`,
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 16px',
  border: `1px solid ${paletteAlpha.primaryRed25}`,
  transition: 'all 160ms ease',
  ':hover': {
    backgroundColor: `${palette.burgundyLight} !important`,
    borderColor: palette.darkOrange,
    boxShadow: `0 0 0 3px ${paletteAlpha.primaryRed25}`,
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
  height: footerheight,
  backgroundColor: palette.ice.light,
  color: palette.navyDarker,
  borderTop: `1px solid ${palette.ice.darker}`,
  zIndex: 9999,
  position: 'relative',
  alignItems: 'center', // horizontal
  justifyContent: 'center', // vertical

});

// Footer content centering
export const footerCenter = style({
  height: '100%',
});
