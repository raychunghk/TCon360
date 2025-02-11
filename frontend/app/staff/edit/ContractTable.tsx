import { ActionIcon, Box, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';

import useStore from '@/components/stores/zstore';
import { myRenderDay } from '@/components/util/leaverequest.util';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  MantineReactTable,
  useMantineReactTable
} from 'mantine-react-table';
import 'mantine-react-table/styles.css';
import { useEffect, useState } from 'react';
import { ContractDatePicker } from './ContractDatePicker';
import CreateContractForm from './CreateContractForm';
import EditIsActiveCell, {
  AnnualLeaveEditor,
  DateCell,
  EditContractModalContent,
  validationSchema,
} from './edit.util';

export default function ContractTable({
  formValues,
  setFormValues,
  setModalOpen,
  setModalContent,
  getStaffData,
  edting,
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [columns, setColumns] = useState([]);

  const [maxContractEndDate, setMaxContractEndDate] = useState(null);
  /* const setEditErrors = useStore((state) => state.setEditErrors);
  const setNextContractStartDate = useStore(
    (state) => state.setNextContractStartDate,
  );*/
  /* const { setEditErrors, setNextContractStartDate } = useStore(
    (state) => ({ amount: state.setEditErrors, title: state.setNextContractStartDate }),
    shallow
  )*/
  const {
    setEditErrors,
    setNextContractStartDate,
    publicHolidays,
    nextContractStartDate,

    basepath,
  } = useStore();
  useEffect(() => {
    if (formValues) {
      const newColumns = [
        {
          accessorKey: 'id',
          header: 'ID',
          size: 105,
          enableEditing: false,
        },
        {
          accessorKey: 'ContractStartDate',
          header: <div style={{ whiteSpace: 'pre-line' }}>Contract start date</div>,
          size: 155,
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
          header: <div style={{ whiteSpace: 'pre-line' }}>Contract end date</div>,
          size: 155,
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
          size: 130,

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
          size: 120,
          enableEditing: true,
          Cell: (param) => <Text>{param.cell.getValue() ? 'Active' : 'Inactive'}</Text>,
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
        })
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
      await validationSchema.validate(values, { abortEarly: false });
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
    try {
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
      displayColumnDefOptions: { 'mrt-row-actions': { size: 150 } },
      data: formValues.contracts,
      createDisplayMode: 'row',
      editDisplayMode: 'modal',
      renderEditRowModalContent: (params) => EditContractModalContent(params, 'Update Contract'),
      onEditingRowSave: handleSaveRow,
      onEditingRowCancel: handleEditRowCancel,
      enableColumnResizing: true,
      enableEditing: true,
      enableDensityToggle: true,
      renderTopToolbarCustomActions: ({ table }) => (
        <Group h={{ base: 45, md: 50 }} p="sx">
          <Button style={{ color: 'white' }} variant="filled" onClick={(e) => handleFormToggle(e)}>
            Create New Contract
          </Button>
          <Text fw={500}>Manage Staff Contract Period and Annual Leaves</Text>
        </Group>
      ),
      mantineTableBodyCellProps: {
        style: { padding: '0.35rem 0.5rem !Important', textAlign: 'left' },
      },

      mantineEditTextInputProps: ({ cell }) => ({
        onBlur: (event) => { },
      }),
      positionActionsColumn: 'last',
      initialState: { density: 'xs' },
      mantineTableContainerProps: {
        style: {
          minHeight: '200px',
          minWidth: '900px',
        },
      },
      renderRowActions: ({ row, table }) => {
        const IsActive = row.original.IsActive;
        return (
          <Box
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '3px',
              width: '900px',
            }}
          >
            <Tooltip label="Edit">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            {!IsActive && (
              <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            )}
          </Box>
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
          modalCallback={{ setModalOpen, setModalContent }}
          stateCreateModalOpen={{ createModalOpen, setCreateModalOpen }}
        />
      )}
    </>
  );
}
