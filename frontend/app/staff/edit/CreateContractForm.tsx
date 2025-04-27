import useStore from '@/components/stores/zstore';
import { myRenderDay } from '@/components/util/leaverequest.util';
import {
  Button,
  Container,
  Flex,
  Grid,
  Modal,
  NumberInput,
  Switch,
  Text,
  Title,
  rem,
  useMantineTheme
} from '@mantine/core';
import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { validationSchema } from './edit.util';

interface CreateModalProps {
  onSubmit: () => void;
  open: boolean;
  modalCallback: any;
  stateCreateModalOpen: any;
}

export default function CreateContractForm({
  open,
  onSubmit,
  modalCallback,
  stateCreateModalOpen,
}: CreateModalProps) {
  const [errors, setErrors] = useState({});
  const { register, handleSubmit } = useForm();
  const { nextContractStartDate, basepath, activeStaff } = useStore();
  interface ContractState {
    id: number | null;
    ContractStartDate: Date | null;
    ContractEndDate: Date | null;
    AnnualLeave: number;
    IsActive: boolean,
    activeStaff: any,
    staffId: number,
  }
  const initialState: ContractState = {
    id: null,
    ContractStartDate: null,
    ContractEndDate: null,
    AnnualLeave: 0,
    IsActive: false,
    activeStaff,
    staffId: 0,
  };

  const [contract, setContract] = useState(initialState);

  useEffect(() => {
    if (activeStaff) {
      setContract({ ...contract, staffId: activeStaff.id, activeStaff });
    }
  }, [activeStaff, basepath]);

  useEffect(() => {
    // setContract(initialState);
    const nextStartDate = new Date(nextContractStartDate);
    setContract({ ...contract, ContractStartDate: nextStartDate });
  }, [nextContractStartDate]);

  useEffect(() => {
    if (nextContractStartDate) {
      const nextStartDate = new Date(nextContractStartDate);
      setContract({ ...contract, ContractStartDate: nextStartDate });
    } else {
      setContract({ ...contract, ContractStartDate: null });
    }
  }, [stateCreateModalOpen.createModalOpen]);

  const theme = useMantineTheme();

  const submitContract = async () => {
    try {
      setErrors({});
      //   id?: number;
      // ContractStartDate: string | Date;
      // ContractEndDate: string | Date;
      // AnnualLeave: number;
      // staffId: number;
      // IsActive?: boolean;
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
        setErrors({});
      } else {
        throw new Error('Failed to create contract');
      }
    } catch (err) {
      // const newErrors = {};
      // err.inner.forEach((error) => {
      //   newErrors[error.path] = error.message;
      // });
      if (axios.isAxiosError(err)) {
        // Handle Axios errors
        setErrors(err);
        const axiosError = err as AxiosError;
        modalCallback.setModalContent(axiosError.message);
      } else if (err instanceof Error) {
        setErrors(err);
        // Handle other types of errors
        modalCallback.setModalContent(err.message);
      } else {

        // Fallback for unexpected errors
        modalCallback.setModalContent('An unexpected error occurred');
      }

      console.error('Error creating contract:', err);

      modalCallback.setModalOpen(false);
      return;
    }
  };

  const handleDateInputSelect = async (date: any, stateObj: any) => {
    console.log('handle date input select', date);

    // Check if there are existing validation errors
    if (yup.ValidationError.isError(errors)) {
      // Check for specific error properties
      if ('ContractEndDate' in errors || 'ContractStartDate' in errors) {
        try {
          // Validate the contract object
          await validationSchema.validate(stateObj, { abortEarly: false });
        } catch (error) {
          if (yup.ValidationError.isError(error)) {
            const newErrors: Record<string, string> = {};
            (error as yup.ValidationError).inner.forEach((err) => {
              if (err.path) {
                newErrors[err.path] = err.message;
              }
            });
            setErrors(newErrors);
          }
        }
      }
    }

    // Update the contract state
    setContract(stateObj);
  };

  const handleInputChange = (event) => {
    let val = event.target.value;

    if (val instanceof Date) {
      val = new Date(val);
      val.setHours(0, 0, 0, 0);
    }
    setContract({
      ...contract,
      [event.target.name]: val,
    });
  };

  if (!activeStaff) {
    return <Text>...Loading</Text>;
  }

  function getDatePickerProps(fieldName) {
    return {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0 as DayOfWeek,
      name: fieldName,
      error: errors[fieldName],
    };
  }
  return (
    <>
      <Modal
        opened={open}
        title={<Title order={4}>Create Contract Term</Title>}
        onClose={function (): void {
          stateCreateModalOpen.setCreateModalOpen(!open);
        }}
      >
        <form method="post" name="frmCreateContract">
          <Container h={'380px'}>
            <Grid gutter="md" py={20} mah={'500px'}>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="Contract Start Date"
                  renderDay={myRenderDay}
                  required
                  {...getDatePickerProps('ContractStartDate')}
                  value={contract.ContractStartDate}
                  onChange={(_date) =>
                    handleDateInputSelect(_date, {
                      ...contract,
                      ContractStartDate: _date,
                    })
                  }
                  maxDate={
                    (contract.ContractEndDate &&
                      new Date(new Date(contract.ContractEndDate).getTime() - 24 * 60 * 60 * 1000)) as Date | undefined
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="Contract End Date"
                  renderDay={myRenderDay}
                  required
                  {...getDatePickerProps('ContractEndDate')}
                  minDate={

                    contract.ContractStartDate
                      ? new Date(new Date(contract.ContractStartDate).getTime() + 24 * 60 * 60 * 1000)
                      : undefined
                  }
                  onChange={(_date) =>
                    handleDateInputSelect(_date, {
                      ...contract,
                      ContractEndDate: _date,
                    })
                  }
                  disabled={!contract.ContractStartDate}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  name="annualLeave"
                  label="Annual Leave"
                  error={errors['AnnualLeave']}
                  required
                  onChange={(_annauleave) => {
                    setContract({
                      ...contract,
                      AnnualLeave: parseInt(_annauleave.toString()),
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Is Active</Text>
                <Switch
                  name="IsActive"
                  onLabel={'Active'}
                  offLabel={'InActive'}
                  color="blue"
                  size="xl"
                  onChange={(evt) => {
                    console.log('event?', evt);
                    setContract({
                      ...contract,
                      IsActive: evt.target.checked,
                    });
                  }}
                  thumbIcon={
                    contract.IsActive ? (
                      <IconCheck
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={2.5}
                        color={theme.colors.blue[6]}
                      />
                    ) : (
                      <IconX
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={2.5}
                        color={theme.colors.red[6]}
                      />
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
            <Button onClick={() => submitContract()} variant="filled">
              Submit
            </Button>
          </Flex>
        </form>
      </Modal>
      {/* <Code>{JSON.stringify(contract, null, 2)}</Code> */}
    </>
  );
}
