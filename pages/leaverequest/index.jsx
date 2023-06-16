import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput, Grid, Col, useMantineTheme, Center, NumberInput, Modal, Card, Select, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import MyCard from '../../components/MyCard';
import Layout from '../../components/layout';
import MyModal from '../../components/MyModal';
import { format, parseISO, isWeekend } from 'date-fns'
import { basepath} from '/global';
import Head from 'next/head';
import { useForm as uForm } from 'react-hook-form';
import { StaffService } from 'src/server/staff/service/staff.service';
export default function LeaveRequestForm({ staff }) {
    const theme = useMantineTheme();
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { register, errors, reset, handleSubmit } = useForm();
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

    const handleModalClose = () => {
        setModalOpen(false);
    };
    //   const { register, handleSubmit, reset } = uForm();
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
                alert('If leave period end is set, AMPM start can only be "AMPM" or "PM"'); return;
            }
            //const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
            const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
            //const endIsAM = AMPMEnd === 'AM' || AMPMEnd === 'AMPM';
            const endIsAM = AMPMEnd === 'AM';
            const startIsPM = AMPMStart === 'PM';
            const endIsPM = AMPMEnd === 'AMPM' || AMPMEnd === 'PM'; if (startIsAM && endIsAM) {
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
        } setLeaveRequest((prevRequest) => ({
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
    };
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
    const onSubmit = async (e) => {
        setSubmitting(true);
        /*

{
    leavePeriodStart: string | Date;
    AMPMStart?: string;
    leavePeriodEnd: string | Date;
    AMPMEnd?: string;
    leaveDays: string;
    dateOfReturn: string | Date;
    staffSignDate: string;
    staff: Prisma.StaffCreateNestedOneWithoutLeaveRequestsInput;
}
        */
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
        console.log('newdata: ' + newData)
        try {
            const response = await axios.post(`${basepath}/api/leaverequest/${newData.staffId}`, newData);
            console.log(response.data);
            if ([200, 201].includes(response.status)) {
                setModalOpen(true);
                reset();
                setFormValues(userModel);
            } else {
                console.error('Failed to create staff record:', response);
            }
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle error
        }
        setSubmitting(false);

    };

    const disabledDates = {

        daysOfWeek: [0, 6] // 0 is Sunday, 6 is Saturday
    };

    const handleDateInputSelect = (date, stateobj) => {

        if (!isWeekend(date)) {
            //           setSelected((current) => [...current, date]);
            setLeaveRequest(stateobj)
        }
    };

    return (
        <Layout>
            <Head>
                <title>User Information</title>
            </Head>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <MyCard title="Create Vacation Request">
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
                                onChange={(_date) => handleDateInputSelect(_date, { ...leaveRequest, leavePeriodStart: _date })}

                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="AM/PM start"
                                data={ampmOptions} defaultValue="AMPM"
                                value={leaveRequest.AMPMStart}
                                onChange={(value) => setLeaveRequest({ ...leaveRequest, AMPMStart: value })}
                            />
                        </Grid.Col>                        <Grid.Col span={6}>
                            <DatePickerInput clearable
                                label="Leave period end" valueFormat="DD-MM-YYYY"
                                value={leaveRequest.leavePeriodEnd}


                                minDate={leaveRequest.leavePeriodStart}
                                onChange={(_date) => handleDateInputSelect(_date, { ...leaveRequest, leavePeriodEnd: _date })}
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
                                value={leaveRequest.leaveDays} readOnly
                            />                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                label="Staff sign date" clearable
                                placeholder="Staff sign date"
                                name="staffSignDate" valueFormat="DD-MM-YYYY"
                                onChange={(_date) => handleDateInputSelect(_date, { ...leaveRequest, staffSignDate: _date, error: null, helper: null })
                                }
                                value={leaveRequest.staffSignDate}

                            />

                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput clearable name="dateOfReturn"
                                label="Date of Return" valueFormat="DD-MM-YYYY"
                                value={leaveRequest.dateOfReturn} />
                        </Grid.Col>
                    </Grid>
                    <Card.Section bg="indigo.2" py="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>                        <Button type="submit" fullWidth loading={submitting} maw={250} radius="md">
                        Submit
                    </Button>
                    </Card.Section>
                </MyCard>
            </form>
            <MyModal
                open={modalOpen}
                onClose={handleModalClose}
                msg={"Leave Record Created Successfully"}
            />
            {/* <Modal.Root opened={modalOpen} onClose={handleModalClose}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header bg="indigo.4" c='white'  >
                        <Modal.Title ><Text fw={700} fz="md">Success</Text></Modal.Title>
                        <Modal.CloseButton bg="indigo.2" />
                    </Modal.Header>
                    <Modal.Body>
                        <Text mt="md">LeaveRequest created successfully!</Text>
                        <Center >
                            <Button mt="md" onClick={handleModalClose}>Ok</Button>
                        </Center>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root> */}
        </Layout>
    );
}
export const getServerSideProps = async ({ params }) => {
    //const { id } = params;
    const staffService = new StaffService();
    const staff = await staffService.getStaffById(1);
    return { props: { staff } };
};