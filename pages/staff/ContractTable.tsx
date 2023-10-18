import {
  Button,
  Flex,
  Grid,
  Group,
  Paper,
  Text,
  Title,
  Tooltip,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { useSelector } from 'react-redux';
import EditIsActiveCell, {
  AnnualLeaveEditor,
  DateCell,
  EditContractModalContent,
  validationSchema,
} from './edit.util';
import { excludeHoliday, myRenderDay } from 'components/util/leaverequest.util';
import { useEffect, useState } from 'react';
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import axios from 'axios';
import CreateContractForm from './CreateContractForm';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ContractDatePicker } from './ContractDatePicker';
import useStore from 'pages/reducers/zstore';
import { format } from 'date-fns';
import { useShallow } from 'zustand/shallow';
export default function ContractTable({
  formValues,
  setFormValues,
  setModalOpen,
  setModalContent,
  getStaffData,
  edting,
}) {
  const { staff, user, publicHolidays, basepath } = useSelector((state) => ({
    staff: state.calendar.staff,
    user: state.calendar.user,
    publicHolidays: state.calendar.publicHolidays,
    basepath: state.calendar.basepath,
  }));
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [columns, setColumns] = useState([]);
  const [originalContracts, setOriginalContracts] = useState([]);
  const [maxContractEndDate, setMaxContractEndDate] = useState(null);
  /* const setEditErrors = useStore((state) => state.setEditErrors);
  const setNextContractStartDate = useStore(
    (state) => state.setNextContractStartDate,
  );*/
  /* const { setEditErrors, setNextContractStartDate } = useStore(
    (state) => ({ amount: state.setEditErrors, title: state.setNextContractStartDate }),
    shallow
  )*/
  const [setEditErrors, setNextContractStartDate] = useStore(
    useShallow((state) => [
      state.setEditErrors,
      state.setNextContractStartDate,
    ]),
  );
  useEffect(() => {
    if (formValues) {
      const newColumns = [
        {
          accessorKey: 'id',
          header: 'ID',
          size: 80,
          enableEditing: false,
        },
        {
          accessorKey: 'ContractStartDate',
          header: (
            <div style={{ whiteSpace: 'pre-line' }}>Contract start date</div>
          ),
          size: 150,
          Edit: (param) => (
            <ContractDatePicker
              param={param}
              columnKey={'ContractStartDate'} // Fixed the prop name to "columnKey"
              myRenderDay={myRenderDay}
              error={errors?.ContractStartDate}
            />
          ),
          Cell: DateCell,
        },
        {
          accessorKey: 'ContractEndDate',
          header: (
            <div style={{ whiteSpace: 'pre-line' }}>Contract end date</div>
          ),
          size: 150,
          Edit: (param) => (
            <ContractDatePicker
              param={param}
              columnKey={'ContractEndDate'} // Fixed the prop name to "columnKey"
              myRenderDay={myRenderDay}
              error={errors?.ContractEndDate}
            />
          ),

          Cell: DateCell,
        },

        {
          accessorKey: 'AnnualLeave',
          header: <div style={{ whiteSpace: 'pre-line' }}>Annual leaves</div>,
          size: 100,

          Edit: (param) => (
            <AnnualLeaveEditor
              param={param}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          ),
          enableEditing: true,
        },
        {
          accessorKey: 'IsActive',
          header: 'Status',
          size: 100,
          enableEditing: true,
          Cell: (param) => (
            <Text>{param.cell.getValue() ? 'Active' : 'Inactive'}</Text>
          ),
          Edit: (param) => EditIsActiveCell(param, formValues, setFormValues),
        },
      ];

      // var _maxContractEndDate = formValues.contracts
      //   .map(function (contract) {
      //     return contract.ContractEndDate;
      //   })
      //   .max();

      const _maxContractEndDate = Math.max(
        ...formValues.contracts.map(function (contract) {
          return new Date(contract.ContractEndDate).getTime();
        }),
      );

      if (_maxContractEndDate) {
        const maxContractEndDate = new Date(_maxContractEndDate);
        maxContractEndDate.setDate(maxContractEndDate.getDate() + 1);
        setNextContractStartDate(maxContractEndDate);
      }
      setColumns(newColumns);
    }
  }, [editing, basepath, formValues.contracts]);

  const handleEditRowCancel = async (rowEditEvent) => {
    console.log('roweditEvent', rowEditEvent);
  };
  const handleSaveRow = async (rowEditEvent) => {
    setSaving(true);
    const { row, values, exitEditingMode } = rowEditEvent;
    console.log('saving values?', values);
    try {
      // Submit the contract to the API
      const apiurl = `${basepath}/api/staff/contract/${values.id}`;

      //const contract = formValues.contracts.filter((f) => f.id === values.id);
      await validationSchema.validate(values, { abortEarly: false });
      //const contractResponse = await axios.put(apiurl, formValues.contracts);

      const contractResponse = await axios.put(apiurl, values);
      if (contractResponse.status === 200) {
        // Call getStaffData() to refresh the staff data
        setModalContent('Staff contract updated successfully');
        setModalOpen(true);
        await getStaffData();
        exitEditingMode();
        setSaving(false);
        setErrors({});
      } else {
        setModalContent(contractResponse.data.message);
        setModalOpen(true);
      }
      setEditErrors({});
    } catch (err) {
      // Handle error
      console.log(err);
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
      setEditErrors(newErrors);
      setSaving(false);
      //setModalContent(err.message);
      //setModalOpen(true);
    }
    setSaving(false);
    // Handle saving the edited row here
  };

  const openDeleteConfirmModal = (row) => {
    modals.openConfirmModal({
      title: <Title order={4}> Delete contract</Title>,

      children: (
        <Text>
          Are you sure to delete the contract for the period?:
          <p>
            {format(new Date(row.original.ContractStartDate), 'dd-MMM-yyyy')} to{' '}
            {format(new Date(row.original.ContractEndDate), 'dd-MMM-yyyy')}{' '}
          </p>
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },

      onConfirm: () => {
        deletecontract(row.original.id);
      },
    });
  };
  const deletecontract = async (contractId) => {
    // const { values, exitEditingMode } = row;
    // const contractId = values.id;

    try {
      // Send a request to delete the contract
      //const apiurl = `${basepath}/api/staff/deletecontract/${contractId}`;
      //const response = await axios.delete(apiurl);
      // const response = await fetch(apiUrl, {
      //   method: 'GET',
      // });
      // const url = `${basepath}/api/staff/hello/${contractId}`;
      const apiUrl = `${basepath}/api/staff/contract/${contractId}`;
      const response = await axios.delete(apiUrl);
      console.log('response', response);
      if (response.status === 200) {
        // Call getStaffData() to refresh the staff data
        setModalContent('Staff contract deleted successfully');
        setModalOpen(true);
        await getStaffData();
      } else {
        // Display error message using Mantine modal
        setModalContent(response.data.message);
        setModalOpen(true);
      }
    } catch (error) {
      // Handle error
      setModalContent(error.message);
      setModalOpen(true);
    }
  };
  const table =
    publicHolidays &&
    useMantineReactTable({
      columns,
      data: formValues.contracts,
      createDisplayMode: 'row',
      editDisplayMode: 'modal',
      renderEditRowModalContent: (params) =>
        EditContractModalContent(params, 'Update Contract'),
      onEditingRowSave: handleSaveRow,
      onEditingRowCancel: handleEditRowCancel,
      enableColumnResizing: true,
      enableEditing: true,
      renderTopToolbarCustomActions: ({ table }) => (
        <Group h={{ base: 45, md: 50 }} p="sx">
          <Button
            color="secondary"
            variant="filled"
            onClick={(e) => handleFormToggle(e)}
            //     onClick={() => table.setCreatingRow(true)}
          >
            Create New Contract
          </Button>
          <Text fw={500}>Manage Staff Contract Period and Annual Leaves</Text>
        </Group>
      ),
      mantineTableBodyCellProps: {
        sx: { padding: '0.35rem 0.5rem !Important', textAlign: 'left' },
      },
      mantineEditTextInputProps: ({ cell }) => ({
        onBlur: (event) => {},
      }),
      positionActionsColumn: 'last',
      initialState: {
        columnVisibility: {
          'mrt-row-expand': false,
        },
      },
      mantineTableContainerProps: {
        sx: {
          minHeight: '200px',
        },
      },
      renderRowActions: ({ row, table }) => {
        const IsActive = row.original.IsActive;
        return (
          <Flex gap="sx">
            <Tooltip label="Edit">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            {!IsActive && (
              <Tooltip label="Delete">
                <ActionIcon
                  color="red"
                  onClick={() => openDeleteConfirmModal(row)}
                >
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            )}
          </Flex>
        );
      },

      state: {
        isLoading: loading,
        isSaving: saving,
      },
    });
  if (!formValues) {
    return <div>Loading...</div>;
  }
  const handleCreateNewContract = () => {
    getStaffData();
  };
  const handleFormToggle = (e) => {
    e.preventDefault();
    setCreateModalOpen(!createModalOpen);
  };
  return (
    <>
      <MantineReactTable table={table} />
      {createModalOpen && (
        <CreateContractForm
          open={createModalOpen}
          onSubmit={handleCreateNewContract}
          staff={staff}
          modalcallback={{ setModalOpen, setModalContent }}
          stateCreateModalOpen={{ createModalOpen, setCreateModalOpen }}
        />
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
