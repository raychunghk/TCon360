import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput, Grid, Col, useMantineTheme, NumberInput, Modal, Card, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import MyCard from '../../components/MyCard';
import Layout from '../../components/layout';

import Head from 'next/head';
export default function LeaveRequestForm() {
    const theme = useMantineTheme();

    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [leavePeriodStart, setLeavePeriodStart] = useState(null);
    const [leavePeriodEnd, setLeavePeriodEnd] = useState(null);
    const [dateOfReturn, setDateOfReturn] = useState(null);
    const [staffSignDate, setStaffSignDate] = useState(null);
    const [AMPMStart, setAMPMStart] = useState(null);
    const [AMPMEnd, setAMPMEnd] = useState(null);
    const { register, handleSubmit, errors } = useForm();
    const [leaveRequest, setLeaveRequest] = useState({
        leavePeriodStart: null,
        leavePeriodEnd: null,
        AMPMStart: 'AMPM',
        AMPMEnd: '',
        leaveDays: 0,
        dateOfReturn: null,
        staffSignDate: null,
    });
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
    function isUndefinedOrEmpty(val) {
        return typeof val === 'undefined' || (typeof val === 'string' && val === '');
    }
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

        if (endDate) {
            if (!AMPMEnd) {
                alert('Please choose "AMPM", "AM", or "PM" for the end time');
                return;
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
    // useEffect(() => {
    //     if (!leaveRequest.leavePeriodStart) return;

    //     const start = new Date(leaveRequest.leavePeriodStart);
    //     let end = null;
    //     let leavedays = 0;

    //     if (leaveRequest.leavePeriodEnd) {
    //         end = new Date(leaveRequest.leavePeriodEnd);

    //         if (leaveRequest.AMPMStart === 'PM' && leaveRequest.AMPMEnd === 'AM') {
    //             // Leave starts in the afternoon and ends in the morning of the next day
    //             leavedays = 0.5 + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    //             console.log('leaveDays PMAM:', leavedays);
    //             setLeaveRequest({
    //                 ...leaveRequest,
    //                 leaveDays: leavedays,
    //                 dateOfReturn: end,
    //             });
    //             return;
    //         } else {
    //             // Calculate leave days based on start and end time
    //             // const startTime = leaveRequest.AMPMStart === 'AM' ? 9 : 14;
    //             // const endTime = leaveRequest.AMPMEnd === 'AM' ? 9 : 14;
    //             // const startDateTime = new Date(leaveRequest.leavePeriodStart + ' ' + startTime + ':00:00');
    //             // const endDateTime = new Date(leaveRequest.leavePeriodEnd + ' ' + endTime + ':00:00');
    //             const startTime = leaveRequest.AMPMStart === 'AM' ? 9 : 14;
    //             const endTime = leaveRequest.AMPMEnd === 'AM' ? 9 : 14;
    //             const startDateTime = new Date(leaveRequest.leavePeriodStart);
    //             startDateTime.setHours(startTime, 0, 0, 0);
    //             const endDateTime = new Date(leaveRequest.leavePeriodEnd);
    //             endDateTime.setHours(endTime, 0, 0, 0);
    //             console.log(leaveRequest.leavePeriodEnd + ' ' + endTime + ':00:00')
    //             console.log(leaveRequest.leavePeriodStart)
    //             console.log(leaveRequest.leavePeriodEnd)
    //             console.log(startDateTime)
    //             console.log(endDateTime)
    //             leavedays = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
    //         }
    //     } else {
    //         // Calculate leave days based on start time onlyDD-MM-YYYY
    //         leavedays = leaveRequest.AMPMStart==='AMPM' ?   1:0.5;
    //     }

    //     let nextDay;

    //     if (!isUndefinedOrEmpty(leaveRequest.leavePeriodEnd)) {

    //     }
    //     if (leaveRequest.AMPMStart==='AMPM' && !(leaveRequest.AMPMEnd)) {
    //         // Whole day leave
    //         nextDay = new Date(start.getTime() + (24 * 60 * 60 * 1000));
    //     } else if (leaveRequest.AMPMStart === 'AM' && !(leaveRequest.leavePeriodEnd)) {
    //         // Morning leave
    //         nextDay = start;
    //     } else if (leaveRequest.AMPMStart === 'PM' && !(leaveRequest.leavePeriodEnd)) {
    //         // Afternoon leave
    //         nextDay = new Date(start.getTime() + (12 * 60 * 60 * 1000));
    //     } else if (leaveRequest.AMPMEnd === 'AM') {
    //         // Return on the same day
    //         nextDay = end;
    //     } else if (leaveRequest.AMPMEnd === 'PM') {
    //         // Return on the next working day
    //         nextDay = new Date(end.getTime() + (48 * 60 * 60 * 1000));
    //     }
    //     // Skip weekends
    //     while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    //         nextDay = new Date(nextDay.getTime() + (24 * 60 * 60 * 1000));
    //     }
    //     console.log('leaveDays PMAM:', leavedays);
    //     setLeaveRequest({
    //         ...leaveRequest,
    //         leaveDays: leavedays,
    //         dateOfReturn: nextDay,
    //     });
    // }, [leaveRequest.AMPMStart, leaveRequest.AMPMEnd, leaveRequest.leavePeriodStart, leaveRequest.leavePeriodEnd]);
    const ampmOptions = [
        { value: 'AMPM', label: 'AM and PM' },
        { value: 'AM', label: 'AM' },
        { value: 'PM', label: 'PM' },
    ];
    const ampmOptionsEnd = [
        { value: 'AMPM', label: 'AM and PM' },
        { value: '', label: '' },
        { value: 'AM', label: 'AM' },
        { value: 'PM', label: 'PM' },
    ];
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
                        <Col span={6}>
                            <TextInput
                                label="Staff category"
                                placeholder="Staff category"
                                name="staffCategory"
                                {...register('staffCategory', { required: true })}
                            />
                        </Col>
                        <Col span={6} />

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
                                data={ampmOptions}
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