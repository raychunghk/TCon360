-- Add googleId to User for Google OAuth linkage
ALTER TABLE "User" ADD COLUMN "googleId" TEXT;

-- Ensure googleId is unique when present
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
