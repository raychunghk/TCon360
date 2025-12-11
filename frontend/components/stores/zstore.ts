/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from '@fullcalendar/react';
import { create } from 'zustand';
import { persist, PersistOptions, StorageValue } from 'zustand/middleware';
import { loadPublicHolidays } from './publicHolidaysUtil';
import { fetchStaffData } from './staffDataUtil';

const _navbarwidth = 260;
type CalendarRef = React.MutableRefObject<FullCalendar | null>;

type State = {
  calendarRef: CalendarRef;

  activeContract: any;
  activeStaff: any;
  activeUser: any;
  authtoken: string;
  basepath: string | null;
  calendarEvents: any[];
  chargeableDays: number;
  contractEndDate: Date | null;
  contractEndMinDate: Date | null;
  contractStartDate: Date | null;
  contractStartMaxDate: Date | null;
  editErrors: any;
  LeaveRequestPeriod: any;
  leavePurpose: any;
  leaveRequestId: any;
  navbarwidth: number;
  publicHolidays: any[] | null;
  staff: any;
  staffVacation: { total: number; used: number; balance: number };
  selectedDatesCount: number;
  customTitle: string;
  currentStart: Date;
  formType: any;
  isEventUpdated: boolean;
  isFrontCalendarChangeEvent: boolean;
  isMonthPickerChangeEvent: boolean;
  nextContractStartDate: Date | null;
  selectedMonth: Date;
  monthpickerMonth: Date;
  timesheetDefaultDate: Date;
  user: any;
  userStatus: any;
  MainshellOverlayVisible: boolean;
  authOverlayVisible: boolean;
  useReverseProxy: boolean;
  config: any;
  isUnauthorized: boolean;
  isExiting: boolean;
  isAuthenticated: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  setActiveContract: (contract: any) => void;
  setCalendarRef: (ref: any) => void;

  setActiveStaff: (staff: any) => void;
  setActiveUser: (user: any) => void;
  setAuthtoken: (token: string) => void;
  setBasepath: (path: string | null) => void;
  setCalendarEvents: (events: any[]) => void;
  setChargeableDays: (days: number) => void;
  setContractEndDate: (date: Date | null) => void;
  setContractEndMinDate: (date: Date | null) => void;
  setContractStartDate: (date: Date | null) => void;
  setContractStartMaxDate: (date: Date | null) => void;
  setEditErrors: (error: any) => void;
  setFormType: (type: any) => void;
  setLeavePurpose: (purpose: any) => void;
  setLeaveRequestId: (id: any) => void;
  setLeaveRequestPeriod: (period: any) => void;
  setNextContractStartDate: (date: Date | null) => void;
  setPublicHolidays: (holidays: any[] | null) => void;
  setSelectedDatesCount: (count: number) => void;
  setStaff: (staff: any) => void;
  setStaffVacation: (vacation: { total: number; used: number; balance: number }) => void;
  setCustomTitle: (title: string) => void;
  setCurrentStart: (start: Date) => void;
  setTimesheetDefaultDate: (date: Date) => void;
  setUser: (user: any) => void;
  setUserStatus: (status: any) => void;
  setConfig: (conf: any) => void;
  setSelectedMonth: (date: Date) => void;

  setIsFrontCalendarChangeEvent: (event: boolean) => void;
  setIsMonthPickerChangeEvent: (event: boolean) => void;
  setMainshellOverlayVisible: (visible: boolean) => void;
  setAuthOverlayVisible: (visible: boolean) => void;
  setUseReverseProxy: (isUse: boolean) => void;
  setIsUnauthorized: (isUnauthorized: boolean) => void;
  setIsExiting: (isExiting: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setStatus: (status: 'loading' | 'authenticated' | 'unauthenticated') => void;
  loadPublicHolidays: () => void;
  fetchStaffData: () => Promise<void>;
  clearAllState: (options?: { preserve?: string[] }) => void;
};

type PersistState = Pick<
  State,
  'activeUser' | 'authtoken' | 'isAuthenticated' | 'status' | 'basepath' | 'activeContract'
>;
const useStore = create<State, [['zustand/persist', PersistState]]>(
  persist(
    (set, get) => ({
      calendarRef: { current: null } as CalendarRef,

      activeContract: null,
      activeStaff: null,
      activeUser: null,
      authtoken: '',
      basepath: null,
      calendarEvents: [],
      chargeableDays: 0,
      contractEndDate: null,
      contractEndMinDate: null,
      contractStartDate: null,
      contractStartMaxDate: null,
      editErrors: null,
      LeaveRequestPeriod: null,
      leavePurpose: null,
      leaveRequestId: null,
      navbarwidth: _navbarwidth,
      publicHolidays: null,
      staff: null,
      staffVacation: { total: 0, used: 0, balance: 0 },
      selectedDatesCount: 0,
      customTitle: '',
      currentStart: new Date(),
      formType: null,
      isEventUpdated: false,
      isFrontCalendarChangeEvent: false,
      isMonthPickerChangeEvent: false,
      nextContractStartDate: null,
      selectedMonth: new Date(),
      monthpickerMonth: new Date(),
      timesheetDefaultDate: new Date(),
      user: null,
      userStatus: null,
      MainshellOverlayVisible: false,
      authOverlayVisible: false,
      useReverseProxy: false,
      config: null,
      isUnauthorized: false,
      isExiting: false,
      isAuthenticated: false,
      status: 'loading' as 'loading' | 'authenticated' | 'unauthenticated',
      setCalendarRef: (calen: any) => set(() => ({ calendarRef: calen })),

      setActiveContract: (contract: any) => set(() => ({ activeContract: contract })),
      setActiveStaff: (staff: any) => set(() => ({ activeStaff: staff })),
      setActiveUser: (user: any) => {
        console.log('zstore: setActiveUser', { user, isAuthenticated: !!user, status: user ? 'authenticated' : 'unauthenticated' });
        set(() => ({ activeUser: user, isAuthenticated: !!user, status: user ? 'authenticated' : 'unauthenticated' }));
      },
      setAuthtoken: (token: string) => {
        console.log('zstore: setAuthtoken', { token });
        set(() => ({ authtoken: token }));
      },
      setBasepath: (path: string | null) => set(() => ({ basepath: path })),
      setCalendarEvents: (events: any[]) => set(() => ({ calendarEvents: events })),
      setChargeableDays: (days: number) => set(() => ({ chargeableDays: days })),
      setContractEndDate: (date: Date | null) =>
        set((state) => ({
          contractEndDate: date,
          contractStartMaxDate: !state.contractStartDate && date ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) : null,
        })),
      setContractEndMinDate: (date: Date | null) =>
        set(() => ({
          contractEndMinDate: date ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) : null,
        })),
      setContractStartDate: (date: Date | null) => set(() => ({ contractStartDate: date })),
      setContractStartMaxDate: (date: Date | null) =>
        set(() => ({
          contractStartMaxDate: date ? new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000) : null,
        })),
      setEditErrors: (error: any) => set(() => ({ editErrors: error })),
      setFormType: (type: any) => set(() => ({ formType: type })),
      setLeavePurpose: (purpose: any) => set(() => ({ leavePurpose: purpose })),
      setLeaveRequestId: (id: any) => set(() => ({ leaveRequestId: id })),
      setLeaveRequestPeriod: (period: any) => set(() => ({ LeaveRequestPeriod: period })),
      setNextContractStartDate: (date: Date | null) => set(() => ({ nextContractStartDate: date })),
      setPublicHolidays: (holidays: any[] | null) => set(() => ({ publicHolidays: holidays })),
      setSelectedDatesCount: (count: number) => set(() => ({ selectedDatesCount: count })),
      setStaff: (staff: any) => set(() => ({ staff: staff })),
      setStaffVacation: (vacation: { total: number; used: number; balance: number }) => set(() => ({ staffVacation: vacation })),
      setCustomTitle: (title: string) => set(() => ({ customTitle: title })),
      setCurrentStart: (start: Date) => set(() => ({ currentStart: start })),
      setTimesheetDefaultDate: (date: Date) => set(() => ({ timesheetDefaultDate: date })),
      setUser: (user: any) => set(() => ({ user: user })),
      setUserStatus: (status: any) => set(() => ({ userStatus: status })),
      setConfig: (conf: any) => set(() => ({ config: conf })),
      setSelectedMonth: (date: Date) => set(() => ({ selectedMonth: date })),
      setMonthpickermonth: (date: Date) => set(() => ({ monthpickerMonth: date })),
      setIsFrontCalendarChangeEvent: (event: boolean) => set(() => ({ isFrontCalendarChangeEvent: event })),
      setIsMonthPickerChangeEvent: (event: boolean) => set(() => ({ isMonthPickerChangeEvent: event })),
      setMainshellOverlayVisible: (visible: boolean) => set(() => ({ MainshellOverlayVisible: visible })),
      setAuthOverlayVisible: (visible: boolean) => set(() => ({ authOverlayVisible: visible })),
      setUseReverseProxy: (isUse: boolean) => set(() => ({ useReverseProxy: isUse })),
      setIsUnauthorized: (isUnauthorized: boolean) => set(() => ({ isUnauthorized })),
      setIsExiting: (isExiting: boolean) => set(() => ({ isExiting })),
      setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
      setStatus: (status: 'loading' | 'authenticated' | 'unauthenticated') => set(() => ({ status })),
      loadPublicHolidays: () => loadPublicHolidays(get, set),
      fetchStaffData: () => fetchStaffData(get, set),
      clearAllState: (options = {}) => {
        const { preserve = [] } = options;
        console.log('zstore: clearAllState', { preserve });
        const defaultState: Partial<State> = {
          activeContract: null,
          activeStaff: null,
          activeUser: null,
          authtoken: '',
          basepath: null,
          calendarEvents: [],
          chargeableDays: 0,
          contractEndDate: null,
          contractEndMinDate: null,
          contractStartDate: null,
          contractStartMaxDate: null,
          editErrors: null,
          LeaveRequestPeriod: null,
          leavePurpose: null,
          leaveRequestId: null,
          navbarwidth: _navbarwidth,
          publicHolidays: null,
          staff: null,
          staffVacation: { total: 0, used: 0, balance: 0 },
          selectedDatesCount: 0,
          customTitle: '',
          currentStart: new Date(),
          formType: null,
          isEventUpdated: false,
          isFrontCalendarChangeEvent: false,
          isMonthPickerChangeEvent: false,
          nextContractStartDate: null,
          selectedMonth: new Date(),
          timesheetDefaultDate: new Date(),
          user: null,
          userStatus: null,
          MainshellOverlayVisible: false,
          authOverlayVisible: false,
          useReverseProxy: false,
          config: null,
          isUnauthorized: false,
          isExiting: false,
          isAuthenticated: false,
          status: 'unauthenticated' as 'loading' | 'authenticated' | 'unauthenticated',
        };
        const preservedState: Partial<State> = {};
        preserve.forEach((key) => {
          preservedState[key] = get()[key];
        });
        set(() => ({ ...defaultState, ...preservedState }));
      },
    } as State),
    {
      name: 'auth-storage',
      partialize: (state: State) => ({
        activeUser: state.activeUser,
        authtoken: state.authtoken,
        isAuthenticated: state.isAuthenticated,
        status: state.status,
        basepath: state.basepath,
        activeContract: state.activeContract, // ← PERSISTED
      } as PersistState),
      storage: {
        getItem: (name: string) => {
          if (typeof window === 'undefined') {
            console.log('zstore: storage.getItem skipped on server', { name });
            return null;
          }
          try {
            const item = localStorage.getItem(name);
            console.log('zstore: storage.getItem', { name, item });
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error('zstore: storage.getItem error', { name, error });
            return null;
          }
        },
        setItem: (name: string, value: StorageValue<PersistState>) => {
          if (typeof window === 'undefined') {
            console.log('zstore: storage.setItem skipped on server', { name, value: value.state });
            return;
          }
          console.log('zstore: storage.setItem', { name, value: value.state });
          localStorage.setItem(name, JSON.stringify(value.state));
        },
        removeItem: (name: string) => {
          if (typeof window === 'undefined') {
            console.log('zstore: storage.removeItem skipped on server', { name });
            return;
          }
          console.log('zstore: storage.removeItem', { name });
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state, error) => {
        console.log('zstore: onRehydrateStorage', {
          state: {
            activeUser: state?.activeUser,
            authtoken: state?.authtoken,
            isAuthenticated: state?.isAuthenticated,
            status: state?.status,
            basepath: state?.basepath,
            activeContract: state?.activeContract,
          },
          error,
        });

        if (error) {
          console.error('zstore: Rehydration error', { error });
          state?.setIsAuthenticated(false);
          state?.setStatus('unauthenticated');
          state?.setBasepath(null);
          state?.setActiveContract(null);
          return;
        }

        let parsedLocalStorageData: PersistState | null = null;
        if (typeof window !== 'undefined') {
          try {
            const localStorageData = localStorage.getItem('auth-storage');
            parsedLocalStorageData = localStorageData ? JSON.parse(localStorageData) : null;
            console.log('zstore: Parsed localStorage data', { parsedLocalStorageData });
          } catch (parseError) {
            console.error('zstore: Failed to parse localStorage data', { parseError });
          }
        }

        if (parsedLocalStorageData?.activeUser && parsedLocalStorageData?.authtoken) {
          console.log('zstore: Restoring authenticated state from localStorage');

          state?.setActiveUser(parsedLocalStorageData.activeUser);
          state?.setAuthtoken(parsedLocalStorageData.authtoken);
          state?.setIsAuthenticated(true);
          state?.setStatus('authenticated');
          state?.setBasepath(parsedLocalStorageData.basepath ?? null);

          // Restore activeContract
          if (parsedLocalStorageData.activeContract) {
            state?.setActiveContract(parsedLocalStorageData.activeContract);
          }

          // Auto-set activeStaff from first staff in user.staff
          const firstStaff = parsedLocalStorageData.activeUser?.staff?.[0];
          if (firstStaff) {
            console.log('zstore: Auto-setting activeStaff from activeUser.staff[0]', firstStaff);
            state?.setActiveStaff(firstStaff);
          }
        } else {
          console.log('zstore: No valid session in localStorage, setting unauthenticated');
          state?.setIsAuthenticated(false);
          state?.setStatus('unauthenticated');
          state?.setBasepath(parsedLocalStorageData?.basepath || null);
          state?.setActiveContract(null);
        }
      },
    } as PersistOptions<State, PersistState>,
  ),
);

export default useStore;