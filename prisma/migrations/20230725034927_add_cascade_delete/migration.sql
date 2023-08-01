-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalendarVacation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "VacationDate" DATETIME NOT NULL,
    "ChargeableDay" DECIMAL NOT NULL,
    "LeaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "CalendarVacation_LeaveRequestId_fkey" FOREIGN KEY ("LeaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CalendarVacation" ("ChargeableDay", "LeaveRequestId", "VacationDate", "id") SELECT "ChargeableDay", "LeaveRequestId", "VacationDate", "id" FROM "CalendarVacation";
DROP TABLE "CalendarVacation";
ALTER TABLE "new_CalendarVacation" RENAME TO "CalendarVacation";
CREATE UNIQUE INDEX "CalendarVacation_id_key" ON "CalendarVacation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
