/*
  Warnings:

  - A unique constraint covering the columns `[cursorId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "cursorId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_cursorId_key" ON "Blog"("cursorId");
