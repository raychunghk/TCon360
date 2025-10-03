import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { useEffect } from 'react';

import useStore from '@/components/stores/zstore.js';
import { useEdit } from './useEdit';

interface UseEditReturn {
  value: string | Date;
  handleOnChange: (value: any) => void;
  handleBlur: () => void;
}

export function ContractDatePicker({ param, columnKey, myRenderDay, error }) {
  const { renderedCellValue, cell, table, column, row } = param;
  const { value, handleOnChange, handleBlur } = useEdit(param) as UseEditReturn;
  const { contractStartDate, contractEndDate, contractStartMaxDate, setContractStartDate, setContractEndDate, setContractStartMaxDate, setContractEndMinDate } = useStore();

  function getEditDatePickerProps(fieldName: string) {
    const dtPickerProps = {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0 as DayOfWeek,
      name: fieldName,
    };
    return dtPickerProps;
  }

  const isContractEndDate = column.id === 'ContractEndDate';
  const isContractStartDate = column.id === 'ContractStartDate';

  useEffect(() => {
    if (isContractStartDate && !contractStartDate) {
      setContractStartDate(new Date(value));
      setContractEndMinDate(new Date(value));
    }
    if (isContractEndDate && !contractEndDate) {
      setContractEndDate(new Date(value));
    }
  }, [contractStartDate, contractEndDate, value, isContractStartDate, isContractEndDate, setContractStartDate, setContractEndMinDate, setContractEndDate]);

  // Console logs for ContractEndDate
  if (isContractEndDate) {
    console.log('ContractDatePicker: Rendering ContractEndDate', {
      minDate: row.original.ContractStartDate ? new Date(row.original.ContractStartDate).toISOString() : null,
      maxDate: null,
      currentValue: value ? new Date(value).toISOString() : null,
      rowId: row.original.id,
      isActive: row.original.IsActive,
    });
  }

  return (
    <>
      <DatePickerInput
        {...getEditDatePickerProps(columnKey)}
        size="sm"
        error={error}
        value={value ? new Date(value) : null}
        withCellSpacing={false}
        renderDay={myRenderDay}
        style={{ zIndex: 9999 }}
        minDate={isContractEndDate ? (row.original.ContractStartDate ? new Date(row.original.ContractStartDate) : undefined) : undefined}
        maxDate={isContractStartDate ? contractStartMaxDate : undefined}
        onChange={async (newValue) => {
          console.log('ContractDatePicker: onChange', { columnKey, newValue });
          if (isContractStartDate) {
            setContractStartDate(newValue);
            setContractEndMinDate(newValue ? new Date(newValue) : null);
          }
          if (isContractEndDate) {
            setContractEndDate(newValue);
          }
          handleOnChange(newValue);
        }}
      />
    </>
  );
}