import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Prisma, PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import path from 'path';
import getEvents from './ics.mjs';
import privatedata from './privatedata.mjs';

const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/TCon360.db';
console.log(`database Url:`, databaseUrl);

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

// Helper function to create ISO string representing local time (recommended Option B)
function toLocalDateTimeString(date) {
  // This preserves the local time components and formats them as ISO string
  // The resulting string will look like "2026-01-23T14:26:58.000Z"
  // but represents the actual local time (HKT), not UTC midnight
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

async function main() {
  await gencalendar();
  // await genholiday();
  // await createViewIfNotExists();
  // await genStaffInfo();
}

async function createViewIfNotExists() {
  await createViewCalendarIfNotExists();
  await createViewEventsIfNotExists();
  await createViewUserRole();
  await createViewStaff();
}

async function createView(viewname, createViewSQL) {
  try {
    await prisma.$queryRaw(Prisma.sql`
      DROP VIEW IF EXISTS ${Prisma.raw(viewname)};
    `);

    await prisma.$queryRaw(Prisma.sql`
      CREATE VIEW ${Prisma.raw(viewname)} AS
        ${Prisma.raw(createViewSQL)}
    `);

    console.log(`View ${viewname} created successfully!`);
  } catch (error) {
    console.error(error);
  }
}

async function createViewCalendarIfNotExists() {
  const viewname = 'viewCalendarTimeSheet';
  const createViewSQL = `
      SELECT
        CAST(ROW_NUMBER() OVER (ORDER BY C.CalendarDate) AS INTEGER) AS ID,
        C.CalendarDate AS CalendarDate,
        CAST(
          CASE
            WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN date(C.CalendarDate / 1000.0, 'unixepoch')
            ELSE date(C.CalendarDate)
          END
          AS TEXT
        ) AS CalendarDateStr,
        C.WeekDayName,
        C.Year,
        C.Month,
        CAST(
          CASE
            WHEN C.WeekDayName LIKE 'S%' OR PH.Summary IS NOT NULL THEN 0
            WHEN V.ChargeableDay > 0 THEN V.ChargeableDay
            ELSE 0
          END
          AS REAL
        ) AS VacationChargable,
        CAST(
          CASE
            WHEN C.WeekDayName LIKE 'S%' OR PH.Summary IS NOT NULL THEN 1
            ELSE 0
          END
          AS REAL
        ) AS PublicHolidayChargable,
        CAST(
          CASE
            WHEN C.WeekDayName LIKE 'S%' THEN C.WeekDayName
            WHEN PH.Summary IS NOT NULL THEN PH.Summary
            WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
            ELSE NULL
          END
          AS TEXT
        ) AS HolidaySummary,
        CAST(V.LeaveRequestId AS INTEGER) AS LeaveRequestId,
        CAST(LR.staffId AS INTEGER) AS staffId,
        CAST(
          CASE
            WHEN LR.contractId IS NULL THEN 0
            ELSE LR.contractId
          END
          AS INTEGER
        ) AS contractId
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
  `;
  await createView(viewname, createViewSQL);
}

async function createViewUserRole() {
  const viewname = 'viewUserRole';
  const createViewSQL = `
  SELECT
        u.id AS userId,
        u.username,
        u.name,
        u.email,
        u.userStatus,
        u.roleId,
        r.name AS roleName
      FROM
        User u
      JOIN
        Role r ON u.roleId = r.id;
  `;
  await createView(viewname, createViewSQL);
}

async function createViewStaff() {
  const viewname = 'viewStaff';
  const createViewSQL = `
SELECT
  s.id AS StaffId,
  s.StaffName,
  s.AgentName,
  s.StaffCategory,
  s.Department,
  s.PostUnit,
  s.ManagerName,
  s.ManagerTitle,
  s.ManagerEmail,
  s.userId,
  sc.ContractStartDate,
  sc.ContractEndDate,
  sc.AnnualLeave,
  sc.id AS contractId 
FROM Staff AS s
LEFT JOIN StaffContract AS sc ON s.id = sc.staffId
WHERE  sc.IsActive = 1
ORDER BY sc.ContractStartDate
    `;
  await createView(viewname, createViewSQL);
}

async function createViewEventsIfNotExists() {
  const viewname = 'viewEvents';
  const createViewSQL = `
    SELECT
      CAST(ROW_NUMBER() OVER (ORDER BY C.CalendarDate) AS INTEGER) AS ID,
      C.CalendarDate AS leavePeriodStart,
      LR.leavePeriodEnd,
      CAST(
        CASE
          WHEN typeof(C.CalendarDate) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(C.CalendarDate / 1000.0, 'unixepoch'))
          ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(C.CalendarDate))
        END
        AS TEXT
      ) AS StartDateStr,
      C.WeekDayName,
      C.Year,
      C.Month,
      CAST(
        CASE
          WHEN C.WeekDayName LIKE 'S%' THEN C.WeekDayName
          WHEN PH.Summary IS NOT NULL THEN PH.Summary
          WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
          ELSE NULL
        END
        AS TEXT
      ) AS HolidaySummary,
      CAST(
        CASE
          WHEN C.WeekDayName LIKE 'S%' THEN 'weekend'
          WHEN PH.Summary IS NOT NULL THEN 'publicholiday'
          WHEN LR.id IS NOT NULL THEN COALESCE(LR.leaveType, 'vacation')
          ELSE NULL
        END
        AS TEXT
      ) AS eventType,
      CAST(
        CASE
          WHEN LR.leavePeriodEnd IS NULL THEN NULL
          WHEN typeof(LR.leavePeriodEnd) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd / 1000.0, 'unixepoch'))
          ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.leavePeriodEnd))
        END
        AS TEXT
      ) AS EndDateStr,
      LR.dateOfReturn,
      CAST(
        CASE
          WHEN LR.dateOfReturn IS NULL THEN NULL
          WHEN typeof(LR.dateOfReturn) IN ('integer', 'real') THEN STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.dateOfReturn / 1000.0, 'unixepoch'))
          ELSE STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(LR.dateOfReturn))
        END
        AS TEXT
      ) AS ReturnDateStr,
      LR.AMPMStart,
      LR.AMPMEnd,
      CAST(LR.staffId AS INTEGER) AS staffId,
      LR.leaveType,
      CAST(LR.id AS INTEGER) AS LeaveRequestId,
      CAST(
        CASE
          WHEN LR.leaveDays IS NOT NULL THEN LR.leaveDays
          WHEN C.WeekDayName LIKE 'S%' THEN 1
          WHEN PH.Summary IS NOT NULL THEN 1
          ELSE NULL
        END
        AS REAL
      ) AS leaveDays,
      CAST(LR.contractId AS INTEGER) AS contractId,
      CAST(COALESCE(LR.IsArchived, 0) AS INTEGER) AS IsArchived
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
  `;
  await createView(viewname, createViewSQL);
}

async function genholiday() {
  const __dirname = path.resolve();
  console.log(__dirname);
  let _path = path.join(__dirname, './prisma/tc.ics');
  console.log(_path);
  const evt = getEvents(_path);

  try {
    for (const e of evt) {
      await prisma.publicHoliday.create({
        data: {
          StartDate: toLocalDateTimeString(e.StartDate),
          EndDate: toLocalDateTimeString(e.EndDate),
          Summary: e.Summary,
        },
      });
    }
    console.log('Public holidays imported successfully');
  } catch (error) {
    console.error('Error importing holidays:', error);
  }
}

async function genStaffInfo() {
  try {
    const hashedPassword = await argon2.hash('admin', {
      type: argon2.argon2id,
    });

    const roleAdmin = await prisma.role.upsert({
      where: { id: 0 },
      update: {},
      create: { id: 0, name: 'admin' },
    });

    const roleStaff = await prisma.role.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'staff' },
    });

    const user = await prisma.user.create({
      data: {
        username: 'tcon360',
        name: 'Ray Chung',
        email: 'mannchung@gmail.com',
        password: hashedPassword,
        roleId: 0,
      },
    });

    const staff = await prisma.staff.create({
      data: {
        StaffName: privatedata.StaffName,
        AgentName: privatedata.AgentName,
        StaffCategory: privatedata.StaffCategory,
        Department: privatedata.Department,
        PostUnit: privatedata.PostUnit,
        ManagerName: privatedata.ManagerName,
        ManagerEmail: privatedata.ManagerEmail,
        ManagerTitle: privatedata.ManagerTitle,
        user: { connect: { id: user.id } },
        contracts: {
          create: [
            {
              ContractStartDate: toLocalDateTimeString(new Date(2023, 3, 1)),
              ContractEndDate: toLocalDateTimeString(new Date(2024, 2, 31, 23, 59, 59)),
              AnnualLeave: 12,
              IsActive: true,
            },
          ],
        },
      },
      include: { contracts: true },
    });

    // Update user with staffId
    await prisma.user.update({
      where: { id: user.id },
      data: { staffId: staff.id },
    });

    console.log('Staff and user created successfully:', staff);
  } catch (error) {
    console.error('Error creating staff info:', error);
  }
}

