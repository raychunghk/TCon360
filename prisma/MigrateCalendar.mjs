import { Prisma, PrismaClient } from "@prisma/client";
import getEvents from './ics.mjs'
import path from 'path'
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed

const prisma = new PrismaClient();
async function main() {
  //genholiday();
  gencalendar();
  genStaffInfo();
}
async function genholiday() {
  const __dirname = path.resolve();
  let _path = path.join(__dirname, '../tc.ics')
  console.log(_path)
  const evt = getEvents(_path)
  for (const e of evt) {
    const calendar = await prisma.holiday.create({
      data: {
        StartDate: e.StartDate,
        EndDate: e.EndDate,
        Summary: e.Summary
      },
    });
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
  const stf = await prisma.staff.create({
    data: {
      StaffName: 'Chung Wai Man'
      , AgentName: 'Seamatch Asia Limited'
      , StaffCategory: 'CAP/CSA'
      , Department: 'ArchSD'
      , PostUnit: 'TS3'
      , ManagerName: 'Mr Anthony WONG'
      , ManagerEmail: 'wongyf3@archsd.gov.hk'
      , ManagerTitle: 'PSM/TS33'

    },
  });
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
  let locale = "en-US";
  var startyear = 2022;
  var endyear = startyear / 1 + 4;

  var currentdate = new Date("12/31/2022");
  var datenow = new Date(currentdate);
  var enddate = new Date(`12/31/${endyear}`);

  console.log(enddate);
  while (currentdate < enddate) {
    //while (false) {
    datenow.setDate(currentdate.getDate() + 1);
    datenow.toLocaleDateString();
    let weekdayname = datenow.toLocaleDateString(locale, { weekday: "long" });
    let year = datenow.getUTCFullYear();
    let month = datenow.getUTCMonth() + 1;
    let ts = datenow.getTime() / 1000;

    console.log(
      `date: ${datenow}, weekname: ${weekdayname}, month: ${month}, year : ${year}, timestamp: ${ts}`
    );
    const calendar = await prisma.CalendarMaster.create({
      data: {
        CalendarDate: datenow,
        WeekDayName: weekdayname,
        Year: year,
        Month: month
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
