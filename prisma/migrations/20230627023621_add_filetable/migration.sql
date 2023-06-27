/*
  Warnings:

  - You are about to drop the column `requestFormFileName` on the `LeaveRequest` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "staffFiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "staffFiles_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "fileId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "LeaveRequest_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "staffFiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate") SELECT "AMPMEnd", "AMPMStart", "dateOfReturn", "id", "leaveDays", "leavePeriodEnd", "leavePeriodStart", "staffId", "staffSignDate" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
