import React, { useState, useEffect } from 'react';
import { useEdit } from './useEdit';
import axios from 'axios';
import {
  // MantineReactTable,
  // useMantineReactTable,
  // type MRT_ColumnDef,
  // type MRT_Row,
  // type MRT_TableOptions,
  MRT_EditActionButtons,
} from 'mantine-react-table';
import {
  Switch,
  NumberInput,
  Text,
  useMantineTheme,
  Tooltip,
  Button,
  Paper,
  Title,
  Grid,
  Flex,
  Container,
} from '@mantine/core';
import { format } from 'date-fns';
import { DatePickerInput } from '@mantine/dates';

import { IconCheck, IconX } from '@tabler/icons-react';

export function useFetchStaff(staffId) {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/staff/${staffId}`);

        setStaff(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, [staffId]);

  return { staff, loading, error };
}
export const inputFields = [
  {
    label: 'Name of Staff',
    name: 'StaffName',
    type: 'text',
  },
  {
    label: 'Name of T-contractor',
    name: 'AgentName',
    type: 'text',
  },
  {
    label: 'Staff category',
    name: 'StaffCategory',
    type: 'text',
  },
  {
    label: 'Manager name',
    name: 'ManagerName',
    type: 'text',
  },
  {
    label: 'Manager title',
    name: 'ManagerTitle',
    type: 'text',
  },
  {
    label: 'Manager email',
    name: 'ManagerEmail',
    type: 'text',
    subtype: 'email',
  },
  {
    label: 'Department',
    name: 'Department',
    type: 'text',
  },
  {
    label: 'Post unit',
    name: 'PostUnit',
    type: 'text',
  },

  {
    label: 'Contract Start Date',
    name: 'contracts[0].ContractStartDate',
    type: 'date',
  },
  {
    label: 'Contract End Date',
    name: 'contracts[0].ContractEndDate',
    type: 'date',
  },
  {
    label: 'Annual Leave',
    name: 'contracts[0].AnnualLeave',
    type: 'number',
  },
];
export function AnnualLeaveEditor(param, formValues, setFormValues) {
  const { renderedCellValue, cell, table, column, row } = param;
  // const [leaveVal, setLeaveVal] = useState(cell.getValue());
  // const editingRow = table.getState().editingRow;
  // const cellval = cell.getValue();
  const { value, handleOnChange, handleBlur } = useEdit(param);
  // useEffect(() => {
  //   setLeaveVal(cellval);
  // }, [cellval]);

  return <NumberInput value={value} onChange={handleOnChange} />;
}

export const staffModel = {
  StaffName: '',
  AgentName: '',
  StaffCategory: '',
  ManagerName: '',
  ManagerTitle: '',
  ManagerEmail: '',
  Department: '',
  PostUnit: '',

  contracts: [
    {
      id: null,
      ContractStartDate: new Date(),
      ContractEndDate: new Date(),
      AnnualLeave: 0,
      IsActive: false,
    },
  ],
  userId: '',
  id: null,
};
export function DateCell({ cell }) {
  const cellval = cell.getValue();
  //  console.log('cellval?', cellval);
  let val;

  try {
    if (cellval instanceof Date) {
      val = format(cellval, 'yyyy-MMM-dd');
    } else {
      val = format(new Date(cellval), 'yyyy-MMM-dd');
    }
  } catch (error) {
    console.error(error);
    val = error.message;
  }
  return <Text>{val}</Text>;
}

export function createEditDateColumn(
  param,
  columnKey,

  excludeHoliday,
  myRenderDay,
) {
  const { renderedCellValue, cell, table, column, row } = param;
  const { value, handleOnChange, handleBlur } = useEdit(param);
  // const [dateVal, setDateVal] = useState(null);

  // const cellval = cell.getValue();
  // useEffect(() => {
  //   if (cellval instanceof Date) {
  //     setDateVal(cellval);
  //   } else {
  //     setDateVal(new Date(cellval));
  //   }
  // }, [cellval]);

  return (
    <>
      <DatePickerInput
        valueFormat="DD-MM-YYYY"
        name={columnKey}
        firstDayOfWeek={0}
        size="xs"
        value={new Date(value)}
        withCellSpacing={false}
        // excludeDate={excludeHoliday}
        renderDay={myRenderDay}
        // dropdownType="modal"
        style={{ zIndex: 9999 }}
        onChange={(newValue) => {
          const newDate = new Date(newValue);

          handleOnChange(newDate);
          //setFormValues(updatedFormValues);
        }}
        // Add any additional props or styling as needed
      />
    </>
  );
}

export default function EditIsActiveCell(param, formValues, setFormValues) {
  const { cell } = param;
  const [cellval, setCellValue] = useState(cell.getValue());
  const theme = useMantineTheme();
  const { value, handleOnChange, handleBlur } = useEdit(param);
  return (
    <>
      {cellval ? (
        <Container>
          <Tooltip label="To disable the contract, please turn on the next contract">
            <Button variant="outline">Active</Button>
          </Tooltip>
        </Container>
      ) : (
        <Switch
          checked={value}
          onChange={(event) => {
            handleOnChange(event.currentTarget.checked);
          }}
          color="teal"
          size="md"
          label={cellval ? 'Active' : 'Inactive'}
          thumbIcon={
            value ? (
              <IconCheck
                size="0.8rem"
                color={theme.colors.teal[theme.fn.primaryShade()]}
                stroke={3}
              />
            ) : (
              <IconX
                size="0.8rem"
                color={theme.colors.red[theme.fn.primaryShade()]}
                stroke={3}
              />
            )
          }
        />
      )}
    </>
  );
}
export  function EditContractModalContent(params, subject = 'Edit Contract Detail') {
    const { internalEditComponents, table, row } = params;

    return (
      <Paper style={{ height: '360px' }}>
        <Title order={5}>{subject}</Title>
        <Grid gutter="md">
          {internalEditComponents.map((component, index) =>
            index === 0 ? null : (
              <Grid.Col span={6} key={index} mt={'10px'}>
                {component.props.cell.column.columnDef.header}
                {component}
              </Grid.Col>
            ),
          )}
        </Grid>
        <Flex
          justify="flex-end"
          mt={'30px'}
          style={{ position: 'absolute', bottom: '20px', right: '20px' }}
        >
          <MRT_EditActionButtons row={row} table={table} variant="text" />
        </Flex>
      </Paper>
    );
  }