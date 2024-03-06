'use client';
import { create } from 'zustand';

const useStore = create((set) => ({
  contractStartDate: null,
  contractEndDate: null,
  contractStartMaxDate: null,
  contractEndMinDate: null,
  editErrors: null,
  nextContractStartDate: null,
  activeContract: null,
  activeStaff: null,
  navbarwidth: 260,
  activeUser: null,
  userStatus: null,
  publicHolidays: null,
  staffVacation: { total: 0, used: 0, balance: 0 },
  leaveRequestId: null,
  LeaveRequestPeriod: null,
  leavePurpose: null,
  staff: null,
  chargeableDays: 0,
  customTitle: '',
  calendarEvents: [],
  currentStart: new Date(),
  formType: null,
  selectedDatesCount: 0,
  authtoken: '',
  basepath: null,
  user: null,
  timesheetDefaultDate: new Date(),
  setTimesheetDefaultDate: (_dt) =>
    set((state) => ({
      timesheetDefaultDate: _dt,
    })),
  setStaffVacation: (vacation) =>
    set((state) => ({
      staffVacation: vacation,
    })),
  setPublicHolidays: (_publicholidays) =>
    set((state) => ({
      publicHolidays: _publicholidays,
    })),
  setUserStatus: (status) =>
    set((state) => ({
      userStatus: status,
    })),
  setActiveContract: (contract) =>
    set((state) => ({
      activeContract: contract,
    })),
  setActiveStaff: (staff) =>
    set((state) => ({
      activeStaff: staff,
    })),
  setActiveUser: (user) =>
    set((state) => ({
      activeUser: user,
    })),
  setNextContractStartDate: (date) =>
    set((state) => ({
      nextContractStartDate: date,
    })),
  setEditErrors: (error) =>
    set((state) => ({
      editErrors: error,
    })),
  setContractStartDate: (date) =>
    set((state) => ({
      contractStartDate: date,
    })),
  setContractEndDate: (date) =>
    set((state) => ({
      contractEndDate: date,
      contractStartMaxDate: !state.contractStartDate
        ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        : null,
    })),
  setContractStartMaxDate: (date) =>
    set((state) => ({
      contractStartMaxDate: new Date(
        new Date(date).getTime() - 24 * 60 * 60 * 1000,
      ),
    })),
  setContractEndMinDate: (date) =>
    set((state) => ({
      contractEndMinDate: new Date(
        new Date(date).getTime() + 24 * 60 * 60 * 1000,
      ),
    })),
  setLeaveRequestId: (id) =>
    set((state) => ({
      leaveRequestId: id,
    })),
  setLeaveRequestPeriod: (period) =>
    set((state) => ({
      LeaveRequestPeriod: period,
    })),
  setLeavePurpose: (purpose) =>
    set((state) => ({
      leavePurpose: purpose,
    })),
  setStaff: (staff) =>
    set((state) => ({
      staff: staff,
    })),
  setChargeableDays: (days) =>
    set((state) => ({
      chargeableDays: days,
    })),
  setCustomTitle: (title) =>
    set((state) => ({
      customTitle: title,
    })),
  setCalendarEvents: (events) =>
    set((state) => ({
      calendarEvents: events,
    })),
  setCurrentStart: (start) =>
    set((state) => ({
      currentStart: start,
    })),
  setFormType: (type) =>
    set((state) => ({
      formType: type,
    })),
  setSelectedDatesCount: (count) =>
    set((state) => ({
      selectedDatesCount: count,
    })),
  setAuthtoken: (token) =>
    set((state) => ({
      authtoken: token,
    })),
  setBasepath: (path) =>
    set((state) => ({
      basepath: path,
    })),
  setUser: (user) =>
    set((state) => ({
      user: user,
    })),
  clearAllState: () =>
    set(() => ({
      contractStartDate: null,
      contractEndDate: null,
      contractStartMaxDate: null,
      contractEndMinDate: null,
      editErrors: null,
      nextContractStartDate: null,
      activeContract: null,
      activeStaff: null,
      activeUser: null,
      userStatus: null,
      publicHolidays: null,
      staffVacation: { total: 0, used: 0, balance: 0 },
      leaveRequestId: null,
      LeaveRequestPeriod: null,
      leavePurpose: null,
      staff: null,
      chargeableDays: 0,
      navbarwidth: 230,
      customTitle: '',
      calendarEvents: [],
      currentStart: new Date(),
      formType: null,
      selectedDatesCount: 0,
      authtoken: '',
      basepath: null,
      user: null,
      isEventUpdated: false,
    })),
}));

export default useStore;
