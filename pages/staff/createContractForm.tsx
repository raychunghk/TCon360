import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Col,
  TextInput,
  NumberInput,
  Switch,
  Dialog,
  Paper,
  Container,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import MyCard from 'components/MyCard';
import { excludeHoliday } from 'components/util/leaverequest.util';
interface CreateModalProps {
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
}
export default function createContractForm({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const { register, handleSubmit } = useForm();
  const [contract, setContract] = useState([
    {
      id: null,
      ContractStartDate: new Date(),
      ContractEndDate: new Date(),
      AnnualLeave: 0,
      IsActive: false,
    },
  ]);

  const submit = (data) => {
    // Handle form submission
    console.log(data);
    console.log(contract);
    onClose();
    onSubmit();
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
  return (
    <>
      <Dialog opened={open} size={'500px'} mah={'900px'} withBorder={true}>
        <form method="post" onSubmit={handleSubmit(submit)}>
          <MyCard title="Create new staff contract">
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
                    onChange={handleInputChange}
                  />
                </Col>
                <Col span={6}>
                  <Switch
                    name="isActive"
                    label="Is Active"
                    onChange={handleInputChange}
                  />
                </Col>
              </Grid>
            </Container>
            <button type="submit">Submit</button>
          </MyCard>
        </form>
      </Dialog>
    </>
  );
}
