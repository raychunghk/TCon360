-- Fix mixed numeric/ISO date values introduced by Prisma 7 SQLite DateTime serialization.
--
-- Background:
--   Legacy rows were stored as Unix epoch milliseconds (INTEGER/REAL).
--   Prisma 7 stores SQLite DateTime as ISO 8601 strings (TEXT).
--
-- This migration:
--   1) Converts legacy numeric millis -> ISO 8601 UTC strings for key tables.
--   2) Recreates views to work with BOTH numeric and ISO date formats (safe during transition).
--
-- Conversion format:
--   strftime('%Y-%m-%dT%H:%M:%fZ', millis/1000.0, 'unixepoch')
-- Example:
--   1764979200000 -> 2026-01-07T00:00:00.000Z

BEGIN;

-- LeaveRequest
UPDATE "LeaveRequest"
SET
  "leavePeriodStart" = CASE
    WHEN "leavePeriodStart" IS NOT NULL AND typeof("leavePeriodStart") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "leavePeriodStart" / 1000.0, 'unixepoch')
    ELSE "leavePeriodStart"
  END,
  "leavePeriodEnd" = CASE
    WHEN "leavePeriodEnd" IS NOT NULL AND typeof("leavePeriodEnd") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "leavePeriodEnd" / 1000.0, 'unixepoch')
    ELSE "leavePeriodEnd"
  END,
  "dateOfReturn" = CASE
    WHEN "dateOfReturn" IS NOT NULL AND typeof("dateOfReturn") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "dateOfReturn" / 1000.0, 'unixepoch')
    ELSE "dateOfReturn"
  END,
  "staffSignDate" = CASE
    WHEN "staffSignDate" IS NOT NULL AND typeof("staffSignDate") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "staffSignDate" / 1000.0, 'unixepoch')
    ELSE "staffSignDate"
  END;

-- CalendarVacation
UPDATE "CalendarVacation"
SET "VacationDate" = CASE
  WHEN "VacationDate" IS NOT NULL AND typeof("VacationDate") IN ('integer', 'real')
    THEN strftime('%Y-%m-%dT%H:%M:%fZ', "VacationDate" / 1000.0, 'unixepoch')
  ELSE "VacationDate"
END;

-- StaffContract
UPDATE "StaffContract"
SET
  "ContractStartDate" = CASE
    WHEN "ContractStartDate" IS NOT NULL AND typeof("ContractStartDate") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "ContractStartDate" / 1000.0, 'unixepoch')
    ELSE "ContractStartDate"
  END,
  "ContractEndDate" = CASE
    WHEN "ContractEndDate" IS NOT NULL AND typeof("ContractEndDate") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "ContractEndDate" / 1000.0, 'unixepoch')
    ELSE "ContractEndDate"
  END;

-- CalendarMaster (primary key)
UPDATE "CalendarMaster"
SET "CalendarDate" = CASE
  WHEN "CalendarDate" IS NOT NULL AND typeof("CalendarDate") IN ('integer', 'real')
    THEN strftime('%Y-%m-%dT%H:%M:%fZ', "CalendarDate" / 1000.0, 'unixepoch')
  ELSE "CalendarDate"
END;

-- PublicHoliday (StartDate is primary key)
UPDATE "PublicHoliday"
SET
  "StartDate" = CASE
    WHEN "StartDate" IS NOT NULL AND typeof("StartDate") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "StartDate" / 1000.0, 'unixepoch')
    ELSE "StartDate"
  END,
  "EndDate" = CASE
    WHEN "EndDate" IS NOT NULL AND typeof("EndDate") IN ('integer', 'real')
      THEN strftime('%Y-%m-%dT%H:%M:%fZ', "EndDate" / 1000.0, 'unixepoch')
    ELSE "EndDate"
  END;

-- Recreate views so joins and formatting work with BOTH legacy numeric and ISO strings.

DROP VIEW IF EXISTS "viewCalendarTimeSheet";
CREATE VIEW "viewCalendarTimeSheet" AS
  SELECT
    ROW_NUMBER() OVER (ORDER BY C.CalendarDate) AS ID,
    C.CalendarDate,
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END AS CalendarDateStr,
    C.WeekDayName,
    C.Year,
    C.Month,
    CASE
      WHEN C.WeekDayName LIKE 'S%' OR PH.Summary IS NOT NULL THEN 0
      WHEN V.ChargeableDay > 0 THEN V.ChargeableDay
      ELSE 0
    END AS VacationChargable,
    CASE
      WHEN C.WeekDayName LIKE 'S%' OR PH.Summary IS NOT NULL THEN 1
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
  FROM CalendarMaster C
  LEFT JOIN CalendarVacation V ON (
    CASE
      WHEN typeof(V.VacationDate) IN ('integer', 'real') THEN date(V.VacationDate / 1000.0, 'unixepoch')
      ELSE date(V.VacationDate)
    END
    =
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN PublicHoliday PH ON (
    CASE
      WHEN typeof(PH.StartDate) IN ('integer', 'real') THEN date(PH.StartDate / 1000.0, 'unixepoch')
      ELSE date(PH.StartDate)
    END
    =
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN LeaveRequest LR ON LR.id = V.LeaveRequestId
  WHERE (LR.IsArchived = 0 OR LR.IsArchived IS NULL);

DROP VIEW IF EXISTS "viewEvents";
CREATE VIEW "viewEvents" AS
  SELECT
    ROW_NUMBER() OVER (ORDER BY C.CalendarDate) AS ID,
    C.CalendarDate AS leavePeriodStart,
    LR.leavePeriodEnd,
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(C.CalendarDate / 1000.0, 'unixepoch'))
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
      WHEN typeof(LR.leavePeriodEnd) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd / 1000.0, 'unixepoch'))
      ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd))
    END AS EndDateStr,
    LR.dateOfReturn,
    CASE
      WHEN LR.dateOfReturn IS NULL THEN NULL
      WHEN typeof(LR.dateOfReturn) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.dateOfReturn / 1000.0, 'unixepoch'))
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
  FROM CalendarMaster C
  LEFT JOIN PublicHoliday PH ON (
    CASE
      WHEN typeof(PH.StartDate) IN ('integer', 'real') THEN date(PH.StartDate / 1000.0, 'unixepoch')
      ELSE date(PH.StartDate)
    END
    =
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  LEFT JOIN LeaveRequest LR ON (
    CASE
      WHEN typeof(LR.leavePeriodStart) IN ('integer', 'real') THEN date(LR.leavePeriodStart / 1000.0, 'unixepoch')
      ELSE date(LR.leavePeriodStart)
    END
    =
    CASE
      WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
      ELSE date(C.CalendarDate)
    END
  )
  WHERE (C.WeekDayName LIKE 'S%' OR PH.Summary IS NOT NULL OR LR.id IS NOT NULL)
    AND (LR.IsArchived = 0 OR LR.IsArchived IS NULL);

COMMIT;
