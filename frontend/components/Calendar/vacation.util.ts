// utils/vacation.util.ts
import { getBusinessDays } from '@/components/util/leaverequest.util'; // Assuming this path is correct

interface CalendarEvent {
  extendedProps: {
    result: {
      LeaveRequestId: number | null;
      leavePeriodStart: string;
      leavePeriodEnd?: string | null;
      leaveDays: number;
    };
  };
  end: string; // FullCalendar event end date
}

interface ActiveContract {
  ContractStartDate: string;
  ContractEndDate: string;
  AnnualLeave: number;
}

interface StaffVacationSummary {
  total: number;
  used: number;
  balance: number;
}

export const calculateVacationSummary = (
  activeUser: any, // Adjust type as needed
  activeContract: ActiveContract,
  calendarEvents: CalendarEvent[],
): StaffVacationSummary | null => {
  if (!activeUser || !activeContract || !calendarEvents) {
    return null;
  }

  const ContractStartDate = new Date(activeContract.ContractStartDate);
  const ContractEndDate = new Date(activeContract.ContractEndDate);

  const vacationEvents = calendarEvents.filter((event) => {
    const evt = event.extendedProps.result;
    const _leaveperiodstart = new Date(evt.leavePeriodStart);
    const _leaveperiodend = evt.leavePeriodEnd ? new Date(evt.leavePeriodEnd) : null;

    return (
      evt.LeaveRequestId !== null &&
      _leaveperiodstart <= ContractEndDate &&
      (_leaveperiodend !== null || _leaveperiodstart > ContractStartDate)
    );
  });

  const vacationLeaveDays = vacationEvents.reduce((sum, event) => {
    const evt = event.extendedProps.result;
    const _end = new Date(event.end); // FullCalendar event end date
    const _leaveperiodstart = new Date(evt.leavePeriodStart); // Original leave request start date
    const _leaveperiodend = evt.leavePeriodEnd ? new Date(evt.leavePeriodEnd) : null; // Original leave request end date

    // If the event ends before the contract start date, don't count it
    if (_end < ContractStartDate) {
      return sum;
    }

    // If the event has no end date, count the full number of leave days
    if (!_leaveperiodend) {
      return sum + evt.leaveDays;
    }

    // If the event end date is after the contract end date, count the number of leave days up to the contract end date
    if (ContractEndDate < _leaveperiodend) {
      // Ensure calculation starts from the later of _leaveperiodstart or ContractStartDate
      const effectiveStartDate = _leaveperiodstart < ContractStartDate ? ContractStartDate : _leaveperiodstart;
      return sum + getBusinessDays(effectiveStartDate, ContractEndDate);
    }

    // If the event start date is before the contract start date and the event end date is after the contract start date, count the number of leave days from the contract start date to the event end date
    if (_leaveperiodend > ContractStartDate && _leaveperiodstart < ContractStartDate) {
      return sum + getBusinessDays(ContractStartDate, _leaveperiodend);
    }

    // If the event end date is before the contract start date, don't count it
    if (_leaveperiodend < ContractStartDate) {
      return sum;
    }

    // Otherwise, count the full number of leave days
    return sum + evt.leaveDays;
  }, 0);

  return {
    total: activeContract.AnnualLeave,
    used: vacationLeaveDays,
    balance: activeContract.AnnualLeave - vacationLeaveDays,
  };
};