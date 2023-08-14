SELECT
  CalendarDate,
  STRFTIME(
    '%Y-%m-%d %H:%M:%S',
    DATETIME(CalendarDate / 1000, 'unixepoch')
  ) AS CalendarDateStr,
  WeekDayName,
  Year,
  MONTH,
  CASE
    WHEN V.ChargeableDay > 0 THEN ChargeableDay
    ELSE 0
  END AS VacationChargable,
  CASE
    WHEN WeekDayName LIKE 'S%'
    OR PH.Summary IS NOT NULL THEN 1
    ELSE 0
  END AS PublicHolidayChargable,
  CASE
    WHEN WeekDayName LIKE 'S%' THEN WeekDayName
    WHEN PH.Summary IS NOT NULL THEN PH.Summary
    ELSE NULL
  END AS HolidaySummary,
  LeaveRequestId
FROM
  CalendarMaster AS C
  LEFT JOIN CalendarVacation AS V ON V.VacationDate = C.CalendarDate
  LEFT JOIN PublicHoliday AS PH ON PH.STARTDATE = C.CalendarDate;