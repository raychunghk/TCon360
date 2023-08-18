// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  opened: false,
  leaveRequestId: null,
  LeaveRequestPeriod: null,
//   chargeableDays: 0,
//   customTitle: '',
//   calendarEvents: [],
//   CurrentStart: new Date(),
//   formType: null,
//   selectedDatesCount: 0,
//   leavePurpose: null,
//   staff: null,
//   session: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPENED':
      return { ...state, opened: action.payload };
    case 'SET_LEAVE_REQUEST_ID':
      return { ...state, leaveRequestId: action.payload };
    case 'SET_LEAVE_REQUEST_PERIOD':
      return { ...state, LeaveRequestPeriod: action.payload };
    // case 'SET_CHARGEABLE_DAYS':
    //   return { ...state, chargeableDays: action.payload };
    // case 'SET_CUSTOM_TITLE':
    //   return { ...state, customTitle: action.payload };
    // case 'SET_CALENDAR_EVENTS':
    //   return { ...state, calendarEvents: action.payload };
    // case 'SET_CURRENT_START':
    //   return { ...state, CurrentStart: action.payload };
    // case 'SET_FORM_TYPE':
    //   return { ...state, formType: action.payload };
    // case 'SET_SELECTED_DATES_COUNT':
    //   return { ...state, selectedDatesCount: action.payload };
    // case 'SET_LEAVE_PURPOSE':
    //   return { ...state, leavePurpose: action.payload };
    // case 'SET_STAFF':
    //   return { ...state, staff: action.payload };
    // case 'SET_SESSION':
    //   return { ...state, session: action.payload };
    default:
      return state;
  }
};

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;