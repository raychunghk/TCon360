import { Prisma, PrismaClient } from '@prisma/client';
import getEvents from './ics.mjs';
import path from 'path';
import argon2 from 'argon2';
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed

const prisma = new PrismaClient();
async function main() {
  await gencalendar();
  await genholiday();
  await createViewIfNotExists();
  await genStaffInfo();
}
function createViewIfNotExists() {
  createViewCalendarIfNotExists();
  createViewEventsIfNotExists();
}

async function createViewCalendarIfNotExists() {
  try {
    const viewname = 'viewCalendarTimeSheet';
    const viewExists = await prisma.$queryRaw(Prisma.sql`
      SELECT name FROM sqlite_master WHERE type='view' AND name='viewCalendarTimeSheet';
    `);

    if (viewExists.length === 0) {
      await prisma.$queryRaw(Prisma.sql`
      create view viewCalendarTimeSheet as 
      select ROW_NUMBER() OVER (
        ORDER BY C.CalendarDate
    ) AS ID,
    CalendarDate,
    STRFTIME(
        '%Y-%m-%d %H:%M:%S',
        DATETIME(CalendarDate / 1000, 'unixepoch')
    ) AS CalendarDateStr,
    WeekDayName,
    Year,
    Month,
    CASE
        WHEN WeekDayName LIKE 'S%'
        OR PH.Summary IS NOT NULL THEN 0
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
        WHEN LR.leavePurpose IS NOT NULL THEN LR.leavePurpose
        ELSE null
    END AS HolidaySummary,
    V.LeaveRequestId,
    LR.staffId
FROM CalendarMaster C
    LEFT JOIN CalendarVacation V ON V.VacationDate = C.CalendarDate
    LEFT JOIN PublicHoliday PH ON PH.STARTDATE = C.CalendarDate
    LEFT JOIN LeaveRequest LR ON LR.id = V.LeaveRequestId
      
      `);
      console.log('View created successfully!');
    } else {
      console.log('View already exists!');
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
async function createViewEventsIfNotExists() {
  try {
    const viewname = 'viewEvents';
    const viewExists = await prisma.$queryRaw(Prisma.sql`
      SELECT name FROM sqlite_master WHERE type='view' AND name='viewEvents';
    `);

    if (viewExists.length === 0) {
      await prisma.$queryRaw(Prisma.sql`
      create view viewEvents as 
   select ROW_NUMBER() OVER (
        ORDER BY C.CalendarDate
    ) AS ID,
    CalendarDate as leavePeriodStart,
    LR.leavePeriodEnd,
    STRFTIME(
        '%Y-%m-%d %H:%M:%S',
        DATETIME(CalendarDate / 1000, 'unixepoch')
    ) AS StartDateStr,
    WeekDayName,
    Year,
    Month,
    CASE
        WHEN WeekDayName LIKE 'S%' THEN WeekDayName
        WHEN PH.Summary IS NOT NULL THEN PH.Summary
        when LR.leavePurpose is not null then LR.leavePurpose
        ELSE null
    END AS HolidaySummary,
    STRFTIME(
        '%Y-%m-%d %H:%M:%S',
        DATETIME(LR.leavePeriodEnd / 1000, 'unixepoch')
    ) AS EndDateStr,
    LR.dateOfReturn,
    STRFTIME(
    '%Y-%m-%d %H:%M:%S',
    DATETIME(LR.dateOfReturn / 1000, 'unixepoch')
) AS ReturnDateStr,
    LR.AMPMStart,
    LR.AMPMEnd,
    LR.staffId,
    LR.leaveType,
    LR.id as LeaveRequestId
FROM CalendarMaster C
    LEFT JOIN PublicHoliday PH ON PH.STARTDATE = C.CalendarDate
    left join LeaveRequest LR on LR.leavePeriodStart = CalendarDate
where HolidaySummary is not null;
    
    
      
      `);
      console.log(`${viewname} created successfully!`);
    } else {
      console.log(`${viewname} already exists!`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
async function genholiday() {
  const __dirname = path.resolve();
  console.log(__dirname);
  let _path = path.join(__dirname, 'prisma/tc.ics');
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
      username: 'raychung',
      name: 'Ray Chung',
      email: 'mannchung@gmail.com',
      password: hashedPassword,
    };

    const u = await prisma.user.create({
      data: user,
    });

    const stf = await prisma.staff.create({
      data: {
        StaffName: 'Chung Wai Man',
        AgentName: 'Seamatch Asia Limited',
        StaffCategory: 'CAP/CSA',
        Department: 'ArchSD',
        PostUnit: 'TS3',
        ManagerName: 'Mr Anthony WONG',
        ManagerEmail: 'wongyf3@archsd.gov.hk',
        ManagerTitle: 'PSM/TS33',
        user: { connect: { id: u.id } },
      },
    });

    // Update the user's staffId with the new staff's id
    await prisma.user.update({
      where: { id: u.id },
      data: { staffId: stf.id },
    });

    console.log(stf);
  } catch (error) {
    console.log(error);
  }
}
async function gencalendar() {
  // ... you will write your Prisma Client queries here
  /*const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })*/
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
    const calendar = await prisma.CalendarMaster.create({
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
