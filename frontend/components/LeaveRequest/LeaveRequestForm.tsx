
// @ts-check
'use client';
import { Button, Card, Flex, Grid, LoadingOverlay, Select, Text, TextInput, useMantineTheme } from '@mantine/core';
import { DatePickerInput, DayOfWeek } from '@mantine/dates';
import { IconCalendarPlus, IconCalendarUp, IconCalendarX, IconFileSpreadsheet } from '@tabler/icons-react';
import { format } from 'date-fns';
import { Session } from 'next-auth';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { getMySession } from '@/app/lib/auth-action';
import MyCard from '@/components/MyCard';
import MyModal from '@/components/MyModal';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import {
    adjustTimeZoneVal,
    ampmOptions,
    ampmOptionsEnd,
    ampmOptionsEndNoDate,
    excludeHoliday,
    formatResponseDate,
    getBusinessDays,
    getNextWorkingDate,
    leaveRequestValidationSchema,
    leaveTypes,
    myRenderDay,
} from '@/components/util/leaverequest.util';
import { leaveRequestService } from '@/services/leaveRequestService';
import { useShallow } from 'zustand/react/shallow';
import { LeaveRequestStaffInfo, Staff } from './leaveRequestStaffInfo';

// Type Definitions

interface LeaveRequestPeriod {
    title?: string | null;
    start?: Date | null;
    end?: Date | null;
}
interface Contract {
    id: number;
}
interface PublicHoliday {
    StartDate: string;
}
interface LeaveRequest {
    id?: number;
    title: string | null;
    leavePeriodStart: Date | null;
    leavePeriodEnd: Date | null;
    AMPMStart: string;
    AMPMEnd: string;
    leaveDays: number;
    dateOfReturn: Date | null;
    staffSignDate: Date | null;
    staffId: number | null;
    fileId: number | null;
    error: Record<string, string> | null;
    helper: Record<string, string> | null;
    leaveType: string;
    leavePurpose: string;
}
interface Errors {
    [key: string]: string | undefined;
}
interface LeaveRequestFormProps {
    formType: FormType;
    leaveRequestId?: number;
    onDeleteEvent: (id: number, date: Date) => Promise<void>;
    onClose?: () => void;
    LeaveRequestPeriod?: LeaveRequestPeriod;
    leavePurpose?: string | null;
    CalendarDate: Date | null;
    isCalendarIntegrated?: boolean;
}
export type FormType = 'create' | 'edit';
export default function LeaveRequestForm({
    formType,
    leaveRequestId,
    onDeleteEvent,
    onClose,
    LeaveRequestPeriod,
    leavePurpose,
    CalendarDate,
    isCalendarIntegrated = false,
}: LeaveRequestFormProps) {
    const title = formType === 'create' ? 'Create Leave Request' : 'Edit Leave Request';
    const theme = useMantineTheme();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showAsError, setShowAsError] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string>('');
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    const { reset, handleSubmit }: UseFormReturn<LeaveRequest> = useForm();

    const [
        publicHolidays,
        activeUser,
        activeStaff,
        activeContract,
        basepath,
        timesheetDefaultDate,
        setTimesheetDefaultDate,
        setIsMonthPickerChangeEvent,
        selectedMonth,
        setSelectedMonth,
    ] = useStore(
        useShallow((state: any) => [
            state.publicHolidays as PublicHoliday[],
            state.activeUser as any,
            state.activeStaff as Staff | null,
            state.activeContract as Contract | null,
            state.basepath as string,
            state.timesheetDefaultDate as Date,
            state.setTimesheetDefaultDate as (date: Date) => Promise<void>,
            state.setIsMonthPickerChangeEvent as (value: boolean) => void,
            state.selectedMonth as Date,
            state.setSelectedMonth as (date: Date) => void,
        ])
    );
    const [isEventUpdated, setIsEventUpdated] = useUIStore(
        useShallow((state: any) => [state.isEventUpdated as boolean, state.setIsEventUpdated as (value: boolean) => void])
    );

    const initialLeaveRequest: LeaveRequest = {
        title: LeaveRequestPeriod?.title ?? null,
        leavePeriodStart: LeaveRequestPeriod?.start ?? null,
        leavePeriodEnd: LeaveRequestPeriod?.end ?? null,
        AMPMStart: 'AMPM',
        AMPMEnd: '',
        leaveDays: 0,
        dateOfReturn: null,
        staffSignDate: new Date(),
        staffId: null,
        fileId: null,
        error: null,
        helper: null,
        leaveType: 'vacation',
        leavePurpose: leavePurpose || 'Vacation',
    };
    const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>(initialLeaveRequest);

    const handleModalClose = () => {
        setModalOpen(false);
        setShowAsError(false);
        if (onClose) {
            onClose();
        }
    };

    const cookies = parseCookies();
    const tokenCookie = cookies.token;

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const session: Session | null = await getMySession();
                if (!leaveRequest) {
                    return;
                }
                if (activeStaff?.id !== session?.user?.staff?.id) {
                    setLeaveRequest({ ...leaveRequest, staffId: session?.user?.staff?.id ?? null });
                }
            } catch (error) {
                setModalMsg('Error fetching session');
                setShowAsError(true);
                setModalOpen(true);
            }
        };

        if (!activeStaff?.id) {
            fetchSessionData();
        }
    }, [activeStaff]);

    useEffect(() => {
        if (basepath && formType === 'edit' && leaveRequestId) {
            const getLeaveRequestData = async () => {
                setIsFetchingData(true);
                try {
                    const response = await leaveRequestService.getLeaveRequest(leaveRequestId, tokenCookie, basepath);
                    if (response.status === 200) {
                        const { leavePeriodStart, leavePeriodEnd, dateOfReturn, staffSignDate, ...rest } = response.data;
                        setLeaveRequest({
                            ...rest,
                            title: rest.title ?? null, staffId: rest.staffId ?? null, fileId: rest.fileId ?? null,
                            error: rest.error ?? null, helper: rest.helper ?? null,
                            leavePeriodStart: leavePeriodStart ? new Date(leavePeriodStart) : null,
                            leavePeriodEnd: leavePeriodEnd ? new Date(leavePeriodEnd) : null,
                            dateOfReturn: dateOfReturn ? new Date(dateOfReturn) : null,
                            staffSignDate: staffSignDate ? new Date(staffSignDate) : null,
                        });
                    }
                } catch (error) {
                    setModalMsg('Failed to fetch leave request data');
                    setShowAsError(true);
                    setModalOpen(true);
                } finally {
                    setIsFetchingData(false);
                }
            };
            getLeaveRequestData();
        }
    }, [formType, leaveRequestId, basepath, tokenCookie]);

    useEffect(() => {
        const handleFormValueChange = async () => {
            const { leavePeriodStart, leavePeriodEnd, AMPMStart, AMPMEnd } = leaveRequest;
            if (!leavePeriodStart) {
                setLeaveRequest((prev) => ({
                    ...prev,
                    leavePeriodEnd: null,
                    leaveDays: 0,
                    dateOfReturn: null,
                    AMPMEnd: '',
                }));
                return;
            }

            const startDate = new Date(leavePeriodStart);
            const endDate = leavePeriodEnd ? new Date(leavePeriodEnd) : null;
            let leaveDays = 0;
            let returnDate: Date | null = null;
            let ampmEnd = AMPMEnd || 'NA';
            let ampmStart = AMPMStart;

            if (publicHolidays.some((h) => h.StartDate === startDate.toISOString().split('T')[0])) {
                setErrors({ leavePeriodStart: 'Start date cannot be a holiday' });
                return;
            }

            if (endDate) {
                if (!AMPMEnd || AMPMEnd === 'NA') ampmEnd = 'AMPM';
                if (AMPMStart === 'AM') ampmStart = 'AMPM';
                const startIsAM = ampmStart === 'AM' || ampmStart === 'AMPM';
                const startIsPM = ampmStart === 'PM';
                const endIsAM = ampmEnd === 'AM';
                const endIsPM = ampmEnd === 'AMPM';
                leaveDays = getBusinessDays(startDate, endDate);
                if (startIsAM && endIsAM) leaveDays -= 0.5;
                else if (startIsPM && endIsPM) leaveDays -= 0.5;
                else if (startIsPM && endIsAM) leaveDays -= 1;
                returnDate = endIsPM ? getNextWorkingDate(endDate) : endDate;
            } else {
                ampmEnd = 'NA';
                if (ampmStart === 'AMPM') {
                    leaveDays = 1;
                    returnDate = getNextWorkingDate(startDate);
                } else {
                    leaveDays = 0.5;
                    returnDate = ampmStart === 'AM' ? startDate : getNextWorkingDate(startDate);
                }
            }

            setLeaveRequest((prev) => ({
                ...prev,
                AMPMEnd: ampmEnd,
                AMPMStart: ampmStart,
                leaveDays,
                dateOfReturn: returnDate,
            }));
        };

        if (leaveRequest.leavePeriodStart) handleFormValueChange();
    }, [leaveRequest.leavePeriodStart, leaveRequest.leavePeriodEnd, leaveRequest.AMPMStart, leaveRequest.AMPMEnd]);

    const deleteOnClick = async () => {
        if (!leaveRequest.id) {
            setModalMsg('No leave request ID provided');
            setModalOpen(true);
            return;
        }
        setSubmitting(true);
        try {
            const response = await leaveRequestService.deleteLeaveRequest(leaveRequest.id, tokenCookie, basepath);
            if ([200, 201].includes(response.status)) {
                if (isCalendarIntegrated) {
                    setSelectedMonth(CalendarDate as Date);
                    await setTimesheetDefaultDate(CalendarDate as Date);
                }
                await onDeleteEvent(leaveRequest.id, timesheetDefaultDate);
                setModalMsg('Leave Record Deleted Successfully');
                setModalOpen(true);
                reset();
            }
        } catch (error) {
            setModalMsg('Failed to delete leave request');
            setModalOpen(true);
        }
        setSubmitting(false);
    };

    const normalizeDate = (date: Date | null): Date | null => {
        if (!date) return null;
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const handleFormSubmit = async (formTypeOverride?: FormType) => {
        setSubmitting(true);
        const effectiveFormType = formTypeOverride || formType;
        if (!activeContract?.id) {
            setModalMsg('Contract ID is required');
            setShowAsError(true);
            setModalOpen(true);
            setSubmitting(false);
            return;
        }

        const convertToDate = (value: Date | string | null | undefined): Date | null => {
            if (!value) return null;
            if (typeof value === 'string') {
                const parsed = new Date(value);
                return isNaN(parsed.getTime()) ? null : parsed;
            }
            return value;
        };

        const baseData = {
            leavePeriodStart: effectiveFormType === 'create'
                ? convertToDate(adjustTimeZoneVal(leaveRequest.leavePeriodStart))
                : normalizeDate(leaveRequest.leavePeriodStart),
            leavePeriodEnd: effectiveFormType === 'create'
                ? convertToDate(adjustTimeZoneVal(leaveRequest.leavePeriodEnd))
                : normalizeDate(leaveRequest.leavePeriodEnd),
            AMPMEnd: leaveRequest.AMPMEnd,
            AMPMStart: leaveRequest.AMPMStart,
            leaveDays: leaveRequest.leaveDays,
            dateOfReturn: effectiveFormType === 'create'
                ? convertToDate(adjustTimeZoneVal(leaveRequest.dateOfReturn))
                : normalizeDate(leaveRequest.dateOfReturn),
            staffSignDate: effectiveFormType === 'create'
                ? convertToDate(adjustTimeZoneVal(leaveRequest.staffSignDate))
                : normalizeDate(leaveRequest.staffSignDate) || new Date(),
            leavePurpose: leaveRequest.leavePurpose,
            leaveType: leaveRequest.leaveType,
            contractId: activeContract.id,
        };

        const newData = effectiveFormType === 'create'
            ? { ...baseData, staffId: leaveRequest.staffId ?? undefined }
            : baseData;

        setErrors({});
        try {
            await leaveRequestValidationSchema.validate(leaveRequest, { abortEarly: false });
            let response;
            if (effectiveFormType === 'create') {
                response = await leaveRequestService.createLeaveRequest(newData, tokenCookie, basepath);
            } else {
                if (!leaveRequest.id) {
                    throw new Error('No leave request ID provided for update');
                }
                newData.leavePeriodStart = normalizeDate(newData.leavePeriodStart);
                response = await leaveRequestService.updateLeaveRequest(leaveRequest.id, newData, tokenCookie, basepath);
            }

            if ([200, 201].includes(response.status)) {
                if (response.data.error) {
                    setShowAsError(true);
                    setModalMsg(response.data.error);
                    setModalOpen(true);
                } else {
                    if (isCalendarIntegrated) {
                        setSelectedMonth(CalendarDate as Date);
                        await setTimesheetDefaultDate(CalendarDate as Date);
                    }
                    setModalMsg(`Leave Record ${effectiveFormType === 'create' ? 'Created' : 'Updated'} Successfully`);
                    setModalOpen(true);
                    reset();

                    const _data = formatResponseDate(response.data);
                    setLeaveRequest({ ..._data });
                    setErrors({});
                    setIsEventUpdated(true);
                }
            }
        } catch (err: any) {
            if (err.name === 'ValidationError') {
                const newErrors: Errors = {};
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            } else if (err.response && err.response.status === 401) {
                setModalMsg('Session timeout, you are not authorized, please login again');
                setModalOpen(true);
            } else if (err.response) {
                const errorData = err.response.data;
                const newErrors: Errors = {};
                Object.keys(errorData).forEach((key) => {
                    newErrors[key] = errorData[key].join(', ');
                });
                setErrors(newErrors);
            } else {
                setModalMsg('Failed to process leave request');
                setModalOpen(true);
            }
        }
        setSubmitting(false);
    };

    const disabledDates = {
        daysOfWeek: [0, 6],
    };
    const btnSize = 18;

    const handleLeaveStartSelect = (date: Date | null, stateobj: LeaveRequest) => {
        if (!stateobj.leavePeriodEnd) {
            stateobj.dateOfReturn = date;
        }
        handleDateInputSelect(date, stateobj);
    };

    const handleDateInputSelect = (date: Date | null, stateobj: LeaveRequest) => {
        if (!excludeHoliday(date)) {
            setLeaveRequest(stateobj);
        }
    };

    const getTextinputProps = (fieldName: string) => ({
        name: fieldName,
        id: fieldName,
        error: errors[fieldName],
        disabled: isFetchingData || submitting,
    });

    const getDatePickerProps = (fieldName: keyof LeaveRequest) => ({
        valueFormat: 'DD-MM-YYYY',
        firstDayOfWeek: 0 as DayOfWeek,
        excludeDate: excludeHoliday as (date: Date) => boolean,
        renderDay: myRenderDay as (date: Date) => React.ReactElement,
        name: fieldName,
        error: errors[fieldName],
        value: leaveRequest[fieldName] as Date | null,
    });

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <form method="post" onSubmit={handleSubmit(() => handleFormSubmit(formType))}>
                <MyCard title={title}>
                    <LoadingOverlay visible={isFetchingData || submitting} />
                    <Grid gutter={theme.spacing.md} py={20}>
                        <Grid.Col span={12}>
                            <LeaveRequestStaffInfo staff={activeStaff} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            {leaveRequest.leavePeriodStart &&
                                leaveRequest.AMPMStart &&
                                leaveRequest.leavePeriodEnd &&
                                leaveRequest.AMPMEnd && (
                                    <p>
                                        <Text fw={500}>Leave Period:</Text>
                                        {`${format(leaveRequest.leavePeriodStart, 'dd-MMM-yyyy')} ${leaveRequest.AMPMStart === 'AMPM' ? '' : leaveRequest.AMPMStart
                                            } to ${format(leaveRequest.leavePeriodEnd, 'dd-MMM-yyyy')} ${leaveRequest.AMPMEnd === 'AMPM' ? '' : leaveRequest.AMPMEnd
                                            } `}
                                    </p>
                                )}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                {...getTextinputProps('leavePurpose')}
                                label="Leave purpose"
                                value={leaveRequest.leavePurpose}
                                aria-label="Enter the purpose of the leave"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setErrors((prev) => ({ ...prev, leavePurpose: undefined }));
                                    setLeaveRequest({ ...leaveRequest, leavePurpose: event.target.value });
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                {...getTextinputProps('leaveType')}
                                label="Leave Type"
                                data={leaveTypes}
                                defaultValue="vacation"
                                value={leaveRequest.leaveType}
                                onChange={(value: string | null) => {
                                    setErrors((prev) => ({ ...prev, leaveType: undefined }));
                                    setLeaveRequest({
                                        ...leaveRequest,
                                        leaveType: value || 'vacation',
                                    });
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                clearable
                                label="Leave period start"
                                required
                                onChange={(date: Date | null) => {
                                    setErrors((prev) => ({ ...prev, leavePeriodStart: undefined }));
                                    handleLeaveStartSelect(date, {
                                        ...leaveRequest,
                                        leavePeriodStart: date,
                                    });
                                }}
                                disabled={isFetchingData || submitting} // Disabled during fetching or submitting
                                {...getDatePickerProps('leavePeriodStart')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                {...getTextinputProps('AMPMStart')}
                                label="Leave start: AM/PM/Whole day"
                                data={ampmOptions}
                                defaultValue="AMPM"
                                value={leaveRequest.AMPMStart}
                                onChange={(value: string | null) => {
                                    setErrors((prev) => ({ ...prev, AMPMStart: undefined }));
                                    setLeaveRequest({
                                        ...leaveRequest,
                                        AMPMStart: value || 'AMPM',
                                    });
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                label="Leave period end"
                                minDate={
                                    leaveRequest.leavePeriodStart
                                        ? new Date(new Date(leaveRequest.leavePeriodStart).getTime() + 24 * 60 * 60 * 1000)
                                        : undefined
                                }
                                onChange={(date: Date | null) => {
                                    setErrors((prev) => ({ ...prev, leavePeriodEnd: undefined }));
                                    handleDateInputSelect(date, {
                                        ...leaveRequest,
                                        leavePeriodEnd: date,
                                    });
                                }}
                                clearable
                                disabled={!leaveRequest.leavePeriodStart || isFetchingData || submitting} // Disabled until start date is set or during fetching/submitting
                                {...getDatePickerProps('leavePeriodEnd')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                {...getTextinputProps('AMPMEnd')}
                                label="Leave end: AM/PM/Whole day"
                                defaultValue="AMPM"
                                data={leaveRequest.leavePeriodEnd ? ampmOptionsEnd : ampmOptionsEndNoDate}
                                value={leaveRequest.AMPMEnd}
                                onChange={(value: string | null) => {
                                    setErrors((prev) => ({ ...prev, AMPMEnd: undefined }));
                                    setLeaveRequest({
                                        ...leaveRequest,
                                        AMPMEnd: value || 'AMPM',
                                        error: null,
                                        helper: null,
                                    });
                                }}
                                disabled={!leaveRequest.leavePeriodStart}
                                error={leaveRequest.error?.AMPMEnd}
                                description={leaveRequest.helper?.AMPMEnd}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                {...getTextinputProps('leaveDays')}
                                label="Leave Days"
                                value={leaveRequest.leaveDays}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                label="Staff sign date"
                                clearable
                                placeholder="Staff sign date"
                                onChange={(date: Date | null) => {
                                    setErrors((prev) => ({ ...prev, staffSignDate: undefined }));
                                    handleDateInputSelect(date, {
                                        ...leaveRequest,
                                        staffSignDate: date,
                                        error: null,
                                        helper: null,
                                    });
                                }}
                                defaultDate={new Date()}
                                disabled={!leaveRequest.leavePeriodStart || isFetchingData || submitting} // Disabled until start date is set or during fetching/submitting
                                defaultValue={new Date()}
                                {...getDatePickerProps('staffSignDate')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                clearable
                                label="Date of Return"
                                disabled={!leaveRequest.leavePeriodStart || isFetchingData || submitting} // Disabled until start date is set or during fetching/submitting
                                {...getDatePickerProps('dateOfReturn')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Flex mih={50} justify="center" align="flex-end" direction="row" wrap="wrap">
                                {leaveRequest.fileId && (
                                    <Button
                                        component="a"
                                        target="_blank"
                                        leftSection={<IconFileSpreadsheet />}
                                        href={`${basepath}/api/staff/download/${leaveRequest.fileId}`}
                                    >
                                        Download Leave Form
                                    </Button>
                                )}
                            </Flex>
                        </Grid.Col>
                    </Grid>
                    <Card.Section
                        bg="indigo.2"
                        py="md"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'md',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
                            {formType === 'create' && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    loading={submitting}
                                    leftSection={<IconCalendarPlus size={18} />}
                                    maw={{ base: '100%', sm: 250 }}
                                    radius="md"
                                    size="md"
                                >
                                    Create Leave Request
                                </Button>
                            )}
                            {formType === 'edit' && (
                                <>
                                    <Button
                                        type="submit"
                                        loading={submitting}
                                        maw={250}
                                        radius="md"
                                        leftSection={<IconCalendarUp />}
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            handleSubmit(() => handleFormSubmit('edit'))();
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        loading={submitting}
                                        maw={250}
                                        radius="md"
                                        onClick={deleteOnClick}
                                        variant="gradient"
                                        gradient={{ from: 'orange', to: 'red' }}
                                        leftSection={<IconCalendarX />}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </Flex>
                    </Card.Section>
                </MyCard>
            </form>
            <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} isError={showAsError} />
        </>
    );
}
