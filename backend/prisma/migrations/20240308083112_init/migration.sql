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
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
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
    "staffId" INTEGER,
    "roleId" INTEGER NOT NULL DEFAULT 1,
    "userStatus" TEXT NOT NULL DEFAULT 'active',
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
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
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "VacationDate" DATETIME NOT NULL,
    "ChargeableDay" DECIMAL NOT NULL,
    "LeaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "CalendarVacation_LeaveRequestId_fkey" FOREIGN KEY ("LeaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffContract" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ContractStartDate" DATETIME NOT NULL,
    "ContractEndDate" DATETIME NOT NULL,
    "AnnualLeave" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffContract_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "leavePurpose" TEXT,
    "leaveType" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "contractId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "staffFiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "StaffContract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffFiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "staffFiles_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarVacation_id_key" ON "CalendarVacation"("id");
