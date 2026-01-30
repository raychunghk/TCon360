import { useCallback } from 'react';

const RIPPLE_DURATION_MS = 600;

const getRelativePosition = (
  event: React.MouseEvent<HTMLElement>,
  element: HTMLElement,
) => {
  const rect = element.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export const useRippleEffect = (rippleClassName: string) => {
  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.currentTarget as HTMLElement;
      const ripple = document.createElement('span');
      const { x, y } = getRelativePosition(event, target);
      const size = Math.max(target.offsetWidth, target.offsetHeight) * 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;
      ripple.className = rippleClassName;

      target.appendChild(ripple);

      window.setTimeout(() => {
        ripple.remove();
      }, RIPPLE_DURATION_MS);
    },
    [rippleClassName],
  );
};
