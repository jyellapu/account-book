/*
  Warnings:

  - You are about to drop the column `firstName` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `_BookToStaff` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "_BookToStaff" DROP CONSTRAINT "_BookToStaff_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToStaff" DROP CONSTRAINT "_BookToStaff_B_fkey";

-- DropIndex
DROP INDEX "Staff_mobileNumber_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "type",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "mobileNumber" DROP NOT NULL;

-- DropTable
DROP TABLE "_BookToStaff";

-- DropEnum
DROP TYPE "StaffType";

-- CreateTable
CREATE TABLE "BookStaffs" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "bookId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "BookStaffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookStaffs_bookId_staffId_idx" ON "BookStaffs"("bookId", "staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "BookStaffs" ADD CONSTRAINT "BookStaffs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookStaffs" ADD CONSTRAINT "BookStaffs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
