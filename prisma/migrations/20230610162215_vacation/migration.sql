-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffName" TEXT NOT NULL,
    "staffCategory" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "leavePeriodStart" TEXT NOT NULL,
    "AMPMStart" TEXT,
    "leavePeriodEnd" TEXT NOT NULL,
    "AMPMEnd" TEXT,
    "leaveDays" TEXT NOT NULL,
    "dateOfReturn" TEXT NOT NULL,
    "staffSignDate" TEXT NOT NULL
);
