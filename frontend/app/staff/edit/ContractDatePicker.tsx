
import useStore from '@/components/stores/zstore.ts';
import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { format } from 'date-fns';
import { MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from 'mantine-react-table';
import { useEffect } from 'react';
import { useEdit } from './useEdit';

interface UseEditReturn {
  value: unknown; // Align with useEdit's return type
  handleOnChange: (value: any) => void;
  handleBlur: () => void;
}

interface ContractDatePickerProps {
  param: {
    renderedCellValue: any;
    cell: MRT_Cell<any>;
    table: MRT_TableInstance<any>;
    column: MRT_Column<any>;
    row: MRT_Row<any>;
  };
  columnKey: string;
  myRenderDay: any;
  error?: string;
}

export function ContractDatePicker({ param, columnKey, myRenderDay, error }: ContractDatePickerProps) {
  const { renderedCellValue, cell, table, column, row } = param;
  const { value, handleOnChange, handleBlur } = useEdit(param) as UseEditReturn;
  const { contractStartDate, contractEndDate, contractStartMaxDate, setContractStartDate, setContractEndDate, setContractStartMaxDate, setContractEndMinDate } = useStore();

  function getEditDatePickerProps(fieldName: string) {
    return {
      firstDayOfWeek: 0 as DayOfWeek,
      name: fieldName,
      valueFormat: 'YYYY-MM-DD',
    };
  }

  const isContractEndDate = column.id === 'ContractEndDate';
  const isContractStartDate = column.id === 'ContractStartDate';

  useEffect(() => {
    if (isContractStartDate && !contractStartDate && value) {
      const dateValue = typeof value === 'string' || value instanceof Date ? new Date(value) : null;
      const validDate = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;
      if (validDate) {
        setContractStartDate(validDate);
        setContractEndMinDate(validDate);
      }
    }
    if (isContractEndDate && !contractEndDate && value) {
      const dateValue = typeof value === 'string' || value instanceof Date ? new Date(value) : null;
      const validDate = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;
      if (validDate) {
        setContractEndDate(validDate);
      }
    }
  }, [contractStartDate, contractEndDate, value, isContractStartDate, isContractEndDate, setContractStartDate, setContractEndMinDate, setContractEndDate]);

  if (isContractEndDate) {
    const dateValue = typeof value === 'string' || value instanceof Date ? new Date(value) : null;
    const validDate = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;
    console.log('ContractDatePicker: Rendering ContractEndDate', {
      minDate: row.original.ContractStartDate ? new Date(row.original.ContractStartDate).toISOString() : null,
      maxDate: null,
      currentValue: validDate ? validDate.toISOString() : null,
      rowId: row.original.id,
      isActive: row.original.IsActive,
    });
  }

  // Safely convert value to Date or null for DatePickerInput
  const dateValue = typeof value === 'string' || value instanceof Date ? new Date(value) : null;
  //const ctrMxDate = typeof contractStartMaxDate === 'string' || contractStartMaxDate instanceof Date ? new Date(contractStartMaxDate) : null;
  const finalDateValue = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;

  return (
    <DatePickerInput
      {...getEditDatePickerProps(columnKey)}
      size="sm"
      error={error}
      value={finalDateValue}
      withCellSpacing={false}
      renderDay={myRenderDay}
      style={{ zIndex: 9999 }}
      minDate={isContractEndDate ? (row.original.ContractStartDate ? new Date(row.original.ContractStartDate) : undefined) : undefined}
      maxDate={isContractStartDate ? contractStartMaxDate?.toISOString() : undefined}
      onChange={(value: string | null) => {
        console.log('ContractDatePicker: onChange', { columnKey, value });
        const parsedDate = value ? new Date(value) : null;
        const validDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;
        const isoDate = validDate ? format(validDate, "yyyy-MM-dd'T00:00:00.000Z'") : null;
        if (isContractStartDate) {
          setContractStartDate(validDate);
          setContractEndMinDate(validDate);
        }
        if (isContractEndDate) {
          setContractEndDate(validDate);
        }
        handleOnChange(isoDate);
      }}
    />
  );
}
