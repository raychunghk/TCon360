-- ============================================================================
-- Prisma 7 Date Format Migration Script
-- Converts all numeric timestamps (seconds since epoch) to ISO date strings
-- ============================================================================

-- Migration for CalendarMaster
UPDATE CalendarMaster
SET CalendarDate = datetime(CalendarDate / 1000, 'unixepoch')
WHERE typeof(CalendarDate) = 'integer';

-- Migration for PublicHoliday
UPDATE PublicHoliday
SET StartDate = datetime(StartDate / 1000, 'unixepoch'),
    EndDate = datetime(EndDate / 1000, 'unixepoch')
WHERE typeof(StartDate) = 'integer';

-- Migration for LeaveRequest
UPDATE LeaveRequest
SET leavePeriodStart = datetime(leavePeriodStart / 1000, 'unixepoch'),
    leavePeriodEnd = CASE 
      WHEN typeof(leavePeriodEnd) = 'integer' THEN datetime(leavePeriodEnd / 1000, 'unixepoch')
      ELSE leavePeriodEnd
    END,
    dateOfReturn = CASE 
      WHEN typeof(dateOfReturn) = 'integer' THEN datetime(dateOfReturn / 1000, 'unixepoch')
      ELSE dateOfReturn
    END,
    staffSignDate = CASE 
      WHEN typeof(staffSignDate) = 'integer' THEN datetime(staffSignDate / 1000, 'unixepoch')
      ELSE staffSignDate
    END
WHERE typeof(leavePeriodStart) = 'integer';

-- Migration for CalendarVacation
UPDATE CalendarVacation
SET VacationDate = datetime(VacationDate / 1000, 'unixepoch')
WHERE typeof(VacationDate) = 'integer';

-- Migration for StaffContract
UPDATE StaffContract
SET ContractStartDate = datetime(ContractStartDate / 1000, 'unixepoch'),
    ContractEndDate = datetime(ContractEndDate / 1000, 'unixepoch')
WHERE typeof(ContractStartDate) = 'integer';

-- Migration for Account (accessTokenExpires)
UPDATE Account
SET accessTokenExpires = datetime(accessTokenExpires / 1000, 'unixepoch')
WHERE typeof(accessTokenExpires) = 'integer' AND accessTokenExpires IS NOT NULL;

-- Migration for Session (expires)
UPDATE Session
SET expires = datetime(expires / 1000, 'unixepoch')
WHERE typeof(expires) = 'integer' AND expires IS NOT NULL;

-- Migration for VerificationRequest (expires)
UPDATE VerificationRequest
SET expires = datetime(expires / 1000, 'unixepoch')
WHERE typeof(expires) = 'integer' AND expires IS NOT NULL;

-- ============================================================================
-- Verification Queries (Check all conversions completed)
-- ============================================================================

SELECT 'CalendarMaster' as table_name, typeof(CalendarDate) as type, COUNT(*) as count
FROM CalendarMaster GROUP BY typeof(CalendarDate);

SELECT 'LeaveRequest' as table_name, typeof(leavePeriodStart) as type, COUNT(*) as count
FROM LeaveRequest GROUP BY typeof(leavePeriodStart);

SELECT 'CalendarVacation' as table_name, typeof(VacationDate) as type, COUNT(*) as count
FROM CalendarVacation GROUP BY typeof(VacationDate);

SELECT 'PublicHoliday' as table_name, typeof(StartDate) as type, COUNT(*) as count
FROM PublicHoliday GROUP BY typeof(StartDate);

SELECT 'StaffContract' as table_name, typeof(ContractStartDate) as type, COUNT(*) as count
FROM StaffContract GROUP BY typeof(ContractStartDate);
