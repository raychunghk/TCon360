import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { create } from 'zustand';
import FrontPageCalendar from '@/components/Calendar/FrontPageCalendar';
import useStore from '@/components/stores/zstore';
import useUIStore from '@/components/stores/useUIStore';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock stores
jest.mock('@/components/stores/zstore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/stores/useUIStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock auth actions
jest.mock('@/app/lib/auth-action', () => ({
  SignOut: jest.fn(),
}));

// Mock FullCalendar
jest.mock('@fullcalendar/react', () => ({
  __esModule: true,
  default: () => <div data-testid="full-calendar">Mock Calendar</div>,
}));

describe('FrontPageCalendar - API Call Optimization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Setup default mock implementations
    (useStore as jest.Mock).mockReturnValue({
      setLeaveRequestPeriod: jest.fn(),
      setStaffVacation: jest.fn(),
      setCalendarEvents: jest.fn(),
      setIsFrontCalendarChangeEvent: jest.fn(),
      setSelectedMonth: jest.fn(),
      timesheetDefaultDate: null,
      calendarEvents: [],
      setChargeableDays: jest.fn(),
      setLeaveRequestId: jest.fn(),
      leaveRequestId: null,
      activeStaff: { id: 1, name: 'Test Staff' },
      setStatus: jest.fn(),
      setIsAuthenticated: jest.fn(),
      setIsUnauthorized: jest.fn(),
      setIsExiting: jest.fn(),
      setCalendarRef: jest.fn(),
      LeaveRequestPeriod: null,
      isMonthPickerChangeEvent: false,
      activeUser: { id: 1, name: 'Test User' },
      activeContract: {
        ContractStartDate: '2024-01-01',
        ContractEndDate: '2024-12-31',
        AnnualLeave: 20,
      },
      basepath: 'http://localhost:3000',
      isExiting: false,
    });

    (useUIStore as jest.Mock).mockReturnValue({
      drawerOpened: false,
      setDrawerOpen: jest.fn(),
      setDrawerClose: jest.fn(),
      isEventUpdated: false,
      setIsEventUpdated: jest.fn(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should only call /api/timesheet/calendar once on initial load', async () => {
    // Mock API response
    const mockEvents = [
      {
        id: 1,
        title: 'Leave Request',
        start: '2024-01-15',
        extendedProps: { result: { LeaveRequestId: 1, leaveDays: 1 } },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockEvents,
    });

    // Render component with mocked store
    const { rerender } = renderHook(() => {
      const store = useStore();
      return { ...store };
    });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Verify API was called with correct URL
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/timesheet/calendar'),
      expect.any(Object)
    );
  });

  it('should not refetch when calendarEvents is in dependency array', async () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Leave Request',
        start: '2024-01-15',
        extendedProps: { result: { LeaveRequestId: 1, leaveDays: 1 } },
      },
    ];

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockEvents,
    });

    // Initial render - should call once
    const { rerender } = renderHook(() => useStore());
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Update state - should NOT trigger new fetch
    rerender();
    
    await waitFor(() => {
      // Still only 1 call, not multiple
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    }, { timeout: 2000 });
  });

  it('should handle 401 unauthorized error gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 401 },
    });

    const { result } = renderHook(() => useStore());
    
    await waitFor(() => {
      // Should not crash, should handle auth error
      expect(result.current.setIsUnauthorized).toHaveBeenCalled();
    });
  });

  it('should debounce multiple activeStaff changes', async () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Leave Request',
        start: '2024-01-15',
        extendedProps: { result: { LeaveRequestId: 1 } },
      },
    ];

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockEvents,
    });

    const { rerender } = renderHook(() => useStore());
    
    // Simulate rapid activeStaff changes
    const store = useStore.getState();
    store.setActiveStaff({ id: 1, name: 'Staff 1' });
    store.setActiveStaff({ id: 1, name: 'Staff 1' }); // Same staff
    store.setActiveStaff({ id: 1, name: 'Staff 1' }); // Same staff
    
    await waitFor(() => {
      // Should batch calls, not trigger 3 separate fetches
      expect(mockedAxios.get.mock.calls.length).toBeLessThanOrEqual(2);
    });
  });

  it('should include performance metrics in console logs', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [{ id: 1, title: 'Test' }],
    });

    renderHook(() => useStore());

    await waitFor(() => {
      // Check that performance logs were called
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📡 API Call'),
        expect.any(Object)
      );
    });

    consoleSpy.mockRestore();
  });

  it('should only fetch once when isEventUpdated is false', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [{ id: 1, title: 'Test' }],
    });

    renderHook(() => useStore());

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Simulate state updates that shouldn't trigger new fetches
    const { rerender } = renderHook(() => useStore());
    rerender();

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('should skip fetch when isExiting is true', async () => {
    (useStore as jest.Mock).mockReturnValue({
      ...jest.requireActual('@/components/stores/zstore'),
      isExiting: true,
      activeStaff: { id: 1, name: 'Test Staff' },
    });

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: [],
    });

    renderHook(() => useStore());

    // Should not call API when isExiting is true
    await waitFor(() => {
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });
  });

  it('should handle empty events response correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [],
    });

    const { result } = renderHook(() => useStore());
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(result.current.setHasCalendar).toHaveBeenCalledWith(false);
    });
  });
});