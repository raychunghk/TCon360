import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { useEffect } from 'react';

import useStore from '@/components/stores/zstore';
import { useEdit } from './useEdit';
interface UseEditReturn {
  value: string | Date;  // adjust this type based on what useEdit actually returns
  handleOnChange: (value: any) => void;
  handleBlur: () => void;
}

export function ContractDatePicker({ param, columnKey, myRenderDay, error }) {
  const { renderedCellValue, cell, table, column, row } = param;
  const { value, handleOnChange, handleBlur } = useEdit(param) as UseEditReturn;;

  function getEditDatePickerProps(fieldName: string) {
    const dtPickerProps = {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0 as DayOfWeek,
      name: fieldName,
    };

    return dtPickerProps;
  }
  const columnid = column.id;
  const isContractEndDate = column.id === 'ContractEndDate';
  const isContractStartDate = column.id === 'ContractStartDate';
  const constractStartDate = useStore((state) => state.constractStartDate);
  const constractEndDate = useStore((state) => state.constractEndDate);
  const contractStartMaxDate = useStore((state) => state.contractStartMaxDate);
  const contractEndMinDate = useStore((state) => state.contractEndMinDate);
  const setContractStartDate = useStore((state) => state.setContractStartDate);
  const setContractEndDate = useStore((state) => state.setContractEndDate);
  const setContractStartMaxDate = useStore((state) => state.setContractStartMaxDate);
  const setContractEndMinDate = useStore((state) => state.setContractEndMinDate);

  useEffect(() => {
    if (isContractStartDate && !constractStartDate) {
      setContractStartDate(new Date(value));
      setContractEndMinDate(new Date(value));
    }
    if (isContractEndDate && !constractEndDate) {
      setContractEndDate(new Date(value));
      setContractStartMaxDate(new Date(value));
    }
  }, [constractStartDate, constractEndDate, value]);

  if (isContractEndDate) console.log('contractEndMinDate', contractEndMinDate);
  return (
    <>
      <DatePickerInput
        ///firstDayOfWeek={0}
        {...getEditDatePickerProps('ContractStartDate')}
        size="sm"
        error={error}
        value={new Date(value)}
        withCellSpacing={false}
        // excludeDate={excludeHoliday}
        renderDay={myRenderDay}
        style={{ zIndex: 9999 }}
        minDate={isContractEndDate && contractEndMinDate}
        maxDate={isContractStartDate && contractStartMaxDate}
        onChange={async (newValue) => {
          //  const newDate = new Date(newValue);
          console.log('onchange param', param);
          if (isContractStartDate) {
            setContractStartDate(newValue);
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
