import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  leaveRequestId: null,
  LeaveRequestPeriod: null,
  leavePurpose: null,
  staff: null,
  chargeableDays: 0,
  customTitle: '',
  calendarEvents: [],
  currentStart: new Date(),
  publicHolidays: [],
  formType: null,
  selectedDatesCount: 0,
  basepath: null,
  authtoken: '',
  user: null,
  staffVacation: { total: 0, used: 0, balance: 0 },
  contractStartDate: null,
  contractEndDate: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setOpen: (state) => {
      state.opened = true;
    },
    setClose: (state) => {
      state.opened = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPublicHolidays: (state, action) => {
      state.publicHolidays = action.payload;
    },
    setLeaveRequestId: (state, action) => {
      state.leaveRequestId = action.payload;
    },
    setLeaveRequestPeriod: (state, action) => {
      state.LeaveRequestPeriod = action.payload;
    },
    setLeavePurpose: (state, action) => {
      state.leavePurpose = action.payload;
    },
    setBasepath: (state, action) => {
      state.basepath = action.payload;
    },
    setAuthtoken: (state, action) => {
      state.authtoken = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setChargeableDays: (state, action) => {
      state.chargeableDays = action.payload;
    },
    setCustomTitle: (state, action) => {
      state.customTitle = action.payload;
    },
    setCalendarEvents: (state, action) => {
      state.calendarEvents = action.payload;
    },
    setCurrentStart: (state, action) => {
      state.currentStart = action.payload;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
    setSelectedDatesCount: (state, action) => {
      state.selectedDatesCount = action.payload;
    },
    setstaffVacation: (state, action) => {
      state.staffVacation = action.payload;
    },
    setContractStartDate: (state, action) => {
      state.contractStartDate = action.payload;
    },
    setContractEndDate: (state, action) => {
      state.contractEndDate = action.payload;
    },

    clearAllState: () => {
      return initialState;
    },
  },
});

export const {
  setOpen,
  setClose,
  setLeaveRequestId,
  setLeaveRequestPeriod,
  setLeavePurpose,
  setStaff,
  setChargeableDays,
  setCustomTitle,
  setCalendarEvents,
  setCurrentStart,
  setFormType,
  setSelectedDatesCount,
  setAuthtoken,
  setPublicHolidays,
  setBasepath,
  setUser,
  clearAllState,
  setstaffVacation,
  setContractStartDate,
  setContractEndDate,
} = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
