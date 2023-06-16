-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffName" TEXT NOT NULL,
    "AgentName" TEXT NOT NULL,
    "StaffCategory" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "PostUnit" TEXT NOT NULL,
    "ManagerName" TEXT NOT NULL,
    "ManagerTitle" TEXT NOT NULL,
    "ManagerEmail" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("AgentName", "Department", "ManagerEmail", "ManagerName", "ManagerTitle", "PostUnit", "StaffCategory", "StaffName", "id", "userId") SELECT "AgentName", "Department", "ManagerEmail", "ManagerName", "ManagerTitle", "PostUnit", "StaffCategory", "StaffName", "id", "userId" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
