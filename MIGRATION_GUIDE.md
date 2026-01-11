# Prisma 7 Date Format Migration Guide

## Overview

This guide walks you through migrating your database from numeric timestamps to ISO date strings after upgrading to Prisma 7.

## Problem

After upgrading to Prisma 7, the database has mixed date formats:
- **Old data**: Numeric timestamps (e.g., 1704067200)
- **New data**: ISO strings (e.g., 2026-01-07T00:00:00.000Z)

This causes SQL views to fail when joining tables, breaking the calendar display.

## Solution Summary

The fix consists of three parts:

1. **Database Migration**: Convert all numeric timestamps to ISO format
2. **Backend Updates**: Add dual-format support in SQL views and global date serialization
3. **Frontend Updates**: Add safe date handling utilities

---

## Part 1: Database Migration

### Step 1: Backup Your Database

```bash
cp backend/prisma/dev.db backend/prisma/dev.db.backup
```

### Step 2: Run Migration Script

```bash
cd backend
sqlite3 prisma/dev.db < prisma/migrate-dates.sql
```

### Step 3: Verify Migration

```bash
sqlite3 prisma/dev.db <<EOF
SELECT 'CalendarMaster' as table_name, typeof(CalendarDate) as type, COUNT(*) as count
FROM CalendarMaster GROUP BY typeof(CalendarDate);

SELECT 'LeaveRequest' as table_name, typeof(leavePeriodStart) as type, COUNT(*) as count
FROM LeaveRequest GROUP BY typeof(leavePeriodStart);

SELECT 'CalendarVacation' as table_name, typeof(VacationDate) as type, COUNT(*) as count
FROM CalendarVacation GROUP BY typeof(VacationDate);

SELECT 'PublicHoliday' as table_name, typeof(StartDate) as type, COUNT(*) as count
FROM PublicHoliday GROUP BY typeof(StartDate);
EOF
```

**Expected Result**: All `type` columns should show `text`, not `integer`

### Step 4: Recreate SQL Views

```bash
cd backend
npm run seed
```

---

## Part 2: Backend Changes (Already Applied)

The following backend changes have already been implemented:

### 2.1 SQL Views with Dual-Format Support

- **File**: `backend/prisma/seed.mjs`
- **Changes**: Updated `createViewCalendarIfNotExists()` and `createViewEventsIfNotExists()` to handle both ISO strings and numeric timestamps using CASE statements.

### 2.2 Global Date Serializer

- **File**: `backend/src/common/date-serializer.interceptor.ts` (new file)
- **Purpose**: Automatically serializes all Date objects to ISO strings in API responses

### 2.3 Main.ts Interceptor Registration

- **File**: `backend/src/main.ts`
- **Changes**: Registered `DateSerializerInterceptor` globally

### 2.4 Timesheet Service Updates

- **File**: `backend/src/timesheet/timesheet.service.ts`
- **Changes**: Updated `getCalendar()` raw SQL query with dual-format date handling

---

## Part 3: Frontend Changes (Already Applied)

### 3.1 Date Helper Utility

- **File**: `frontend/components/util/dateHelper.ts` (new file)
- **Exports**:
  - `toDate()`: Safely converts strings, numbers, or Date objects to Date
  - `compareDate()`: Safe date comparison
  - `isValidDate()`: Date validation

### 3.2 FrontPageCalendar Updates

- **File**: `frontend/components/Calendar/FrontPageCalendar.tsx`
- **Changes**: Updated `setVacationSummary()` to use `toDate()` helper for safe date conversion

---

## Testing Checklist

### 1. Database Verification

```sql
-- Check all date columns are ISO format
SELECT typeof(CalendarDate) FROM CalendarMaster LIMIT 5;
SELECT typeof(StartDate) FROM PublicHoliday LIMIT 5;
SELECT typeof(leavePeriodStart) FROM LeaveRequest LIMIT 5;
```

### 2. Create New Leave Request

1. Navigate to the calendar
2. Click to select date range
3. Fill in leave request form
4. Submit
5. **Verify**: Leave request appears immediately on calendar

### 3. Check Calendar Operations

1. Navigate between months
2. Click existing leave request events
3. **Verify**: Vacation summary displays correctly
4. **Verify**: Chargeable days calculation is accurate

### 4. API Response Check

```bash
# Get calendar events (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
     http://localhost:3001/api/timesheet/calendar/ | jq '.'
```

**Verify**: All dates are ISO strings (e.g., "2024-01-15T00:00:00.000Z")

### 5. Edge Cases

- [ ] Multi-day leave requests
- [ ] Overlapping with public holidays
- [ ] Half-day (AM/PM) leave requests
- [ ] Leave requests at contract boundaries
- [ ] Console shows no date-related errors or NaN values

---

## Troubleshooting

### Issue: Views still showing NULL for dates

**Cause**: Views not recreated after migration
**Fix**: Run `npm run seed` in backend directory

### Issue: Calendar shows no events

**Cause**: Date format mismatch in JOINs
**Fix**:
1. Verify migration completed successfully
2. Recreate views with `npm run seed`
3. Check browser console for errors

### Issue: Invalid date errors in console

**Cause**: Frontend receiving unexpected date format
**Fix**: Ensure backend date serializer is registered in `main.ts`

### Issue: Vacation balance calculation incorrect

**Cause**: Date comparison using wrong format
**Fix**: Verify `setVacationSummary()` is using `toDate()` helper

---

## Rollback Procedure

If you need to rollback to pre-migration state:

```bash
cd backend

# Stop application
# Restore backup
cp prisma/dev.db.backup prisma/dev.db

# Revert code changes (git reset to commit before migration)
git checkout <commit-hash>

# Restart application
```

---

## Acceptance Criteria

✅ Database: All date columns converted to ISO format
✅ Database: CalendarMaster, PublicHoliday, LeaveRequest, CalendarVacation use consistent date format
✅ Views: SQL views handle both old and new date formats (CASE statements)
✅ Views: JOINs work correctly after migration
✅ Backend: API returns properly serialized dates (ISO strings)
✅ Frontend: FrontPageCalendar handles dates safely with helpers
✅ Calendar: New leave requests appear immediately
✅ Calendar: Existing leave requests still display correctly
✅ Calendar: Date calculations (vacation balance, chargeable days) work correctly
✅ Console: No date-related errors or NaN values

---

## Additional Notes

- The migration is **safe and reversible** with proper backup
- Dual-format support in views provides **transition period safety**
- Frontend `toDate()` helper handles **any future format changes**
- Global date serializer ensures **consistent API responses**
- The solution is **database-agnostic** (works with PostgreSQL, MySQL, etc.)
