/*
  Warnings:

  - You are about to drop the column `cursorId` on the `Blog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Blog_cursorId_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "cursorId";
