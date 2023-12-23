-- SQLite
--select * from CalendarVacation;

--select * from LeaveRequest;
 SELECT
        ROW_NUMBER() OVER (ORDER BY C.CalendarDate) AS ID,
        CalendarDate AS leavePeriodStart,
        LR.leavePeriodEnd,
        STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(CalendarDate / 1000, 'unixepoch')) AS StartDateStr,
        WeekDayName,
        Year,
        Month,
        CASE
          WHEN WeekDayName LIKE 'S%' THEN WeekDayName
          WHEN PH.Summary IS NOT NULL THEN PH.Summary
          WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
          ELSE NULL
        END AS HolidaySummary,
        CASE
          WHEN WeekDayName LIKE 'S%' THEN 'weekend'
          WHEN PH.Summary IS NOT NULL THEN 'publicholiday'
          WHEN LR.id IS NOT NULL THEN COALESCE(LR.leaveType, 'vacation')
          ELSE NULL
        END AS eventType,
        STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd / 1000, 'unixepoch')) AS EndDateStr,
        LR.dateOfReturn,
        STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.dateOfReturn / 1000, 'unixepoch')) AS ReturnDateStr,
        LR.AMPMStart,
        LR.AMPMEnd,
        LR.staffId,
        LR.leaveType,
        LR.id AS LeaveRequestId,
        CASE
          WHEN LR.leaveDays IS NOT NULL THEN LR.leaveDays
          WHEN WeekDayName LIKE 'S%' THEN 1
          WHEN PH.Summary IS NOT NULL THEN 1
          ELSE NULL
        END AS leaveDays,
        LR.contractId 
      FROM
        CalendarMaster C
      LEFT JOIN
        PublicHoliday PH ON PH.STARTDATE = C.CalendarDate
      LEFT JOIN
        LeaveRequest LR ON LR.leavePeriodStart = CalendarDate
      WHERE
      1=1 --and  HolidaySummary IS NOT NULL
and Year = 2023 and Month = 12
;
select * from viewCalendarTimeSheet where year =2023 and Month = 12;
select strftime(
    '%Y-%m-%d %H: %M: %S',
    datetime(leavePeriodStart / 1000, 'unixepoch')
) AS formatted_date
,datetime(
    leavePeriodStart / 1000,
    'unixepoch',
    'localtime',
    'start of day'
)
, * from LeaveRequest;

 