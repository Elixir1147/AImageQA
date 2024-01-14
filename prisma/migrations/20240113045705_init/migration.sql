/*
  Warnings:

  - You are about to drop the column `alive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "alive",
DROP COLUMN "password",
DROP COLUMN "profile";

-- CreateTable
CREATE TABLE "UserData" (
    "userName" TEXT NOT NULL,
    "profile" TEXT NOT NULL DEFAULT '',
    "alive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("userName")
);

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
