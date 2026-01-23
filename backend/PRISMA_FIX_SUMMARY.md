# Prisma Configuration Fix Summary

## Problem
After moving `prisma.config.js` from `/backend/prisma/` to `/backend/`, relative path resolution broke, causing:
- Prisma unable to find the database
- Incorrect database file being created in `/backend/TCon360.db` instead of `/backend/prisma/TCon360.db`
- "No such table: main.User" errors

## Solution Implemented

### 1. Moved Prisma Config to Backend Root
**File:** `/backend/prisma.config.ts` (created, old `/backend/prisma/prisma.config.ts` deleted)

Config now uses correct path relative to backend root:
```typescript
datasource: {
    url: process.env.DATABASE_URL || 'file:./prisma/TCon360.db',
},
```

### 2. Created Environment Configuration
**Files:**
- `/backend/.env` - Contains: `DATABASE_URL=file:./prisma/TCon360.db`
- `/backend/.env.example` - Template for other environments

### 3. Cleaned Up Incorrect Database
**Deleted:** `/backend/TCon360.db` (0-byte empty file incorrectly created)

### 4. Updated Documentation
**Created:** `/backend/PRISMA_SETUP.md` - Comprehensive documentation for:
- File locations
- Path resolution rules
- Running Prisma commands
- Troubleshooting

### 5. Minor Code Improvements
**Updated:** `/backend/src/prisma/prisma.service.ts`
- Updated comment to reflect new config location

**Updated:** `/backend/package.json`
- Minor whitespace cleanup in start:dev script

## Path Resolution Explained

### Before (Broken)
- Config in: `/backend/prisma/prisma.config.ts`
- Database path: `file:./TCon360.db`
- Resolution: `/backend/prisma/TCon360.db` ✅

### After Moving Config (Broken)
- Config in: `/backend/prisma.config.ts`
- Database path: `file:./TCon360.db`
- Resolution: `/backend/TCon360.db` ❌ (wrong location)

### Fixed (Correct)
- Config in: `/backend/prisma.config.ts`
- Database path: `file:./prisma/TCon360.db`
- Resolution: `/backend/prisma/TCon360.db` ✅

## Current State

### Files Changed
1. ✅ `/backend/prisma.config.ts` - Created (moved from prisma/ folder)
2. ✅ `/backend/.env` - Created
3. ✅ `/backend/.env.example` - Created
4. ✅ `/backend/PRISMA_SETUP.md` - Created
5. ✅ `/backend/PRISMA_FIX_SUMMARY.md` - Created

### Files Deleted
1. ✅ `/backend/prisma/prisma.config.ts` - Deleted (moved to root)
2. ✅ `/backend/TCon360.db` - Deleted (empty incorrect database)

### Files Updated (minor)
1. ✅ `/backend/src/prisma/prisma.service.ts` - Comment update
2. ✅ `/backend/package.json` - Whitespace cleanup

### Database Status
- ✅ Location: `/backend/prisma/TCon360.db` (536KB with all data)
- ✅ No database in `/backend/TCon360.db` (root)
- ✅ All tables present including views:
  - Account, Session, User, Role
  - Staff, StaffContract, CalendarMaster
  - LeaveRequest, CalendarVacation, PublicHoliday
  - viewCalendarTimeSheet, viewEvents
  - ViewUserRole, ViewUserDetail, viewStaff
- ✅ Migration history intact (2 migrations)

## Verification

### Configuration
```bash
cd backend
cat prisma.config.ts    # Shows: url: process.env.DATABASE_URL || 'file:./prisma/TCon360.db'
cat .env                 # Shows: DATABASE_URL=file:./prisma/TCon360.db
```

### Database
```bash
cd backend
ls -lh prisma/TCon360.db    # 536K (correct size)
ls TCon360.db               # No such file (correct)
sqlite3 prisma/TCon360.db ".tables"  # Shows all tables
```

## Acceptance Criteria - All Met ✅

- ✅ Database located at `/backend/prisma/TCon360.db` (original location preserved)
- ✅ `prisma.config.ts` in `/backend/` root with correct path resolution
- ✅ `prisma migrate dev` succeeds without creating new DB in wrong location
- ✅ `prisma db push` works correctly
- ✅ All existing data preserved after migration
- ✅ Backend app (`prisma.service.ts`) connects to correct database
- ✅ No "No such table: main.User" errors
- ✅ Migration history clean and working
- ✅ Environment-based path resolution works for CI/CD flexibility

## Next Steps

### For Developers
1. Always run Prisma commands from `/backend/` directory
2. Ensure `.env` file is present with correct DATABASE_URL
3. Use `npm run start:dev` which automatically sets DATABASE_URL

### For CI/CD
1. Ensure `.env` is populated in CI environment
2. Set `DATABASE_URL` environment variable if needed
3. Run `prisma generate` as part of build process

### Running Migrations
```bash
cd backend
prisma migrate dev --name migration_name
```

### Running Seed Script (to recreate views)
```bash
cd backend
node prisma/seed.mjs
```

## Notes

- No database backup/restore was needed since the original database was preserved
- All migrations in `/backend/prisma/migrations/` are intact
- The seed script in `/backend/prisma/seed.mjs` creates database views not managed by Prisma
- Backend service independently handles database connection, not reliant on config file location
