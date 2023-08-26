import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from 'mantine-react-table';
import { useState } from 'react';

type MantineTableCellProps<TData extends Record<string, any>> = {
  cell: MRT_Cell<TData>;
  column: MRT_Column<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
};

export function useEdit<TData extends Record<string, any>>(
  props: MantineTableCellProps<TData>,
) {
  const { cell, column, table } = props;

  const [value, setValue] = useState(() => cell.getValue());

  const { setEditingRow, setEditingCell, getState } = table;

  const { editingRow } = getState();

  const handleOnChange = (newValue: unknown) => {
    setValue(newValue);

    if (editingRow) {
      setEditingRow({
        ...editingRow,
        _valuesCache: { ...editingRow._valuesCache, [column.id]: newValue },
      });
    }
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  return { value, handleOnChange, handleBlur };
}
