'use client';
import useStore from '@/components/stores/zstore.js';
import { myRenderDay } from '@/components/util/leaverequest.util';
import { Button, Code, Container, Flex, Grid, Modal, NumberInput, Switch, Text, Title, rem, useMantineTheme } from '@mantine/core';
import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { validationSchema } from './edit.util';

interface CreateModalProps {
  onSubmit: () => void;
  open: boolean;
  modalCallback: { setModalOpen: (open: boolean) => void; setModalContent: (content: string) => void };
  stateCreateModalOpen: { createModalOpen: boolean; setCreateModalOpen: (open: boolean) => void };
}

interface ContractState {
  id: number | null;
  ContractStartDate: Date | null;
  ContractEndDate: Date | null;
  AnnualLeave: number;
  IsActive: boolean;
  activeStaff: any;
  staffId: number;
}

export default function CreateContractForm({
  open,
  onSubmit,
  modalCallback,
  stateCreateModalOpen,
}: CreateModalProps) {
  const { register, handleSubmit } = useForm();
  const { nextContractStartDate, basepath, activeStaff } = useStore();
  const theme = useMantineTheme();
  const [errors, setErrors] = useState<Record<string, any>>({});
  const initialState: ContractState = {
    id: null,
    ContractStartDate: null,
    ContractEndDate: null,
    AnnualLeave: 0,
    IsActive: false,
    activeStaff: null,
    staffId: 0,
  };
  const [contract, setContract] = useState(initialState);

  useEffect(() => {
    if (activeStaff) {
      setContract({ ...contract, staffId: activeStaff.id, activeStaff });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStaff]);

  useEffect(() => {
    if (nextContractStartDate) {
      // Ensure nextContractStartDate is converted to Date if it's a string
      const startDate = new Date(nextContractStartDate);
      setContract((prev) => ({ ...prev, ContractStartDate: startDate }));
    } else {
      setContract((prev) => ({ ...prev, ContractStartDate: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextContractStartDate, stateCreateModalOpen.createModalOpen]);

  const submitContract = async () => {
    try {
      setErrors({});
      await validationSchema.validate(contract, { abortEarly: false });

      // Ensure dates are valid before sending
      const startDate = contract.ContractStartDate instanceof Date && !isNaN(contract.ContractStartDate.getTime())
        ? contract.ContractStartDate.toISOString() : null;
      const endDate = contract.ContractEndDate instanceof Date && !isNaN(contract.ContractEndDate.getTime())
        ? contract.ContractEndDate.toISOString() : null;

      const response = await axios.post(`${basepath}/api/staff/createcontract`, {
        ContractStartDate: startDate,
        ContractEndDate: endDate,
        AnnualLeave: contract.AnnualLeave,
        staffId: activeStaff.id,
        IsActive: contract.IsActive,
      });
      if (response.status >= 200 && response.status < 300) {
        modalCallback.setModalOpen(true);
        modalCallback.setModalContent('New Contract Created!');
        stateCreateModalOpen.setCreateModalOpen(false); // Close modal
        onSubmit();
      } else {
        throw new Error('Failed to create contract');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        // Handle Axios errors (e.g., server response errors)
        setErrors(err.response?.data?.errors || {});
        modalCallback.setModalContent(err.response?.data?.message || 'Server error occurred');
      } else if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
        modalCallback.setModalContent('Validation failed');
      } else {
        setErrors(err);
        modalCallback.setModalContent('An unexpected error occurred');
      }
      modalCallback.setModalOpen(true);
    }
  };

  const handleDateInputSelect = async (date: Date | null, stateObj: ContractState) => {
    // Update state immediately
    setContract(stateObj);

    // Re-validate dates if errors were present
    if (Object.keys(errors).length > 0) {
      if ('ContractEndDate' in errors || 'ContractStartDate' in errors) {
        try {
          await validationSchema.validate(stateObj, { abortEarly: false });
          setErrors({});
        } catch (error) {
          if (yup.ValidationError.isError(error)) {
            const newErrors: Record<string, string> = {};
            error.inner.forEach((err) => {
              if (err.path) {
                newErrors[err.path] = err.message;
              }
            });
            setErrors(newErrors);
          }
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  // FIX: Removed valueFormat to ensure onChange returns Date | null
  const getDatePickerProps = (fieldName: string) => ({
    firstDayOfWeek: 0 as DayOfWeek,
    name: fieldName,
    error: errors[fieldName as keyof typeof errors],
  });

  if (!activeStaff) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal
      opened={open}
      title={<Title order={4}>Create Contract Term</Title>}
      onClose={() => stateCreateModalOpen.setCreateModalOpen(false)}
    >
      <form method="post" name="frmCreateContract">
        <Container h="380px">
          <Grid gutter="md" py={20}>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Contract Start Date"
                renderDay={myRenderDay}
                required
                // Note: valueFormat is removed here via getDatePickerProps
                {...getDatePickerProps('ContractStartDate')}
                value={contract.ContractStartDate}
                onChange={(dateString) => // date is now Date | null
                {
                  if (!dateString) return null;
                  const [day, month, year] = dateString.split('-').map(Number);
                  // Note: Month is 0-based in JavaScript Date, so subtract 1 from month
                  const date = new Date(year, month - 1, day);
                  handleDateInputSelect(date, { ...contract, ContractStartDate: date })
                }
                }
                maxDate={
                  contract.ContractEndDate
                    ? new Date(new Date(contract.ContractEndDate).getTime() - 24 * 60 * 60 * 1000)
                    : undefined
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Contract End Date"
                renderDay={myRenderDay}
                required
                // Note: valueFormat is removed here via getDatePickerProps
                {...getDatePickerProps('ContractEndDate')}
                value={contract.ContractEndDate}
                minDate={
                  contract.ContractStartDate
                    ? new Date(new Date(contract.ContractStartDate).getTime() + 24 * 60 * 60 * 1000)
                    : undefined
                }
                onChange={(dateString) => // date is now Date | null
                {
                  if (!dateString) return null;
                  const [day, month, year] = dateString.split('-').map(Number);
                  // Note: Month is 0-based in JavaScript Date, so subtract 1 from month
                  const date = new Date(year, month - 1, day);
                  handleDateInputSelect(date, { ...contract, ContractEndDate: date })
                }
                }
                disabled={!contract.ContractStartDate}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                name="AnnualLeave"
                label="Annual Leave"
                error={errors['AnnualLeave' as keyof typeof errors]}
                required
                onChange={(value) =>
                  setContract({ ...contract, AnnualLeave: parseInt(value.toString()) || 0 })
                }
                value={contract.AnnualLeave}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>Is Active</Text>
              <Switch
                name="IsActive"
                onLabel="Active"
                offLabel="InActive"
                color="blue"
                size="xl"
                checked={contract.IsActive}
                onChange={(evt) => setContract({ ...contract, IsActive: evt.currentTarget.checked })}
                thumbIcon={
                  contract.IsActive ? (
                    <IconCheck style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
                  ) : (
                    <IconX style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.red[6]} />
                  )
                }
              />
            </Grid.Col>
          </Grid>
        </Container>
        <Flex justify="flex-end" align="center" direction="row" wrap="wrap">
          <Button
            variant="light"
            color="indigo"
            mr={8}
            onClick={() => {
              setErrors({});
              setContract(initialState);
              stateCreateModalOpen.setCreateModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={submitContract} variant="filled">
            Submit
          </Button>
          <Code>   {contract.ContractStartDate?.toLocaleDateString()}</Code>
        </Flex>
      </form>

    </Modal>
  );
}