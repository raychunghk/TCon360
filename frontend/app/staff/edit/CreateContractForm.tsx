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
  const [errors, setErrors] = useState({});
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
  }, [activeStaff]);

  useEffect(() => {
    if (nextContractStartDate) {
      setContract({ ...contract, ContractStartDate: new Date(nextContractStartDate) });
    } else {
      setContract({ ...contract, ContractStartDate: null });
    }
  }, [nextContractStartDate, stateCreateModalOpen.createModalOpen]);

  const submitContract = async () => {
    try {
      setErrors({});
      await validationSchema.validate(contract, { abortEarly: false });
      const response = await axios.post(`${basepath}/api/staff/createcontract`, {
        ContractStartDate: contract.ContractStartDate,
        ContractEndDate: contract.ContractEndDate,
        AnnualLeave: contract.AnnualLeave,
        staffId: activeStaff.id,
        IsActive: contract.IsActive,
      });
      if (response.status >= 200 && response.status < 300) {
        modalCallback.setModalOpen(true);
        modalCallback.setModalContent('New Contract Created!');
        stateCreateModalOpen.setCreateModalOpen(!open);
        onSubmit();
      } else {
        throw new Error('Failed to create contract');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err);
        modalCallback.setModalContent(err.message);
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
    if (yup.ValidationError.isError(errors)) {
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
    setContract(stateObj);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  const getDatePickerProps = (fieldName: string) => ({
    valueFormat: 'DD-MM-YYYY',
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
                {...getDatePickerProps('ContractStartDate')}
                value={contract.ContractStartDate}
                onChange={(date) =>
                  handleDateInputSelect(date, { ...contract, ContractStartDate: date })
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
                {...getDatePickerProps('ContractEndDate')}
                value={contract.ContractEndDate}
                minDate={
                  contract.ContractStartDate
                    ? new Date(new Date(contract.ContractStartDate).getTime() + 24 * 60 * 60 * 1000)
                    : undefined
                }
                onChange={(date) =>
                  handleDateInputSelect(date, { ...contract, ContractEndDate: date })
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
                  setContract({ ...contract, AnnualLeave: parseInt(value.toString()) })
                }
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
          <Code>   {contract.ContractStartDate}</Code>
        </Flex>
      </form>

    </Modal>
  );
}