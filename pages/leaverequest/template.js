import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput, Grid, Col, useMantineTheme, Modal, Card} from '@mantine/core';
 
import axios from 'axios';
import MyCard from '../../components/MyCard';
import Layout from '../../components/layout';
import Head from 'next/head';
export default function LeaveRequestForm() {
    const theme = useMantineTheme();
    const { register, handleSubmit } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            const response = await axios.post('/api/leave', data);
            if (response.status === 200) {
                setModalOpen(true);
            } else {
                console.error('Failed to create leave request:', response);
            }
        } catch (error) {
            console.error('Failed to create leave request:', error);
        }
        setSubmitting(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Layout>
            <Head>
                <title>User Information</title>
            </Head>

            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <MyCard title="Create Staff Info">
                    <Grid gutter={theme.spacing.md} py={20}>
                        <Col span={6}>
                            <TextInput
                                placeholder="Staff name"
                                label="Staff Name"
                                {...register('staffName', { required: true })}
                            />
                        </Col>
                        <Col span={6}>
                            <TextInput
                                label="Agent name"
                                placeholder="Agentname"
                                name="agentName"
                                {...register('agentName', { required: true })}
                            />
                        </Col>
                        
                    </Grid>
                    <Card.Section bg="indigo.2" py="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

                        <Button type="submit" fullWidth loading={submitting}

                            maw={250} radius="md">
                            Submit
                        </Button>


                    </Card.Section>

                </MyCard>
            </form>

            <Modal opened={modalOpen} onClose={handleCloseModal}>
                <Modal.Header>Success</Modal.Header>
                <Modal.Body>Your leave request has been submitted successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="gradient" onClick={handleCloseModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}