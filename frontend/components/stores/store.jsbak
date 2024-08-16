import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { calendarReducer } from './calendarReducer';

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: [thunk, logger],
});
