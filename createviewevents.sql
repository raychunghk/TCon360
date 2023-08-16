select ROW_NUMBER() OVER (
        ORDER BY C.CalendarDate
    ) AS ID,
    CalendarDate as leavePeriodStart,
    LR.leavePeriodEnd,
    STRFTIME(
        '%Y-%m-%d %H:%M:%S',
        DATETIME(CalendarDate / 1000, 'unixepoch')
    ) AS StartDateStr,
    WeekDayName,
    Year,
    Month,
    CASE
        WHEN WeekDayName LIKE 'S%' THEN WeekDayName
        WHEN PH.Summary IS NOT NULL THEN PH.Summary
        when LR.leavePurpose is not null then LR.leavePurpose
        ELSE null
    END AS HolidaySummary,
    STRFTIME(
        '%Y-%m-%d %H:%M:%S',
        DATETIME(LR.leavePeriodEnd / 1000, 'unixepoch')
    ) AS EndDateStr,
    LR.dateOfReturn,
    STRFTIME(
    '%Y-%m-%d %H:%M:%S',
    DATETIME(LR.dateOfReturn / 1000, 'unixepoch')
) AS ReturnDateStr,
    LR.AMPMStart,
    LR.AMPMEnd,
    LR.staffId,
    LR.leaveType
FROM CalendarMaster C
    LEFT JOIN PublicHoliday PH ON PH.STARTDATE = C.CalendarDate
    left join LeaveRequest LR on LR.leavePeriodStart = CalendarDate
where HolidaySummary is not null;
    