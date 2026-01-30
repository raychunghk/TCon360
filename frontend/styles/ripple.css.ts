import { keyframes, style } from '@vanilla-extract/css';

const rippleAnimation = keyframes({
  '0%': {
    transform: 'scale(0)',
    opacity: 0.6,
  },
  '100%': {
    transform: 'scale(4)',
    opacity: 0,
  },
});

export const rippleContainer = style({
  position: 'relative',
  overflow: 'hidden',
});

export const ripple = style({
  position: 'absolute',
  borderRadius: '50%',
  transform: 'scale(0)',
  animation: `${rippleAnimation} 0.6s ease-out`,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  pointerEvents: 'none',
});

export const rippleActive = style({
  selectors: {
    '&:active::after': {
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.35)',
      transform: 'translate(-50%, -50%)',
      animation: `${rippleAnimation} 0.6s ease-out`,
      pointerEvents: 'none',
    },
  },
});
