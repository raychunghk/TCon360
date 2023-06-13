/*
  Warnings:

  - You are about to alter the column `leaveDays` on the `LeaveRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `staffSignDate` on the `LeaveRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leavePeriodStart" DATETIME NOT NULL,
    "AMPMStart" TEXT,
    "leavePeriodEnd" DATETIME NOT NULL,
    "AMPMEnd" TEXT,
    "leaveDays" REAL NOT NULL,
    "dateOfReturn" DATETIME NOT NULL,
    "staffSignDate" DATETIME NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate") SELECT "AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
