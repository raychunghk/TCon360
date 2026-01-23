import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Prisma, PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import path from 'path';
import getEvents from './ics.mjs';
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
import privatedata from './privatedata.mjs';

const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/TCon360.db';
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });
async function main() {
  await gencalendar();
  await genholiday();
  await createViewIfNotExists();
  await genStaffInfo();
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
  //let _path = path.join('/config/workspace/vm/js/NxTime/prisma/tc.ics')
  console.log(_path);
  const evt = getEvents(_path);
  //return new Date(dateval.getTime() - dateval.getTimezoneOffset() * 60000).toISOString()
  try {
    for (const e of evt) {
      const calendar = await prisma.publicHoliday.create({
        data: {
          StartDate: e.StartDate,
          EndDate: e.EndDate,
          Summary: e.Summary,
        },
      });
      //  console.log(e.StartDate)
    }
  } catch (error) {
    console.log(error);
  }
}

async function genContract() { }
async function genStaffInfo() {
  /*
  id            Int            @id @default(autoincrement())
  StaffName     String
  AgentName     String
  StaffCategory String
  Department    String
  PostUnit      String
  ManagerName   String
  ManagerTitle  String
  ManagerEmail  String
  user          User?          @relation(fields: [userId], references: [id])
  userId        String?        @unique
  leaveRequests LeaveRequest[]
  */
  try {
    const hashedPassword = await argon2.hash('admin', {
      type: argon2.argon2id,
    });
    const user = {
      username: 'tcon360',
      name: 'Ray Chung',
      email: 'mannchung@gmail.com',
      password: hashedPassword,
      roleId: 0,
    };
    const role = {
      id: 0,
      name: 'admin',
    };
    const role2 = {
      id: 1,
      name: 'staff',
    };
    const _role = await prisma.role.create({
      data: role,
    });
    const _role2 = await prisma.role.create({
      data: role2,
    });
    const u = await prisma.user.create({
      data: user,
    });

    const stf = await prisma.staff.create({
      data: {
        StaffName: privatedata.StaffName,
        AgentName: privatedata.AgentName,
        StaffCategory: privatedata.StaffCategory,
        Department: privatedata.Department,
        PostUnit: privatedata.PostUnit,
        ManagerName: privatedata.ManagerName,
        ManagerEmail: privatedata.ManagerEmail,
        ManagerTitle: privatedata.ManagerTitle,
        user: { connect: { id: u.id } },
        contracts: {
          create: [
            {
              ContractStartDate: new Date(2023, 3, 1),
              ContractEndDate: new Date(2024, 2, 31),
              AnnualLeave: 12,
              IsActive: true,
            },
          ],
        },
      },
      include: {
        contracts: true,
      },
    });
    // Update the user's staffId with the new staff's id
    await prisma.user.update({
      where: { id: u.id },
      data: { staffId: stf.id },
    });
    // const contract = await prisma.staffContract.create({
    //   data: {
    //     ContractStartDate: new Date(2023, 3, 1),
    //     ContractEndDate: new Date(2024, 2, 31),
    //     AnnualLeave: 12,
    //     staff: { connect: { id: stf.id } },
    //   },
    // });

    // await prisma.staff.update({
    //   where: { id: stf.id },
    //   data: { activeContractId: contract.id },
    // });
    console.log(stf);
  } catch (error) {
    console.log(error);
  }
}
async function gencalendar() {
  // let startdate: Date = new Date("January 1, 2023");
  let locale = 'en-US';
  var startyear = 2022;
  var endyear = startyear / 1 + 4;

  var currentdate = new Date('12/31/2022');
  var datenow = new Date(currentdate);
  var enddate = new Date(`12/31/${endyear}`);

  console.log(enddate);
  while (currentdate < enddate) {
    //while (false) {
    datenow.setDate(currentdate.getDate() + 1);
    datenow.toLocaleDateString();
    let weekdayname = datenow.toLocaleDateString(locale, { weekday: 'long' });
    let year = datenow.getUTCFullYear();
    let month = datenow.getUTCMonth() + 1;
    let ts = datenow.getTime() / 1000;

    console.log(
      `date: ${datenow}, weekname: ${weekdayname}, month: ${month}, year : ${year}, timestamp: ${ts}`,
    );
    const calendar = await prisma.calendarMaster.create({
      data: {
        CalendarDate: datenow,
        WeekDayName: weekdayname,
        Year: year,
        Month: month,
      },
    });
    currentdate = datenow;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
