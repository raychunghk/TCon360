SELECT
  ROW_NUMBER() OVER (
    ORDER BY
      C.CalendarDate
  ) AS ID,
  C.CalendarDate AS CalendarDate,
  CASE
    WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
    ELSE date(C.CalendarDate)
  END AS CalendarDateStr,
  C.WeekDayName,
  C.Year,
  C.Month,
  CASE
    WHEN C.WeekDayName LIKE 'S%'
    OR PH.Summary IS NOT NULL THEN 0
    WHEN V.ChargeableDay > 0 THEN V.ChargeableDay
    ELSE 0
  END AS VacationChargable,
  CASE
    WHEN C.WeekDayName LIKE 'S%'
    OR PH.Summary IS NOT NULL THEN 1
    ELSE 0
  END AS PublicHolidayChargable,
  CASE
    WHEN C.WeekDayName LIKE 'S%' THEN C.WeekDayName
    WHEN PH.Summary IS NOT NULL THEN PH.Summary
    WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
    ELSE NULL
  END AS HolidaySummary,
  V.LeaveRequestId,
  LR.staffId,
  CASE
    WHEN LR.contractId IS NULL THEN 0
    ELSE LR.contractId
  END AS contractId
FROM
  CalendarMaster AS C
  LEFT JOIN CalendarVacation AS V ON (
    CASE
      WHEN typeof(V.VacationDate) IN ('integer', 'real') THEN date(V.VacationDate / 1000.0, 'unixepoch')
      ELSE date(V.VacationDate)
    END = CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN PublicHoliday AS PH ON (
    CASE
      WHEN typeof(PH.StartDate) IN ('integer', 'real') THEN date(PH.StartDate / 1000.0, 'unixepoch')
      ELSE date(PH.StartDate)
    END = CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN LeaveRequest AS LR ON LR.id = V.LeaveRequestId
WHERE
  (
    LR.IsArchived = 0
    OR LR.IsArchived IS NULL
  );