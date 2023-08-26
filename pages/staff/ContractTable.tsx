import { Button, Flex, Grid, Group, Paper, Text, Title } from '@mantine/core';
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
              'Contract Start Date',
              formValues,
              setFormValues,
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
              'Contract End Date',
              formValues,
              setFormValues,
              excludeHoliday,
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

  function EditContractModalContent(params, subject = 'Edit Contract Detail') {
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
      renderTopToolbarCustomActions: () => (
        <Group h={{ base: 45, md: 50 }} p="sx">
          <Button
            color="secondary"
            variant="filled"
            onClick={() => setCreateModalOpen(true)}
          >
            Create New Account
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
        editing={editing}
        setCreateModalOpen={setCreateModalOpen}
      />{' '}
      <button onClick={handleFormToggle}>Open Form</button>
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
