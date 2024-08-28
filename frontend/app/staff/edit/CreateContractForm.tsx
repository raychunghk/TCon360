import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  NumberInput,
  Switch,
  Dialog,
  Paper,
  Container,
  Text,
  Title,
  Modal,
  Button,
  useMantineTheme,
  Flex,
  rem,
} from '@mantine/core';

import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { validationSchema } from './edit.util';
import { IconCheck, IconX } from '@tabler/icons-react';
import { myRenderDay } from '@/components/util/leaverequest.util';
import useStore from '@/components/stores/zstore';

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
  const initialState = {
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
      setErrors(err);
      console.error('Error creating contract:', err);
      modalCallback.setModalContent('Error');
      modalCallback.setModalOpen(false);
      return;
    }
  };

  const handleDateInputSelect = async (date, stateObj) => {
    console.log('handle date input select', date);
    if (errors.ContractEndDate || errors.ContractStartDate) {
      try {
        await validationSchema.validate(contract, { abortEarly: false });
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
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
      firstDayOfWeek: 0,
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
                    contract.ContractEndDate &&
                    new Date(new Date(contract.ContractEndDate).getTime() - 24 * 60 * 60 * 1000)
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
                    contract.ContractStartDate &&
                    new Date(new Date(contract.ContractStartDate).getTime() + 24 * 60 * 60 * 1000)
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
                      AnnualLeave: parseInt(_annauleave),
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
