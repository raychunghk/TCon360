import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Code, Text, Box, Button, Grid, Center, Card, CardSection } from '@mantine/core';
import Layout from '../../components/layout';
import Head from 'next/head'
import UserStyle from '../../styles/User.module.css'
export default function User() {
    const form = useForm({
        initialValues: {

            user: {
                StaffName: '',
                AgentName: '',
                StaffCategory: '',
                Department: '',
                PostUnit: '',
                ManagerName: '',
                ManagerTitle: '',
                ManagerEmail: '',
            },
        },
    });

    return (
        <Layout home>
            <Head>
                <title>User Information</title>
            </Head>
            {/* <Box maw={500} mx="lg" sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                backgroundColor: theme.colors.gray[1],
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
            })}>*/}
            <Card shadow="sm" padding="lg" radius="md" maw={500} withBorder sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                backgroundColor: theme.colors.gray[1],
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
            })}>
                <Card.Section className={UserStyle.mySection}>

                    <Center>
                        <h2>User Information</h2>
                    </Center>

                </Card.Section>
                <Grid pb={30}>

                    <Grid.Col span={6}>
                        <TextInput
                            label="Staff name"
                            placeholder="Staff name"
                            mt="md"
                            {...form.getInputProps('user.StaffName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Agent name"
                            placeholder="Agent name"
                            mt="md"
                            {...form.getInputProps('user.AgentName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Staff category"
                            placeholder="Staff category"
                            mt="md"
                            {...form.getInputProps('user.StaffCategory')}
                        />  </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Department"
                            placeholder="Department"
                            mt="md"
                            {...form.getInputProps('user.StaffCategory')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Post Unit"
                            placeholder="Post Unit"
                            mt="md"
                            {...form.getInputProps('user.PostUnit')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Manager Name"
                            placeholder="Manager Name"
                            width={150}
                            mt="md"
                            {...form.getInputProps('user.ManagerName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Manager Title"
                            placeholder="Manager Title"
                            mt="md"
                            {...form.getInputProps('user.ManagerTitle')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Manager Email"
                            placeholder="Manager Email"
                            mt="md"
                            {...form.getInputProps('user.ManagerEmail')}
                        />
                    </Grid.Col>
                </Grid>
                <Card.Section bg="indigo.2" p={15}>

                    <Center>
                        <Button variant="filled" color="indigo.7" maw={250} mx="auto" radius="md">
                            Save
                        </Button>

                    </Center>

                </Card.Section>
              
                        <Text size="sm" weight={500} mt="xl">
                            Form values:
                        </Text>

                        <Code block mt={5}>
                            {JSON.stringify(form.values, null, 2)}
                        </Code>
                 
          
            </Card>
            { /*</Box>*/}
        </Layout >
    );
}