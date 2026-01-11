# Database Migration: Numeric Timestamps to ISO Dates

## Overview

This migration converts all numeric timestamps (seconds since epoch) in the database to ISO date strings (e.g., "2024-01-15T00:00:00.000Z") to ensure compatibility with Prisma 7.

## Quick Start

```bash
# 1. Backup database
cd backend
cp prisma/TCon360.db prisma/TCon360.db.backup

# 2. Run migration
sqlite3 prisma/TCon360.db < prisma/migrate-dates.sql

# 3. Verify migration
sqlite3 prisma/TCon360.db <<EOF
SELECT 'CalendarMaster' as table_name, typeof(CalendarDate) as type, COUNT(*) as count
FROM CalendarMaster GROUP BY typeof(CalendarDate);
EOF

# 4. Recreate views
npm run seed
```

## Detailed Steps

### Step 1: Backup Database (IMPORTANT!)

Always backup before running migration:

```bash
cd backend
cp prisma/TCon360.db prisma/TCon360.db.backup
```

Verify backup was created:

```bash
ls -lh prisma/TCon360.db.backup
```

### Step 2: Run Migration Script

The migration script (`migrate-dates.sql`) converts all date columns from numeric timestamps to ISO format.

```bash
cd backend
sqlite3 prisma/TCon360.db < prisma/migrate-dates.sql
```

This will:
- Convert `CalendarMaster.CalendarDate`
- Convert `PublicHoliday.StartDate` and `EndDate`
- Convert `LeaveRequest.leavePeriodStart`, `leavePeriodEnd`, `dateOfReturn`, `staffSignDate`
- Convert `CalendarVacation.VacationDate`
- Convert `StaffContract.ContractStartDate`, `ContractEndDate`
- Convert `Account.accessTokenExpires`
- Convert `Session.expires`
- Convert `VerificationRequest.expires`
- Run verification queries to check conversion success

### Step 3: Verify Migration

Run these queries to verify all dates are in ISO format:

```bash
sqlite3 prisma/TCon360.db <<EOF
-- Check CalendarMaster
SELECT 'CalendarMaster' as table_name, typeof(CalendarDate) as type, COUNT(*) as count
FROM CalendarMaster GROUP BY typeof(CalendarDate);

-- Check LeaveRequest
SELECT 'LeaveRequest' as table_name, typeof(leavePeriodStart) as type, COUNT(*) as count
FROM LeaveRequest GROUP BY typeof(leavePeriodStart);

-- Check CalendarVacation
SELECT 'CalendarVacation' as table_name, typeof(VacationDate) as type, COUNT(*) as count
FROM CalendarVacation GROUP BY typeof(VacationDate);

-- Check PublicHoliday
SELECT 'PublicHoliday' as table_name, typeof(StartDate) as type, COUNT(*) as count
FROM PublicHoliday GROUP BY typeof(StartDate);

-- Check StaffContract
SELECT 'StaffContract' as table_name, typeof(ContractStartDate) as type, COUNT(*) as count
FROM StaffContract GROUP BY typeof(ContractStartDate);
EOF
```

**Expected Result**: All `type` columns should show `text`, not `integer`.

### Step 4: Recreate SQL Views

After migration, recreate the views with dual-format support:

```bash
cd backend
npm run seed
```

This will recreate:
- `viewCalendarTimeSheet` - with dual-format date support
- `viewEvents` - with dual-format date support
- Other views as defined in `seed.mjs`

### Step 5: Test the Application

1. Start the backend: `npm run start:dev` (or your usual command)
2. Start the frontend: `npm run dev` (in frontend directory)
3. Navigate to the calendar page
4. Create a new leave request
5. Verify it appears on the calendar
6. Check console for errors

## Rollback Procedure

If you need to rollback:

```bash
cd backend
cp prisma/TCon360.db.backup prisma/TCon360.db
npm run seed
```

This restores the backup and recreates views.

## Troubleshooting

### Issue: Migration fails with errors

**Possible causes**:
- Database file not found
- Incorrect permissions
- Corrupt database

**Solutions**:
```bash
# Check if database exists
ls -lh prisma/TCon360.db

# Check permissions
chmod 644 prisma/TCon360.db

# If corrupt, restore from backup
cp prisma/TCon360.db.backup prisma/TCon360.db
```

### Issue: Verification shows 'integer' type

**Cause**: Migration script didn't complete successfully

**Solution**:
```bash
# Check migration script output
sqlite3 prisma/TCon360.db < prisma/migrate-dates.sql 2>&1 | tee migration.log

# Review migration.log for errors
```

### Issue: Views still show NULL for dates

**Cause**: Views not recreated after migration

**Solution**:
```bash
cd backend
npm run seed
```

### Issue: Calendar shows no events after migration

**Possible causes**:
1. Views not recreated
2. Date format mismatch
3. Migration incomplete

**Debugging steps**:
```bash
# 1. Check views exist
sqlite3 prisma/TCon360.db ".schema viewCalendarTimeSheet"
sqlite3 prisma/TCon360.db ".schema viewEvents"

# 2. Check view data
sqlite3 prisma/TCon360.db "SELECT COUNT(*) FROM viewCalendarTimeSheet;"
sqlite3 prisma/TCon360.db "SELECT COUNT(*) FROM viewEvents;"

# 3. Check calendar data
sqlite3 prisma/TCon360.db "SELECT COUNT(*) FROM CalendarMaster;"
sqlite3 prisma/TCon360.db "SELECT COUNT(*) FROM LeaveRequest;"
sqlite3 prisma/TCon360.db "SELECT COUNT(*) FROM CalendarVacation;"
```

## Verification Queries

### Check Date Formats Before Migration

```bash
sqlite3 prisma/TCon360.db <<EOF
-- Sample dates from each table
SELECT 'CalendarMaster' as table_name, CalendarDate, typeof(CalendarDate)
FROM CalendarMaster LIMIT 3;

SELECT 'LeaveRequest' as table_name, leavePeriodStart, typeof(leavePeriodStart)
FROM LeaveRequest LIMIT 3;

SELECT 'PublicHoliday' as table_name, StartDate, typeof(StartDate)
FROM PublicHoliday LIMIT 3;
EOF
```

### Check Date Formats After Migration

```bash
sqlite3 prisma/TCon360.db <<EOF
-- Sample dates from each table (should all be ISO strings)
SELECT 'CalendarMaster' as table_name, CalendarDate, typeof(CalendarDate)
FROM CalendarMaster LIMIT 3;

SELECT 'LeaveRequest' as table_name, leavePeriodStart, typeof(leavePeriodStart)
FROM LeaveRequest LIMIT 3;

SELECT 'PublicHoliday' as table_name, StartDate, typeof(StartDate)
FROM PublicHoliday LIMIT 3;
EOF
```

### Check View Performance

```bash
sqlite3 prisma/TCon360.db <<EOF
EXPLAIN QUERY PLAN
SELECT * FROM viewCalendarTimeSheet WHERE Year = 2024 AND Month = 1;
EOF
```

## Additional Notes

- **SQLite Version**: This migration requires SQLite 3.26+ for CASE statement support
- **Transaction Safety**: The migration script runs each UPDATE as a separate transaction for safety
- **Performance**: Migration time depends on database size (typically < 1 second for < 100K records)
- **Reversibility**: Full rollback procedure is documented above
- **Testing**: Always test on a development database first

## Support

For detailed information:
- See `MIGRATION_GUIDE.md` in project root
- See `IMPLEMENTATION_SUMMARY.md` for technical details
- Check application logs for errors after migration
