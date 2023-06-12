import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput, Grid, Col, useMantineTheme, NumberInput, Modal, Card, Select, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import MyCard from '../../components/MyCard';
import Layout from '../../components/layout';
import { format, parseISO } from 'date-fns'
import Head from 'next/head';
import { StaffService } from 'src/server/staff/service/staff.service';
export default function LeaveRequestForm({ staff }) {
    const theme = useMantineTheme();

    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [leavePeriodStart, setLeavePeriodStart] = useState(null);
    const [leavePeriodEnd, setLeavePeriodEnd] = useState(null);
    const [dateOfReturn, setDateOfReturn] = useState(null);
    const [staffSignDate, setStaffSignDate] = useState(null);
    const [AMPMStart, setAMPMStart] = useState(null);
    const [AMPMEnd, setAMPMEnd] = useState(null);
    const { register, errors } = useForm();
    const [leaveRequest, setLeaveRequest] = useState({
        leavePeriodStart: null,
        leavePeriodEnd: null,
        AMPMStart: 'AMPM',
        AMPMEnd: '',
        leaveDays: 0,
        dateOfReturn: null,
        staffSignDate: null,
        staffId: staff.id,
    });


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const validateLeaveRequest = () => {
        let isValid = true;
        if (leaveRequest.leavePeriodEnd && isUndefinedOrEmpty(leaveRequest.AMPMEnd)) {
            setLeaveRequest({
                ...leaveRequest,
                error: { AMPMEnd: 'Please select AM/PM end' },
                helper: { AMPMEnd: 'This field is required' },
            });
            isValid = false;
        } else {
            setLeaveRequest({
                ...leaveRequest,
                error: null,
                helper: null,
            });
        }
        return isValid;
    };
    useEffect(() => {
        const { leavePeriodStart, leavePeriodEnd, AMPMStart, AMPMEnd } = leaveRequest;
        const startDate = new Date(leavePeriodStart);
        const endDate = leavePeriodEnd ? new Date(leavePeriodEnd) : null;
        let days = 0;
        let returnDate = null;
        let _ampmend = AMPMEnd;
        if (endDate) {
            if (!AMPMEnd || AMPMEnd === 'NA') {
                alert('Please choose "AMPM", "AM", or "PM" for the end time');
                _ampmend = "AMPM"
                // return;
            }
            if (AMPMStart === 'AM') {
                alert('If leave period end is set, AMPM start can only be "AMPM" or "PM"');

                return;
            }
            //const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
            const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
            //const endIsAM = AMPMEnd === 'AM' || AMPMEnd === 'AMPM';
            const endIsAM = AMPMEnd === 'AM';
            const startIsPM = AMPMStart === 'PM';
            const endIsPM = AMPMEnd === 'AMPM' || AMPMEnd === 'PM';

            if (startIsAM && endIsAM) {
                days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 0.5;
                returnDate = endDate;
            } else if (startIsPM && endIsPM) {
                days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 0.5;
                returnDate = getNextWorkingDate(endDate);
            } else if (startIsPM && endIsAM) {
                days = (endDate - startDate) / (1000 * 60 * 60 * 24);
                returnDate = endDate;
            } else if (startIsAM && endIsPM) {
                days = (endDate - startDate) / (1000 * 60 * 60 * 24);
                returnDate = endDate;
            }
        } else {
            _ampmend = 'NA'
            if (AMPMStart === 'AMPM') {
                days = 1;
                returnDate = getNextWorkingDate(startDate);
            } else if (AMPMStart === 'AM') {
                days = 0.5;
                returnDate = startDate;
            } else if (AMPMStart === 'PM') {
                days = 0.5;
                returnDate = getNextWorkingDate(startDate);
            }
        }

        setLeaveRequest((prevRequest) => ({
            ...prevRequest,
            AMPMEnd: _ampmend,
            leaveDays: days,
            dateOfReturn: returnDate,
        }));
    }, [leaveRequest.AMPMStart, leaveRequest.AMPMEnd, leaveRequest.leavePeriodStart, leaveRequest.leavePeriodEnd]);

    function getNextWorkingDate(date) {
        const dayOfWeek = date.getDay();
        const daysToAdd = dayOfWeek === 5 ? 3 : dayOfWeek === 6 ? 2 : 1;
        const nextWorkingDate = new Date(date);
        nextWorkingDate.setDate(date.getDate() + daysToAdd);
        nextWorkingDate.setHours(0, 0, 0, 0);
        return nextWorkingDate;
    }

    const ampmOptions = [
        { value: 'AMPM', label: 'AM and PM' },
        { value: 'AM', label: 'AM' },
        { value: 'PM', label: 'PM' },
    ];
    const ampmOptionsEnd = [
        { value: 'NA', label: 'N/A' },
        { value: 'AMPM', label: 'AM and PM' },
        { value: 'AM', label: 'AM' },
        { value: 'PM', label: 'PM' },
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const newData = {
            leavePeriodStart: new Date(`${leaveRequest.leavePeriodStart}`).toISOString(),
            staffId: parseInt(leaveRequest.staffId),
            leavePeriodStart: new Date(`${leaveRequest.leavePeriodStart}`).toISOString(),
            leavePeriodEnd: new Date(`${leaveRequest.leavePeriodEnd}`).toISOString(),
            AMPMEnd: leaveRequest.AMPMEnd,
            AMPMStart: leaveRequest.AMPMStart,
            leaveDays: leaveRequest.leaveDays,
            dateOfReturn: new Date(leaveRequest.dateOfReturn).toISOString(),
            staffSignDate: leaveRequest.staffSignDate,
        };
        console.log('newdata: '+newData)
        try {
            const response = await axios.post('/api/leaverequest', newData);
            console.log(response.data);
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle error
        }
        setSubmitting(false);
    };
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
    return (
        <Layout>
            <Head>
                <title>User Information</title>
            </Head>

            <form method="post" onSubmit={handleSubmit}>
                <MyCard title="Create Staff Info">
                    <Grid gutter={theme.spacing.md} py={20}>
                        <Col span={6}>
                            <Text weight={500}>Staff Name:</Text>{' '}
                            <Text>{staff.StaffName}</Text>
                        </Col>
                        <Col span={6}>
                            <Text weight={500}>Agent Name:</Text>{' '}
                            <Text>{staff.AgentName}</Text>
                        </Col>
                        <Col span={6}>
                            <Text weight={500}>Staff Category:</Text>{' '}
                            <Text>{staff.StaffCategory}</Text>
                        </Col>
                        <Col span={6} />
                        <Grid.Col span={12}>
                            {leaveRequest.leavePeriodStart &&
                                leaveRequest.AMPMStart &&
                                leaveRequest.leavePeriodEnd &&
                                leaveRequest.AMPMEnd && (
                                    <p>
                                        <label >Leave Period</label><br />
                                        {`${format((leaveRequest.leavePeriodStart), 'dd-MMM-yyyy')} ${leaveRequest.AMPMStart === "AMPM" ? "" : leaveRequest.AMPMStart} to ${format((leaveRequest.leavePeriodEnd), 'dd-MMM-yyyy')} ${leaveRequest.AMPMEnd == "AMPM" ? "" : leaveRequest.AMPMEnd}`}
                                    </p>
                                )}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput clearable
                                label="Leave period start"
                                required valueFormat="DD-MM-YYYY"
                                value={leaveRequest.leavePeriodStart}
                                onChange={(value) => setLeaveRequest({ ...leaveRequest, leavePeriodStart: value })}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="AM/PM start"
                                data={ampmOptions} defaultValue="AMPM"
                                value={leaveRequest.AMPMStart}
                                onChange={(value) => setLeaveRequest({ ...leaveRequest, AMPMStart: value })}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <DatePickerInput clearable
                                label="Leave period end" valueFormat="DD-MM-YYYY"
                                value={leaveRequest.leavePeriodEnd}
                                onChange={(value) => setLeaveRequest({ ...leaveRequest, leavePeriodEnd: value })}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="AM/PM end"
                                data={ampmOptionsEnd}
                                value={leaveRequest.AMPMEnd} defaultValue="AMPM"
                                onChange={(value) =>
                                    setLeaveRequest({ ...leaveRequest, AMPMEnd: value, error: null, helper: null })
                                }
                                error={leaveRequest.error?.AMPMEnd}
                                description={leaveRequest.helper?.AMPMEnd}
                            />
                        </Grid.Col>



                        <Grid.Col span={6}>


                            <TextInput
                                id="leaveDays"
                                name="leaveDays"
                                label="Leave Days"
                                value={leaveRequest.leaveDays}

                                readOnly
                            />

                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                label="Staff sign date"
                                placeholder="Staff sign date"
                                name="staffSignDate" valueFormat="DD-MM-YYYY"
                                {...register('staffSignDate', { required: true })}
                            />

                        </Grid.Col>

                        <Grid.Col span={6}>
                            <DatePickerInput clearable
                                label="Date of Return" valueFormat="DD-MM-YYYY"
                                value={leaveRequest.dateOfReturn}

                            />
                        </Grid.Col>
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
export const getServerSideProps = async ({ params }) => {
    //const { id } = params;
    const staffService = new StaffService();
    const staff = await staffService.getStaffById(4);
    return { props: { staff } };
};