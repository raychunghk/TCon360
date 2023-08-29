import { useForm, isNotEmpty } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

function MyForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      startDate: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const handleSubmit = () => {
    if (form.isValid) {
      setFormSubmitted(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('form').style.backgroundColor = '#fcfca4';
    }
  };

  return (
    <div id="form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          withAsterisk
          onKeyDown={handleKeyDown}
          {...form.getInputProps('name')}
        />
        <DatePickerInput
          label="Start Date"
          placeholder="Select start date"
          withAsterisk
          onKeyDown={handleKeyDown}
          {...form.getInputProps('startDate')}
        />

        <Button type="submit">Submit</Button>
      </form>

      {formSubmitted && <p>Form submitted successfully!</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <h1>My Form</h1>
      <MyForm />
    </div>
  );
}