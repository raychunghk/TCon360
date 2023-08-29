import { useState } from 'react';
import { TextInput,   Button, Code, Notification, Container } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be later than start date'),
});

export default function YupValidationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: null,
    endDate: null,
  });

  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Submit the form or perform other actions
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          error={errors.name}
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          error={errors.email}
        />

        <DatePickerInput
          label="Start Date"
          value={formData.startDate}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
          error={errors.startDate}
          valueFormat="DD MMM YYYY hh:mm A"
        />

        <DatePickerInput
          label="End Date"
          valueFormat="DD MMM YYYY hh:mm A"
          value={formData.endDate}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
          error={errors.endDate}
        />

        <Button type="submit">Submit</Button>
      </form>
      <Code>{JSON.stringify(formData)}</Code>
    </Container>
  );
}