/*
  Warnings:

  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserInfo";
PRAGMA foreign_keys=on;

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
    "ManagerEmail" TEXT NOT NULL
);
