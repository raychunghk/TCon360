// actions.js
export const setOpened = (opened) => ({
  type: 'SET_OPENED',
  payload: opened,
});

export const setLeaveRequestId = (leaveRequestId) => ({
  type: 'SET_LEAVE_REQUEST_ID',
  payload: leaveRequestId,
});

export const setLeaveRequestPeriod = (LeaveRequestPeriod) => ({
  type: 'SET_LEAVE_REQUEST_PERIOD',
  payload: LeaveRequestPeriod,
});

// Define other action creators in a similar manner
// ...