// Legacy styles - for reference or fallback
// Contains previous CreateTimeSheet styling before modernization
// Preserved for backward compatibility

import { style } from '@vanilla-extract/css';

// Original container and layout styles (pre-modern theme)
export const legacyContainer = style({
  // Basic container without rounded corners and shadows
  background: '#ffffff',
  padding: '16px',
  border: '1px solid #e0e0e0',
});

export const legacyHeader = style({
  // Original header styling
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#333333',
  marginBottom: '16px',
});

export const legacyMonthGrid = style({
  // Original grid layout
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '12px',
});

export const legacyMonthChip = style({
  // Original month chip styling
  padding: '8px 10px',
  border: '1px solid #cccccc',
  borderRadius: '4px',
  backgroundColor: '#f5f5f5',
  color: '#333333',
  fontWeight: 500,
  fontSize: '0.8rem',
  cursor: 'pointer',
});

export const legacyMonthChipActive = style([
  legacyMonthChip,
  {
    backgroundColor: '#7A2631',
    color: '#ffffff',
    borderColor: '#541A22',
  },
]);

export const legacySubmitButton = style({
  // Original button styling
  width: '100%',
  padding: '10px 16px',
  backgroundColor: '#7A2631',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
});

// Keep original submitSection for backward compatibility
export const submitSection = style({
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

// Export alias for legacy imports
export {
  legacyContainer as container,
  legacyHeader as header,
  legacyMonthGrid as monthGrid,
  legacyMonthChip as monthChip,
  legacyMonthChipActive as monthChipActive,
  legacySubmitButton as submitButton,
};
