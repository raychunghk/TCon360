-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeaveRequest" (
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
    "IsArchived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "staffFiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "StaffContract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("AMPMEnd", "AMPMStart", "contractId", "dateOfReturn", "fileId", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "leavePurpose", "leaveType", "staffId", "staffSignDate") SELECT "AMPMEnd", "AMPMStart", "contractId", "dateOfReturn", "fileId", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "leavePurpose", "leaveType", "staffId", "staffSignDate" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
CREATE TABLE "new_StaffContract" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ContractStartDate" DATETIME NOT NULL,
    "ContractEndDate" DATETIME NOT NULL,
    "AnnualLeave" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,
    "IsArchived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffContract_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaffContract" ("AnnualLeave", "ContractEndDate", "ContractStartDate", "IsActive", "id", "staffId") SELECT "AnnualLeave", "ContractEndDate", "ContractStartDate", "IsActive", "id", "staffId" FROM "StaffContract";
DROP TABLE "StaffContract";
ALTER TABLE "new_StaffContract" RENAME TO "StaffContract";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
