/*
  Warnings:

  - You are about to drop the column `agentName` on the `LeaveRequest` table. All the data in the column will be lost.
  - You are about to drop the column `staffCategory` on the `LeaveRequest` table. All the data in the column will be lost.
  - You are about to drop the column `staffName` on the `LeaveRequest` table. All the data in the column will be lost.
  - You are about to alter the column `dateOfReturn` on the `LeaveRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `leavePeriodEnd` on the `LeaveRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `leavePeriodStart` on the `LeaveRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `staffId` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leavePeriodStart" DATETIME NOT NULL,
    "AMPMStart" TEXT,
    "leavePeriodEnd" DATETIME NOT NULL,
    "AMPMEnd" TEXT,
    "leaveDays" TEXT NOT NULL,
    "dateOfReturn" DATETIME NOT NULL,
    "staffSignDate" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffSignDate") SELECT "AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffSignDate" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
