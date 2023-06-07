import { useState } from 'react';
import axios from 'axios';
import { useForm as useReactHookForm } from 'react-hook-form';
import { MonthPicker } from '@mantine/dates';
import { Button, Card, Grid, Modal, Text, Center, Group, Box } from '@mantine/core';
import Layout from '../../components/layout';
import Head from 'next/head';
import UserStyle from '../../styles/User.module.css';
import { basepath } from '/global';

export default function CreateTimesheet() {
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useReactHookForm();
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState(new Date());
    const onSubmit = async (event) => {
        setSubmitting(true);
        const response = await axios.get(`${basepath}/api/timesheet/create`);
        setSubmitting(false);
        if ([200, 201].includes(response.status)) {
            setModalOpen(true);
            reset();
        } else {
            console.error('Failed to create timesheet record:', response);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleMonthChange = (date) => {
        setValue(date);
    };
    return (
        <Layout home>
            <Head>
                <title>Create Timesheet</title>
            </Head>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    maw={500}
                    withBorder
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

                        borderRadius: theme.radius.md,
                        backgroundColor: theme.colors.gray[1],
                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                        },
                    })}
                >
                    <Card.Section className={UserStyle.mySection} mah={60} padding={15} ta="center" sx={{ padding: '10px', fontSize: '1rem' }}>
                        <Text weight={500}>Create TimeSheet</Text>
                    </Card.Section>
                    <Grid pb={30} ta="center">
                        <Grid.Col span={12}>
                            <Group position="center">
                                <MonthPicker maxLevel="year" value={value} onChange={setValue} />
                            </Group>
                        </Grid.Col>
                    </Grid>
                    <Card.Section bg="indigo.2" py="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Button type="submit" fullWidth loading={submitting} maw={250} radius="md">
                            Submit
                        </Button>
                    </Card.Section>
                </Card>
            </form>
            <Modal.Root opened={modalOpen} onClose={handleModalClose}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header bg="indigo.4" c='white'  >
                        <Modal.Title ><Text fw={700} fz="md">Success</Text></Modal.Title>
                        <Modal.CloseButton bg="indigo.2" />
                    </Modal.Header>
                    <Modal.Body>
                        <Text mt="md">Timesheet record created successfully!</Text>
                        <Center >
                            <Button mt="md" onClick={handleModalClose}>Ok</Button>
                        </Center>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </Layout>
    );
}