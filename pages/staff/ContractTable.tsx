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
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { useSelector } from 'react-redux';
import EditIsActiveCell, {
  AnnualLeaveEditor,
  DateCell,
  EditContractModalContent,
  createEditDateColumn,
} from './edit.util';
import { excludeHoliday, myRenderDay } from 'components/util/leaverequest.util';
import { useEffect, useState } from 'react';
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import axios from 'axios';
import CreateContractForm from './createContractForm';
import { IconEdit, IconTrash } from '@tabler/icons-react';

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
  const [saving, setSaving] = useState(false);
  const [columns, setColumns] = useState([]);
  const [originalContracts, setOriginalContracts] = useState([]);
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
          Edit: (param) =>
            createEditDateColumn(
              param,
              'ContractStartDate',

              excludeHoliday,
              myRenderDay,
            ),

          Cell: DateCell,
        },
        {
          accessorKey: 'ContractEndDate',
          header: (
            <div style={{ whiteSpace: 'pre-line' }}>Contract end date</div>
          ),
          size: 150,
          Edit: (param) =>
            createEditDateColumn(
              param,
              'ContractEndDate',

              myRenderDay,
            ),
          Cell: DateCell,
        },

        {
          accessorKey: 'AnnualLeave',
          header: <div style={{ whiteSpace: 'pre-line' }}>Annual leaves</div>,
          size: 100,

          Edit: (param) => AnnualLeaveEditor(param, formValues, setFormValues),
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

      setColumns(newColumns);
    }
  }, [editing, basepath]);

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
      //const apiurl = `${basepath}/api/staff/updatecontracts`;

      const contract = formValues.contracts.filter((f) => f.id === values.id);
      //const contractResponse = await axios.put(apiurl, formValues.contracts);
      const contractResponse = await axios.put(apiurl, values);
      if (contractResponse.status === 200) {
        // Call getStaffData() to refresh the staff data
        setModalContent('Staff contract updated successfully');
        setModalOpen(true);
        await getStaffData();
      } else {
        // Display error message using Mantine modal
        setModalContent(contractResponse.data.message);
        setModalOpen(true);
      }
    } catch (error) {
      // Handle error
      setModalContent(error.message);
      setModalOpen(true);
    }
    exitEditingMode();
    setSaving(false);
    // Handle saving the edited row here
  };

  const openDeleteConfirmModal = (row) => {
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this contract record?',
      opend: true,
      children: (
        <Text>
          Are you sure you want to delete Contrat: {row.original.id} ? This
          action cannot be undone.
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
      // displayColumnDefOptions: {
      //   'mrt-row-actions': {
      //     header: 'Edit', //change "Actions" to "Edit"
      //     //use a text button instead of a icon button
      //     Cell: ({ row, table }) => (
      //       <Button onClick={() => table.setEditingRow(row)}>
      //         Edit Customer
      //       </Button>
      //     ),
      //   },
      // },
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
      <MantineReactTable table={table} />{' '}
      <CreateContractForm
        open={createModalOpen}
        onClose={handleFormToggle}
        onSubmit={handleCreateNewContract}
        staff={staff}
        modalcallback={{ setModalOpen, setModalContent }}
        setCreateModalOpen={setCreateModalOpen}
      />{' '}
      {/* <button onClick={handleFormToggle}>Open Form</button> */}
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
