/*
  Warnings:

  - You are about to drop the `Holiday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserVacation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Traing` on the `TimeSheetCalendar` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Holiday";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserVacation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CalendarVacation" (
    "VacationDate" DATETIME NOT NULL PRIMARY KEY,
    "ChargeableDay" DECIMAL NOT NULL,
    "LeaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "CalendarVacation_LeaveRequestId_fkey" FOREIGN KEY ("LeaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PublicHoliday" (
    "StartDate" DATETIME NOT NULL PRIMARY KEY,
    "EndDate" DATETIME NOT NULL,
    "Summary" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeSheetCalendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DayID" INTEGER NOT NULL,
    "CalendarDate" DATETIME NOT NULL,
    "TimeSheetID" INTEGER NOT NULL,
    "ChargeableDay" DECIMAL NOT NULL,
    "ChargeableHour" DECIMAL NOT NULL,
    "Training" DECIMAL NOT NULL DEFAULT 0,
    "Vacation" DECIMAL NOT NULL DEFAULT 0,
    "PublicHoliday" DECIMAL NOT NULL DEFAULT 0,
    "WeekEnd" DECIMAL NOT NULL DEFAULT 0,
    "Others" DECIMAL NOT NULL DEFAULT 0,
    CONSTRAINT "TimeSheetCalendar_TimeSheetID_fkey" FOREIGN KEY ("TimeSheetID") REFERENCES "TimeSheet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeSheetCalendar" ("CalendarDate", "ChargeableDay", "ChargeableHour", "DayID", "Others", "PublicHoliday", "TimeSheetID", "Vacation", "WeekEnd", "id") SELECT "CalendarDate", "ChargeableDay", "ChargeableHour", "DayID", "Others", "PublicHoliday", "TimeSheetID", "Vacation", "WeekEnd", "id" FROM "TimeSheetCalendar";
DROP TABLE "TimeSheetCalendar";
ALTER TABLE "new_TimeSheetCalendar" RENAME TO "TimeSheetCalendar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
