/*
  Warnings:

  - Made the column `AMPMStart` on table `LeaveRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
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
    "fileId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "staffFiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("AMPMEnd", "AMPMStart", "dateOfReturn", "fileId", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate") SELECT "AMPMEnd", "AMPMStart", "dateOfReturn", "fileId", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
