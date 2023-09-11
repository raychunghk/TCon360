import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Col,
  NumberInput,
  Switch,
  Dialog,
  Paper,
  Container,
  Text,
  Code,
  Modal,
  Button,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import MyCard from 'components/MyCard';
import { excludeHoliday } from 'components/util/leaverequest.util';
import { useSelector } from 'react-redux';
import axios from 'axios';
interface CreateModalProps {
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
  staff: any;
  modalcallback: any;
  setCreateModalOpen: any;
}
export default function CreateContractForm({
  open,
  onClose,
  onSubmit,
  staff,
  modalcallback,
  setCreateModalOpen,
}: CreateModalProps) {
  const { basepath } = useSelector((state) => ({
    basepath: state.calendar.basepath,
  }));

  const { register, handleSubmit } = useForm();
  const [contract, setContract] = useState({
    id: null,
    ContractStartDate: new Date(),
    ContractEndDate: new Date(),
    AnnualLeave: 0,
    IsActive: false,
    staff,
  });
  useEffect(() => {
    console.log('staff', staff);
    if (staff) setContract({ ...contract, staffId: staff.id, staff });
  }, [staff, basepath]);

  const submit = async (data) => {
    // Handle form submission
    console.log(data);
    console.log(contract);
    console.log('basepath', basepath);
    try {
      const response = await axios.post(
        `${basepath}/api/staff/createcontract`,
        {
          ContractStartDate: contract.ContractStartDate,
          ContractEndDate: contract.ContractEndDate,
          AnnualLeave: contract.AnnualLeave,
          staffId: staff.id,
          IsActive: contract.IsActive,
        },
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('New contract created:', response.data);
        // Handle successful response
        modalcallback.setModalOpen(true);
        modalcallback.setModalContent('New Contract Created!');
        //onClose();
        setCreateModalOpen(!open);
        onSubmit();
        // Handle successful response
      } else {
        throw new Error('Failed to create contract');
      }

      // console.log('New contract created:', response.data);
    } catch (error) {
      console.error('Error creating contract:', error);
      // Handle error
    }
  };
  const handleDateInputSelect = (date, stateobj) => {
    console.log('handle date input select', date);

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
  if (!staff) {
    return <Text>...Loading</Text>;
  }

  return (
    <>
      {/* <Dialog
        opened={open}
        size={'500px'}
        mah={'900px'}
        onClose={onClose}
        withBorder={true}
        withCloseButton
      > */}
      <Modal
        opened={open}
        title="Create Contract Term"
        onClose={function (): void {
          setCreateModalOpen(!open);
        }}
      >
        <form method="post" onSubmit={handleSubmit(submit)}>
          <Container h={'380px'}>
            <Grid gutter="md" py={20} mah={'500px'}>
              <Col span={6}>
                <DatePickerInput
                  name="contractStartDate"
                  label="Contract Start Date"
                  required
                  onChange={(_date) =>
                    handleDateInputSelect(_date, {
                      ...contract,
                      ContractStartDate: _date,
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <DatePickerInput
                  name="contractEndDate"
                  label="Contract End Date"
                  required
                  onChange={(_date) =>
                    handleDateInputSelect(_date, {
                      ...contract,
                      ContractEndDate: _date,
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <NumberInput
                  name="annualLeave"
                  label="Annual Leave"
                  required
                  onChange={(_annauleave) => {
                    setContract({ ...contract, AnnualLeave: _annauleave });
                  }}
                />
              </Col>
              <Col span={6}>
                <Text>Is Active</Text>
                <Switch
                  name="isActive"
                  label="Is Active"
                  onChange={(evt) => {
                    console.log('event?', evt);
                    setContract({
                      ...contract,
                      IsActive: evt.target.checked,
                    });
                  }}
                />
              </Col>
            </Grid>
          </Container>
          <Button type="submit" color="secondary" variant="filled">
            Submit
          </Button>
        </form>
      </Modal>
      {/* <Code>{JSON.stringify(contract, null, 2)}</Code> */}
      {/* </Dialog> */}
    </>
  );
}
