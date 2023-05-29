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
    const submitForm = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();
        const formURL = event.target.action

        console.log(form)
        console.log(form.values)
        const data = JSON.stringify(form.values, null, 2)
        console.log(data)
        // Turn our formData state into data we can use with a form submission
        const response = await fetch('/absproxy/5000/api/user', {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        }).then(() => {
            console.log('success')
        })
        console.log(response)
    };
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
            <form action="/absproxy/5000/api/user" method="post" onSubmit={submitForm}>
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
                                name="StaffName"
                                mt="md"
                                {...form.getInputProps('user.StaffName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Agent name"
                                placeholder="Agent name"
                                mt="md" name="AgentName"
                                {...form.getInputProps('user.AgentName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Staff category"
                                placeholder="Staff category"
                                mt="md" name="StaffCategory"
                                {...form.getInputProps('user.StaffCategory')}
                            />  </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Department"
                                placeholder="Department"
                                mt="md" name="Department"
                                {...form.getInputProps('user.Department')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput
                                label="Post Unit"
                                placeholder="Post Unit"
                                mt="md" name="PostUnit"
                                {...form.getInputProps('user.PostUnit')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager Name"
                                placeholder="Manager Name"
                                width={150}
                                mt="md" name="ManagerName"
                                {...form.getInputProps('user.ManagerName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager Title"
                                placeholder="Manager Title"
                                mt="md" name="ManagerTitle"
                                {...form.getInputProps('user.ManagerTitle')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager Email"
                                placeholder="Manager Email"
                                mt="md" name="ManagerEmail"
                                {...form.getInputProps('user.ManagerEmail')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Card.Section bg="indigo.2" p={15}>

                        <Center>
                            <Button variant="filled" color="indigo.7" maw={250} mx="auto" radius="md" type="submit">
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
            </form>
            { /*</Box>*/}
        </Layout >
    );
}