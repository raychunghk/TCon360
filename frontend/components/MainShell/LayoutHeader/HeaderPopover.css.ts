// components/MainShell/MainShell.css.ts
import { style } from '@vanilla-extract/css';

export const PopoverDropdown = style({
    background: 'linear-gradient(to top, #051937, #0a2448, #0e2f59, #123b6b, #15487e)',
    borderRadius: 12,
    color: 'white',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    padding: 16,
});
export const PopoverButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    color: 'white',
    backgroundColor: '#15487e',
    fontWeight: 500,
    borderRadius: 6,
    padding: '8px 16px',
    border: '1px solid transparent',
    transition: 'all 0.25s ease',
    ':hover': {
        backgroundColor: '#ffffff',
        color: '#15487e',
        border: '1px solid #15487e',
        boxShadow: '0 0 0 3px rgba(21, 72, 126, 0.2)',
    },
    ':active': {
        backgroundColor: '#f5f5f5',
        transform: 'translateY(1px)',
    },
});