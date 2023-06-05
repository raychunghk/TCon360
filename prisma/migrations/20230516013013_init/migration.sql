/*
  Warnings:

  - You are about to drop the column `BossEmail` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `BossName` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `BossTitle` on the `UserInfo` table. All the data in the column will be lost.
  - Added the required column `ManagerEmail` to the `UserInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ManagerName` to the `UserInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ManagerTitle` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserInfo" (
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
INSERT INTO "new_UserInfo" ("AgentName", "Department", "PostUnit", "StaffCategory", "StaffName", "id") SELECT "AgentName", "Department", "PostUnit", "StaffCategory", "StaffName", "id" FROM "UserInfo";
DROP TABLE "UserInfo";
ALTER TABLE "new_UserInfo" RENAME TO "UserInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
