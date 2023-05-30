import { useForm as mUserForm } from '@mantine/form';
import { TextInput, Checkbox, Code, Text, Input, Modal, Button, Grid, Center, Card, CardSection } from '@mantine/core';
import Layout from '../../components/layout';
import Head from 'next/head';
import { useState } from 'react';
import UserStyle from '../../styles/User.module.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
export default function User() {
    const userModel = {
        StaffName: '',
        AgentName: '',
        StaffCategory: '',
        Department: '',
        PostUnit: '',
        ManagerName: '',
        ManagerTitle: '',
        ManagerEmail: '',
    }
    const [formValues, setFormValues] = useState(userModel);
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const form = mUserForm({
        initialValues: {

            user: {
                userModel
            },
        },
    });
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleInputChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };
    const onSubmit = async (event) => {
        // event.preventDefault();
        setSubmitting(true);

        const response = await axios.post('/absproxy/5000/api/user', formValues);
        //console.log(response.data);
        setSubmitting(false);
        if ([200, 201].includes(response.status)) {
            setModalOpen(true);
            setFormValues(userModel);
        } else {
            console.error('Failed to create staff record:', response);
        }

    };


    return (
        <Layout home>
            <Head>
                <title>User Information</title>
            </Head>

            <form action="/absproxy/5000/api/user" method="post" onSubmit={handleSubmit(onSubmit)}>
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
                            {/* <TextInput
                                label="Staff name"
                                placeholder="Staff name"
                                name="StaffName"
                                mt="md"
                                value={formValues.StaffName}
                                onChange={handleInputChange}
                            /> */}
                            <TextInput placeholder="Staff name"
                                mt="md" label="Staff Name" {...register('StaffName', { required: true })}
                                onChange={handleInputChange} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Agent name"
                                placeholder="Agentname"
                                name="AgentName"
                                mt="md"
                                value={formValues.AgentName}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Staff category"
                                placeholder="Staff category"
                                name="StaffCategory"
                                mt="md"
                                value={formValues.StaffCategory}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Department"
                                placeholder="Department"
                                name="Department"
                                mt="md"
                                value={formValues.Department}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Post unit"
                                placeholder="Post unit"
                                name="PostUnit"
                                mt="md"
                                value={formValues.PostUnit}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager name"
                                placeholder="Manager name"
                                name="ManagerName"
                                mt="md"
                                value={formValues.ManagerName}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager title"
                                placeholder="Manager title"
                                name="ManagerTitle"
                                mt="md"
                                value={formValues.ManagerTitle}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Manager email"
                                placeholder="Manager email"
                                name="ManagerEmail"
                                mt="md"
                                value={formValues.ManagerEmail}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>

                    </Grid>
                    <Card.Section bg="indigo.2" p={11}>

                        <Center mt="xl">

                            <Button type="submit" loading={submitting}>
                                Submit
                            </Button>
                        </Center>

                    </Card.Section>

                    <Text size="sm" weight={500} mt="xl">
                        Form values:
                    </Text>
                    <Code block mt={3}>
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
                </Card>
            </form>
            <Modal opened={modalOpen} onClose={handleModalClose} title="Success">
                <Text>Staff record created successfully!</Text>
                <Button onClick={handleModalClose}>Ok</Button>
            </Modal>
            { /*</Box>*/}
        </Layout >
    );
}