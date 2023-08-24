import { useState, useEffect } from 'react';
import axios from 'axios';
import { NumberInput, Text } from '@mantine/core';

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
  Department: '',
  PostUnit: '',
  ManagerName: '',
  ManagerTitle: '',
  ManagerEmail: '',
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
