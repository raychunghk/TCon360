SELECT
  ROW_NUMBER() OVER (
    ORDER BY
      C.CalendarDate
  ) AS ID,
  C.CalendarDate AS leavePeriodStart,
  LR.leavePeriodEnd,
  CASE
    WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN STRFTIME(
      '%Y-%m-%d %H:%M:%S',
      DATETIME(C.CalendarDate / 1000.0, 'unixepoch')
    )
    ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(C.CalendarDate))
  END AS StartDateStr,
  C.WeekDayName,
  C.Year,
  C.Month,
  CASE
    WHEN C.WeekDayName LIKE 'S%' THEN C.WeekDayName
    WHEN PH.Summary IS NOT NULL THEN PH.Summary
    WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
    ELSE NULL
  END AS HolidaySummary,
  CASE
    WHEN C.WeekDayName LIKE 'S%' THEN 'weekend'
    WHEN PH.Summary IS NOT NULL THEN 'publicholiday'
    WHEN LR.id IS NOT NULL THEN COALESCE(LR.leaveType, 'vacation')
    ELSE NULL
  END AS eventType,
  CASE
    WHEN LR.leavePeriodEnd IS NULL THEN NULL
    WHEN typeof(LR.leavePeriodEnd) IN ('integer', 'real') THEN STRFTIME(
      '%Y-%m-%d %H:%M:%S',
      DATETIME(LR.leavePeriodEnd / 1000.0, 'unixepoch')
    )
    ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd))
  END AS EndDateStr,
  LR.dateOfReturn,
  CASE
    WHEN LR.dateOfReturn IS NULL THEN NULL
    WHEN typeof(LR.dateOfReturn) IN ('integer', 'real') THEN STRFTIME(
      '%Y-%m-%d %H:%M:%S',
      DATETIME(LR.dateOfReturn / 1000.0, 'unixepoch')
    )
    ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.dateOfReturn))
  END AS ReturnDateStr,
  LR.AMPMStart,
  LR.AMPMEnd,
  LR.staffId,
  LR.leaveType,
  LR.id AS LeaveRequestId,
  CASE
    WHEN LR.leaveDays IS NOT NULL THEN LR.leaveDays
    WHEN C.WeekDayName LIKE 'S%' THEN 1
    WHEN PH.Summary IS NOT NULL THEN 1
    ELSE NULL
  END AS leaveDays,
  LR.contractId,
  COALESCE(LR.IsArchived, 0) AS IsArchived
FROM
  CalendarMaster AS C
  LEFT JOIN PublicHoliday AS PH ON (
    CASE
      WHEN typeof(PH.StartDate) IN ('integer', 'real') THEN date(PH.StartDate / 1000.0, 'unixepoch')
      ELSE date(PH.StartDate)
    END = CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN LeaveRequest AS LR ON (
    CASE
      WHEN typeof(LR.leavePeriodStart) IN ('integer', 'real') THEN date(LR.leavePeriodStart / 1000.0, 'unixepoch')
      ELSE date(LR.leavePeriodStart)
    END = CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
WHERE
  (
    C.WeekDayName LIKE 'S%'
    OR PH.Summary IS NOT NULL
    OR LR.id IS NOT NULL
  )
  AND (
    LR.IsArchived = 0
    OR LR.IsArchived IS NULL
  );

  