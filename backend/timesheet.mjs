import { PrismaClient } from "@prisma/client";

// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed

const prisma = new PrismaClient();
async function getCalendaryMonthByYearMonth(month, year) {
    const currentcalendar = await prisma.calendarMaster.findMany({
        where: {
            Year: 2023
            , Month: month
        }
    });

    return currentcalendar;
}
export default async function getCurrentMonthCalendar() {
    //const currentcalendar = await getCalendaryMonthByYearMonth(4, 2023);
    //console.log(currentcalendar)
    const dt = new Date();
    console.log(dt.getFullYear())
    console.log(dt.getMonth()+1);
    const currentYear = dt.getFullYear();
    const currentMonth = dt.getMonth()+1;
    return (await getCalendaryMonthByYearMonth(currentMonth, currentYear))
}



 