-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalendarMaster" (
    "CalendarDate" DATETIME NOT NULL PRIMARY KEY,
    "WeekDayName" TEXT,
    "Year" INTEGER NOT NULL,
    "Month" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserVacation" (
    "VacationDate" DATETIME NOT NULL PRIMARY KEY,
    "ChargeableDay" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Holiday" (
    "StartDate" DATETIME NOT NULL PRIMARY KEY,
    "EndDate" DATETIME NOT NULL,
    "Summary" TEXT
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffName" TEXT NOT NULL,
    "AgentName" TEXT NOT NULL,
    "StaffCategory" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "PostUnit" TEXT NOT NULL,
    "BossName" TEXT NOT NULL,
    "BossTitle" TEXT NOT NULL,
    "BossEmail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TimeSheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "TSCalendarID" INTEGER NOT NULL,
    "TotalChargeableDay" DECIMAL NOT NULL,
    "TotalChargeableHour" DECIMAL NOT NULL DEFAULT 0,
    "TotalOTHour" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "TimeSheetCalendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DayID" INTEGER NOT NULL,
    "CalendarDate" DATETIME NOT NULL,
    "TimeSheetID" INTEGER NOT NULL,
    "ChargeableDay" DECIMAL NOT NULL,
    "ChargeableHour" DECIMAL NOT NULL,
    "Traing" DECIMAL NOT NULL DEFAULT 0,
    "Vacation" DECIMAL NOT NULL DEFAULT 0,
    "PublicHoliday" DECIMAL NOT NULL DEFAULT 0,
    "WeekEnd" DECIMAL NOT NULL DEFAULT 0,
    "Others" DECIMAL NOT NULL DEFAULT 0,
    CONSTRAINT "TimeSheetCalendar_TimeSheetID_fkey" FOREIGN KEY ("TimeSheetID") REFERENCES "TimeSheet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
