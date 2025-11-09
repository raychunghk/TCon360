import { create } from 'zustand';
import { persist, PersistOptions, StorageValue } from 'zustand/middleware';
import { loadPublicHolidays } from './publicHolidaysUtil';
import { fetchStaffData } from './staffDataUtil';

const _navbarwidth = 260;

type State = {
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

type PersistState = Pick<State, 'activeUser' | 'authtoken' | 'isAuthenticated' | 'status'>;

const useStore = create<State, [['zustand/persist', PersistState]]>(
  persist(
    (set, get) => ({
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
      status: 'loading' as 'loading' | 'authenticated' | 'unauthenticated',
      setActiveContract: (contract: any) => set(() => ({ activeContract: contract })),
      setActiveStaff: (staff: any) => {
        set((state) => {
          // Find the active contract where IsActive is true
          const activeContract = state.activeContract || (staff?.contracts?.find((contract: any) => contract.IsActive === true) || null);
          console.log('zstore: setActiveStaff', { staff, activeContract });
          return { activeStaff: staff, activeContract };
        });
      },
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
          contractStartMaxDate: !state.contractStartDate && date
            ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
            : null,
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
      setStaffVacation: (vacation: { total: number; used: number; balance: number }) =>
        set(() => ({ staffVacation: vacation })),
      setCustomTitle: (title: string) => set(() => ({ customTitle: title })),
      setCurrentStart: (start: Date) => set(() => ({ currentStart: start })),
      setTimesheetDefaultDate: (date: Date) => set(() => ({ timesheetDefaultDate: date })),
      setUser: (user: any) => set(() => ({ user: user })),
      setUserStatus: (status: any) => set(() => ({ userStatus: status })),
      setConfig: (conf: any) => set(() => ({ config: conf })),
      setSelectedMonth: (date: Date) => set(() => ({ selectedMonth: date })),
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
          basepath: '',
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
        const localStorageData = typeof window !== 'undefined' ? localStorage.getItem('auth-storage') : null;
        console.log('zstore: onRehydrateStorage', { state: { activeUser: state?.activeUser, authtoken: state?.authtoken, isAuthenticated: state?.isAuthenticated, status: state?.status }, error, localStorageData });
        if (error) {
          console.error('zstore: Rehydration error', { error });
          state?.setIsAuthenticated(false);
          state?.setStatus('unauthenticated');
          return;
        }
        let parsedLocalStorageData: PersistState | null = null;
        if (typeof window !== 'undefined') {
          try {
            parsedLocalStorageData = localStorageData ? JSON.parse(localStorageData) : null;
            console.log('zstore: Parsed localStorage data', { parsedLocalStorageData });
          } catch (parseError) {
            console.error('zstore: Failed to parse localStorage data', { parseError });
          }
        }
        if (parsedLocalStorageData && parsedLocalStorageData.activeUser && parsedLocalStorageData.authtoken) {
          console.log('zstore: Restoring from localStorage due to invalid rehydrated state');
          state?.setActiveUser(parsedLocalStorageData.activeUser);
          state?.setActiveStaff(parsedLocalStorageData.activeUser.staff[0]);
          state?.setAuthtoken(parsedLocalStorageData.authtoken);
          state?.setIsAuthenticated(parsedLocalStorageData.isAuthenticated ?? true);
          state?.setStatus(parsedLocalStorageData.status ?? 'authenticated');
        } else if (state && state.activeUser && state.authtoken) {
          console.log('zstore: Rehydrating with valid session, setting authenticated');
          state.setIsAuthenticated(true);
          state.setStatus('authenticated');
          state.setStatus('loading'); // Temporary loading state
          state.fetchStaffData().then(() => {
            console.log('zstore: fetchStaffData completed', { activeUser: state.activeUser, isAuthenticated: state.isAuthenticated });
            if (state.activeUser) {
              state.setStatus('authenticated');
            } else {
              state.setIsAuthenticated(false);
              state.setStatus('unauthenticated');
            }
          }).catch((err) => {
            console.error('zstore: fetchStaffData error', { err });
            state.setIsAuthenticated(false);
            state.setStatus('unauthenticated');
          });
        } else if (state && (!state.activeUser || !state.authtoken)) {
          console.log('zstore: No valid session after rehydration, setting unauthenticated');
          state?.setIsAuthenticated(false);
          state?.setStatus('unauthenticated');
        }
      },
    } as PersistOptions<State, PersistState>
  )
);

export default useStore;