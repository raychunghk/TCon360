import { Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
export default function MyGrid(props) {
  const { formValues, handleInputChange, editing, form } = props;

  return (
    <Grid pb={30} pt={30}>
      <Grid.Col span={6}>
        <TextInput
          label="Staff Name"
          placeholder="Staff name"
          name="StaffName"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.StaffName}
          {...form.getInputProps('StaffName')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Agent name"
          placeholder="Agentname"
          name="AgentName"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.AgentName}
          {...form.getInputProps('AgentName')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Staff category"
          placeholder="Staff category"
          name="StaffCategory"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.StaffCategory}
          {...form.getInputProps('StaffCategory')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Department"
          placeholder="Department"
          name="Department"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.Department}
          {...form.getInputProps('Department')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Post unit"
          placeholder="Post unit"
          name="PostUnit"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.PostUnit}
          {...form.getInputProps('PostUnit')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Manager name"
          placeholder="Manager name"
          name="ManagerName"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.ManagerName}
          {...form.getInputProps('ManagerName')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Manager title"
          placeholder="Manager title"
          name="ManagerTitle"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.ManagerTitle}
          {...form.getInputProps('ManagerTitle')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Manager email"
          placeholder="Manager email"
          name="ManagerEmail"
          onChange={handleInputChange}
          disabled={!editing}
          value={formValues.ManagerEmail}
          {...form.getInputProps('ManagerEmail')}
        />
      </Grid.Col>
    </Grid>
  );
}
