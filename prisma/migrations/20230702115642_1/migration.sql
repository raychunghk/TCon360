-- CreateTable
CREATE TABLE "PostUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffName" TEXT NOT NULL,
    "AgentName" TEXT NOT NULL,
    "StaffCategory" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "PostUnit" TEXT NOT NULL,
    "ManagerName" TEXT NOT NULL,
    "ManagerTitle" TEXT NOT NULL,
    "ManagerEmail" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "staffId" INTEGER
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PostUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalendarMaster" (
    "CalendarDate" DATETIME NOT NULL PRIMARY KEY,
    "WeekDayName" TEXT,
    "Year" INTEGER NOT NULL,
    "Month" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PublicHoliday" (
    "StartDate" DATETIME NOT NULL PRIMARY KEY,
    "EndDate" DATETIME NOT NULL,
    "Summary" TEXT
);

-- CreateTable
CREATE TABLE "CalendarVacation" (
    "VacationDate" DATETIME NOT NULL PRIMARY KEY,
    "ChargeableDay" DECIMAL NOT NULL,
    "LeaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "CalendarVacation_LeaveRequestId_fkey" FOREIGN KEY ("LeaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimeSheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "TSCalendarID" INTEGER NOT NULL,
    "TimeSheetFileName" TEXT,
    "TotalChargeableDay" DECIMAL NOT NULL DEFAULT 0,
    "TotalChargeableHour" DECIMAL NOT NULL DEFAULT 0,
    "TotalOTHour" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leavePeriodStart" DATETIME NOT NULL,
    "AMPMStart" TEXT NOT NULL,
    "leavePeriodEnd" DATETIME,
    "AMPMEnd" TEXT,
    "leaveDays" REAL NOT NULL,
    "dateOfReturn" DATETIME NOT NULL,
    "staffSignDate" DATETIME NOT NULL,
    "fileId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "staffFiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffFiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "staffFiles_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimeSheetCalendar" (
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

-- CreateIndex
CREATE UNIQUE INDEX "PostUser_email_key" ON "PostUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSheet_id_key" ON "TimeSheet"("id");
