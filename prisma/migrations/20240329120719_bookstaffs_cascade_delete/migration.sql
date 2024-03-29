-- DropForeignKey
ALTER TABLE "BookStaffs" DROP CONSTRAINT "BookStaffs_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookStaffs" DROP CONSTRAINT "BookStaffs_staffId_fkey";

-- AddForeignKey
ALTER TABLE "BookStaffs" ADD CONSTRAINT "BookStaffs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookStaffs" ADD CONSTRAINT "BookStaffs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
