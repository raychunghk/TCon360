import React, { useState, useEffect } from 'react';
import { useEdit } from './useEdit';
import axios from 'axios';
import * as Yup from 'yup';
import useStore from '../reducers/zstore';
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
  rem,
} from '@mantine/core';
import { format } from 'date-fns';
import { DatePickerInput } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';

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
export function AnnualLeaveEditor({ param, formValues, setFormValues }) {
  const { renderedCellValue, cell, table, column, row } = param;
  // const [leaveVal, setLeaveVal] = useState(cell.getValue());
  // const editingRow = table.getState().editingRow;
  // const cellval = cell.getValue();
  const editErrors = useStore((state) => state.editErrors);
  const { value, handleOnChange, handleBlur } = useEdit(param);
  // useEffect(() => {
  //   setLeaveVal(cellval);
  // }, [cellval]);
  //console.log(error);
  return (
    <NumberInput
      value={value}
      onChange={handleOnChange}
      required
      min={0}
      max={200}
      error={editErrors?.AnnualLeave}
      //  clampBehavior="strict"
    />
  );
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
          onLabel={'Active'}
          offLabel={'InActive'}
          color="blue"
          style={{ fontSize: rem(18) }}
          size="xl"
          fz={'xl'}
          thumbIcon={
            value ? (
              <IconCheck
                style={{ width: rem(16), height: rem(16) }}
                stroke={2.5}
                color={theme.colors.blue[6]}
              />
            ) : (
              <IconX
                //color={theme.colors.red[theme.fn.primaryShade()]}
                style={{ width: rem(16), height: rem(16) }}
                stroke={2.5}
                color={theme.colors.red[6]}
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
  //console.log(internalEditComponents);
  return (
    <Paper style={{ height: '450px' }}>
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

export const validationSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  ContractStartDate: Yup.date().required('Contract start date is required'),
  ContractEndDate: Yup.date()
    .min(
      Yup.ref('ContractStartDate'),
      'Contract end date must be greater than contract start date',
    )
    .required('Contract end date is required'),
  // AnnualLeave: Yup.number()
  //   .positive('Annual leave must be a positive number')
  //   .nonNullable('Annual leave cannot be null')
  //   .integer('Annual leave must be an integer')
  //   .required('Annual leave is required'),
  AnnualLeave: Yup.number()
    .typeError('Annual leave is required')
    .positive('Annual leave must be a positive number')
    .integer('Annual leave must be an integer')
    .required('Annual leave is required'),
  IsActive: Yup.boolean().required('IsActive is required'),
  IsActive: Yup.boolean().required('IsActive is required'),
});
