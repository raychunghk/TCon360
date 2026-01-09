// components/MainShell/MainShell.css.ts
import { createTheme, globalStyle, style } from '@vanilla-extract/css';

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

/* ── Header tokens ─────────────────────────────────────────── */

const headerBgLight = 'var(--mantine-color-gray-0)';
const headerBgDark = 'var(--mantine-color-dark-7)';
const headerBorder = 'var(--mantine-color-gray-3)';

/* ── Header layout & title ─────────────────────────────────── */

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  height: 60,
  background: '#f5f6f8 !Important', // warm light gray – bridges white sidebar & yellow panel
  color: '#1f2937',
  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  borderBottom: '1px solid #e2e8f0',
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
  color: '#f97316', // orange accent
});

export const headerTitle = style({
  fontSize: '22 !Important',
  fontWeight: 800,
  letterSpacing: -0.5,
  display: 'inline',

  // Pure white text for maximum contrast against the dark gradient
  color: '#ffffff',
  // Subtle amber glow to integrate with the theme without sacrificing readability
  //textShadow: '0 2px 4px rgba(104, 103, 92, 0.5), 0 0 10px rgba(251, 190, 36, 0.12)',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: 16,
    },
  },
});

// In MainShell.css.ts
export const welcomeText = style({
  WebkitTextStroke: '3px var(--mantine-color-gray-9)',
  //textStroke: '1.5px var(--mantine-color-gray-9)',
  paintOrder: 'stroke fill',
  WebkitTextFillColor: 'var(--mantine-color-body)',
  fontWeight: 700,
  letterSpacing: '2px',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '16px',
    },
  },
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
  color: 'white',
  backgroundColor: '#f88c40ff !important',
  fontWeight: 500,
  borderRadius: 6,
  padding: '8px 16px',
  border: '1px solid transparent',
  transition: 'all 0.25s ease',
  ':hover': {
    backgroundColor: '#ff7410ff !important',
    color: '#fff9f3ff !important',
    border: '1px solid #d97706',
    boxShadow: '0 0 0 3px rgba(249,115,22,0.3)',
  },
  ':active': {
    backgroundColor: '#fff4e6',
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

// Footer container
export const footer = style({
  height: 30,
  backgroundColor: 'var(--mantine-color-gray-0)',
  borderTop: '1px solid var(--mantine-color-gray-3)',
});

// Footer content centering
export const footerCenter = style({
  height: 30,
});
