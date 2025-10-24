'use client';
import useStore from '@/components/stores/zstore.ts';
import { myRenderDay } from '@/components/util/leaverequest.util';
import { ActionIcon, Box, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_Cell,
  type MRT_ColumnDef
} from 'mantine-react-table';
import 'mantine-react-table/styles.css';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { ContractDatePicker } from './ContractDatePicker';
import CreateContractForm from './CreateContractForm';
import {
  AnnualLeaveEditor,
  DateCell,
  EditContractModalContent,
  EditIsActiveCell,
  validationSchema,
} from './edit.util';

// Define the shape of the contract data
interface Contract {
  id: string;
  ContractStartDate: string;
  ContractEndDate: string;
  AnnualLeave: number;
  IsActive: boolean;
}

interface ContractErrors {
  ContractStartDate?: string;
  ContractEndDate?: string;
}

export default function ContractTable({
  formValues,
  setFormValues,
  setModalOpen,
  setModalContent,
  getStaffData,
  editing,
}: {
  formValues: { contracts: Contract[] };
  setFormValues: (values: any) => void;
  setModalOpen: (open: boolean) => void;
  setModalContent: (content: string) => void;
  getStaffData: () => Promise<void>;
  editing: boolean;
}) {
  console.log('ContractTable rendered');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContractErrors>({});
  const [saving, setSaving] = useState(false);
  const { setEditErrors, setNextContractStartDate, publicHolidays, basepath, nextContractStartDate } = useStore();

  const contracts = useMemo(() => formValues.contracts, [formValues.contracts]);

  const columns = useMemo<MRT_ColumnDef<Contract>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 105,
        enableEditing: false,
      },
      {
        accessorKey: 'ContractStartDate',
        header: 'Contract start date',
        size: 155,
        Edit: (params: any) => (
          <ContractDatePicker
            param={params}
            columnKey={'ContractStartDate'}
            myRenderDay={myRenderDay}
            error={errors?.ContractStartDate}
          />
        ),
        Cell: ({ cell }: { cell: MRT_Cell<Contract, any> }) => DateCell({ cell }),
      },
      {
        accessorKey: 'ContractEndDate',
        header: 'Contract end date',
        size: 155,
        Edit: (params: any) => (
          <ContractDatePicker
            param={params}
            columnKey={'ContractEndDate'}
            myRenderDay={myRenderDay}
            error={errors?.ContractEndDate}
          />
        ),
        Cell: ({ cell }: { cell: MRT_Cell<Contract, any> }) => DateCell({ cell }),
      },
      {
        accessorKey: 'AnnualLeave',
        header: 'Annual leaves',
        size: 130,
        Edit: (params: any) => (
          <AnnualLeaveEditor
            param={params}
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
        Cell: ({ cell }: { cell: MRT_Cell<Contract, any> }) => (
          <Text>{cell.getValue<boolean>() ? 'Active' : 'Inactive'}</Text>
        ),
        Edit: (params: any) => EditIsActiveCell(params, formValues, setFormValues),
      },
    ],
    [errors, formValues, setFormValues]
  );

  useEffect(() => {
    console.log('useEffect triggered', { contracts });
    if (contracts && contracts.length > 0) {
      const _maxContractEndDate = Math.max(
        ...contracts.map((contract) => new Date(contract.ContractEndDate).getTime())
      );
      if (_maxContractEndDate && !isNaN(_maxContractEndDate)) {
        const newMaxContractEndDate = new Date(_maxContractEndDate);
        newMaxContractEndDate.setDate(newMaxContractEndDate.getDate() + 1);
        if (!nextContractStartDate || newMaxContractEndDate.getTime() !== new Date(nextContractStartDate).getTime()) {
          console.log('Updating nextContractStartDate', newMaxContractEndDate);
          setNextContractStartDate(newMaxContractEndDate);
        } else {
          console.log('Skipping nextContractStartDate update, no change');
        }
      }
    }
  }, [contracts, setNextContractStartDate, nextContractStartDate]);

  const handleEditRowCancel = async (rowEditEvent: any) => {
    console.log('rowEditEvent', rowEditEvent);
  };

  const handleSaveRow = async (rowEditEvent: any) => {
    console.log('handleSaveRow called', rowEditEvent.values);
    setSaving(true);
    const { row, values, exitEditingMode } = rowEditEvent;
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const apiurl = `${basepath}/api/staff/contract/${values.id}`;
      const contractResponse = await axios.put(apiurl, values);
      if (contractResponse.status === 200) {
        setModalContent('Staff contract updated successfully');
        setModalOpen(true);
        await getStaffData();
        exitEditingMode();
        setErrors({});
      } else {
        setModalContent(contractResponse.data.message);
        setModalOpen(true);
      }
      setEditErrors({});
    } catch (err) {
      console.log(err);
      const newErrors: Record<string, string> = {};
      if (yup.ValidationError.isError(err)) {
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
        setEditErrors(newErrors);
      }
    }
    setSaving(false);
  };

  const openDeleteConfirmModal = (row: { original: Contract }) => {
    modals.openConfirmModal({
      title: <Title order={4}>Delete contract</Title>,
      children: (
        <Text>
          Are you sure to delete the contract for the period?:<br />
          {format(new Date(row.original.ContractStartDate), 'dd-MMM-yyyy')} to{' '}
          {format(new Date(row.original.ContractEndDate), 'dd-MMM-yyyy')}<br />
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        console.log('deletecontract called', row.original.id);
        deletecontract(row.original.id);
      },
    });
  };

  const deletecontract = async (contractId: string) => {
    console.log('deletecontract called', contractId);
    try {
      const apiUrl = `${basepath}/api/staff/contract/${contractId}`;
      const response = await axios.delete(apiUrl);
      if (response.status === 200) {
        setModalContent('Staff contract deleted successfully');
        setModalOpen(true);
        await getStaffData();
      } else {
        setModalContent(response.data.message);
        setModalOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setModalContent(error.message);
      } else if (error instanceof Error) {
        setModalContent(error.message);
      } else {
        setModalContent('An unexpected error occurred');
      }
      setModalOpen(true);
    }
  };

  // Ensure table is defined with a fallback to undefined
  const table = publicHolidays
    ? useMantineReactTable<Contract>({
      columns,
      displayColumnDefOptions: { 'mrt-row-actions': { size: 150 } },
      data: contracts,
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
        style: { padding: '0.35rem 0.5rem !important', textAlign: 'left' },
      },
      mantineTableHeadCellProps: {
        className: 'ctrtblhead', // Retain for additional CSS targeting if needed
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
    })
    : undefined;

  if (!formValues) {
    return <div>Loading...</div>;
  }

  const handleCreateNewContract = async () => {
    console.log('handleCreateNewContract called');
    await getStaffData();
  };

  const handleFormToggle = (e) => {
    e.preventDefault();
    setCreateModalOpen(!createModalOpen);
  };

  return (
    <>
      {table && <MantineReactTable table={table} />}
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