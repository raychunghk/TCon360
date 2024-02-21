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
import { myRenderDay } from 'components/util/leaverequest.util';
import useStore from 'pages/reducers/zstore';
interface CreateModalProps {
  onSubmit: () => void;
  open: boolean;

  modalcallback: any;
  stateCreateModalOpen: any;
}
export default function CreateContractForm({
  open,
  onSubmit,
  modalcallback,
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
  };
  const [contract, setContract] = useState(initialState);
  useEffect(() => {
    console.log('activeStaff', activeStaff);
    if (activeStaff)
      setContract({ ...contract, staffId: activeStaff.id, activeStaff });
  }, [activeStaff, basepath]);
  useEffect(() => {
    setContract(initialState);
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
    event.stopPropagation();
    // Handle form submission
    //console.log(data);
    console.log(contract);
    console.log('basepath', basepath);
    try {
      setErrors({});
      await validationSchema.validate(contract, { abortEarly: false });
      const response = await axios.post(
        `${basepath}/api/staff/createcontract`,
        {
          ContractStartDate: contract.ContractStartDate,
          ContractEndDate: contract.ContractEndDate,
          AnnualLeave: contract.AnnualLeave,
          staffId: activeStaff.id,
          IsActive: contract.IsActive,
        },
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('New contract created:', response.data);
        // Handle successful response
        modalcallback.setModalOpen(true);
        modalcallback.setModalContent('New Contract Created!');
        //onClose();
        stateCreateModalOpen.setCreateModalOpen(!open);
        onSubmit();
        setErrors({});
        // Handle successful response
      } else {
        throw new Error('Failed to create contract');
      }

      // console.log('New contract created:', response.data);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error('Error creating contract:', err);
      modalcallback.setModalContent('Error');
      modalcallback.setModalOpen(false);
      return;
      // Handle error
    }
  };
  const handleDateInputSelect = async (date, stateobj) => {
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
    setContract(stateobj);
  };
  const handleInputChange = (event) => {
    let val = event.target.value;

    // Check if the value is a valid date
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
    const dtPickerProps = {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0,

      name: fieldName,
      error: errors[fieldName],
    };

    return dtPickerProps;
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
                    new Date(
                      new Date(contract.ContractEndDate).getTime() -
                        24 * 60 * 60 * 1000,
                    )
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
                    new Date(
                      new Date(contract.ContractStartDate).getTime() +
                        24 * 60 * 60 * 1000,
                    )
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
                    setContract({ ...contract, AnnualLeave: _annauleave });
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