async function gencalendar() {
  const locale = 'en-US';
  const startYear = new Date().getFullYear() - 2;
  const endYear = new Date().getFullYear() + 2;

  let currentDate = new Date(`${startYear}-01-01`);
  const endDate = new Date(`${endYear}-12-31`);
  await prisma.$executeRaw`
   Delete from CalendarMaster
  `;
  while (currentDate <= endDate) {
    const date = new Date(currentDate);
    const weekdayName = date.toLocaleDateString(locale, { weekday: 'long' });
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const ts = date.getTime() / 1000;
    console.log(
      `date: ${date}, weekname: ${weekdayName}, month: ${month}, year : ${year}, timestamp: ${ts}`,
    );
    await prisma.calendarMaster.create({
      data: {
        CalendarDate: toLocalDateTimeString(date),
        WeekDayName: weekdayName,
        Year: year,
        Month: month,
      },
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  await prisma.$executeRaw`
    UPDATE CalendarMaster
    SET CalendarDate = REPLACE(CalendarDate, '+00:00', 'Z')
    WHERE CalendarDate LIKE '%+00:00'
  `;

  console.log('Calendar master populated successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database operations completed successfully');
  })
  .catch(async (e) => {
    console.error('Error in main execution:', e);
    await prisma.$disconnect();
    process.exit(1);
  });