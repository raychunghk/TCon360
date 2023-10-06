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
} from '@mantine/core';
import { format } from 'date-fns';
import { DatePickerInput } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setContractStartDate,
  setContractEndDate,
} from 'pages/reducers/calendarReducer';

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

  return (
    <NumberInput
      value={value}
      onChange={handleOnChange}
      required
      min={0}
      max={200}

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

export function CreateEditDateColumn({ param, columnKey, myRenderDay, error }) {
  const { renderedCellValue, cell, table, column, row } = param;
  const { value, handleOnChange, handleBlur } = useEdit(param);

  const dispatch = useDispatch();

  function getEditDatePickerProps(fieldName) {
    const dtPickerProps = {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0,
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
  const setContractStartMaxDate = useStore(
    (state) => state.setContractStartMaxDate,
  );
  const setContractEndMinDate = useStore(
    (state) => state.setContractEndMinDate,
  );

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
          const newDate = new Date(newValue);
          console.log('onchange param', param);
          if (isContractStartDate) {
            setContractStartDate(newDate);
          }
          if (isContractEndDate) {
            setContractEndDate(newDate);
          }
          handleOnChange(newDate);
        }}
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
          onLabel={'Active'}
          offLabel={'InActive'}
          color="blue"
          size="md"
          thumbIcon={
            value ? (
              <IconCheck
                size="0.8rem"
                color={theme.colors.blue[theme.fn.primaryShade()]}
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
  AnnualLeave: Yup.number()
    .positive('Annual leave must be a positive number')
    .integer('Annual leave must be an integer')
    .required('Annual leave is required'),
  IsActive: Yup.boolean().required('IsActive is required'),
});
