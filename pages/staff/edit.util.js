import React, { useState, useEffect } from 'react';
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
  const editingRow = table.getState().editingRow;
  const cellval = param.cell.getValue();
  if (editingRow !== null && row.id == editingRow.id) {
    return (
      <NumberInput
        value={cellval}
        onChange={(newValue) => {
          const updatedFormValues = { ...formValues };
          const updatedContracts = [...updatedFormValues.contracts]; // Create a copy of the contracts array
          updatedContracts[row.index] = {
            ...updatedContracts[row.index],
            AnnualLeave: Number(newValue),
          }; // Update the specific contract object
          updatedFormValues.contracts = updatedContracts; // Replace the contracts array in the formValues object
          setFormValues(updatedFormValues);
        }}
        // Add any additional props or styling as needed
      />
    );
  }

  return <Text>{renderedCellValue}</Text>;
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
  console.log('cellval?', cellval);
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
  label,
  formValues,
  setFormValues,
  excludeHoliday,
  myRenderDay,
) {
  const { renderedCellValue, cell, table, column, row } = param;
  const editingRow = table.getState().editingRow;
  const cellval = param.cell.getValue();
  let val;
  if (cellval instanceof Date) {
    val = cellval;
  } else {
    val = new Date(cellval);
  }
  if (editingRow !== null && row.id === editingRow.id) {
    return (
      <>
        <DatePickerInput
          valueFormat="DD-MM-YYYY"
          name={columnKey}
          firstDayOfWeek={0}
          size="xs"
          value={new Date(formValues.contracts[row.index][columnKey])}
          withCellSpacing={false}
          excludeDate={excludeHoliday}
          renderDay={myRenderDay}
          // dropdownType="modal"
          style={{ zIndex: 9999 }}
          onChange={(newValue) => {
            const updatedFormValues = { ...formValues };
            const updatedContracts = [...updatedFormValues.contracts];
            const newDate = new Date(newValue);

            if (isNaN(newDate.getTime())) {
              // Casting failed, set the value to the error message
              updatedContracts[row.index] = {
                ...updatedContracts[row.index],
                [columnKey]: 'Invalid date',
              };
            } else {
              updatedContracts[row.index] = {
                ...updatedContracts[row.index],
                [columnKey]: newDate,
              };
            }
            updatedFormValues.contracts = updatedContracts;

            setFormValues(updatedFormValues);
          }}
          // Add any additional props or styling as needed
        />
      </>
    );
  }
}

export default function EditIsActiveCell(param, formValues, setFormValues) {
  const { cell } = param;
  const [cellval, setCellValue] = useState(cell.getValue());
  const theme = useMantineTheme();

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
          checked={cellval}
          onChange={(event) => {
            setCellValue(event.currentTarget.checked);
            const updatedFormValues = { ...formValues };
            let updatedContracts;
            if (event.currentTarget.checked) {
              updatedContracts = updatedFormValues.contracts.map(
                (contract, index) => {
                  if (index === cell.row.index) {
                    return { ...contract, IsActive: true };
                  } else {
                    return { ...contract, IsActive: false };
                  }
                },
              );
            } else {
              updatedContracts = [...updatedFormValues.contracts];
              updatedContracts[cell.row.index] = {
                ...updatedContracts[cell.row.index],
                IsActive: event.currentTarget.checked,
              };
            }
            updatedFormValues.contracts = updatedContracts;
            setFormValues(updatedFormValues);
          }}
          color="teal"
          size="md"
          label={cellval ? 'Active' : 'Inactive'}
          thumbIcon={
            cellval ? (
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

export function EditContractModalContent(
  params,
  subject = 'Edit Contract Detail',
) {
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
