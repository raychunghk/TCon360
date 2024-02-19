import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { Button, Group, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      startDate: '',
      endDate: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email'),
      startDate: [
        (value) => {
          if (!isNotEmpty(value)) {
            return 'Start date is required';
          }
          return undefined;
        },
        (value, values) => {
          if (value && values.endDate && value > values.endDate) {
            return 'Start date must be earlier than end date';
          }
          return undefined;
        },
      ],
      endDate: [
        isNotEmpty('End date is required'),
        (value, values) => {
          if (value && values.startDate && value < values.startDate) {
            return 'End date must be later than start date';
          }
          return undefined;
        },
      ],
    },
  });

  const handleSubmit = () => {
    if (form.isValid) {
      // Submit the form or perform other actions
      console.log('Form submitted successfully');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Name"
        placeholder="Name"
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Email"
        placeholder="Email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      <DatePickerInput
        label="Start Date"
        placeholder="Start Date"
        withAsterisk
        mt="md"
        {...form.getInputProps('startDate')}
      />
      <DatePickerInput
        label="End Date"
        placeholder="End Date"
        withAsterisk
        mt="md"
        {...form.getInputProps('endDate')}
      />

      <Group justify="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

export default Demo;
