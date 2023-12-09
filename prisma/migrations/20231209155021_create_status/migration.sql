/*
  Warnings:

  - You are about to drop the column `staff` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `staff` DROP COLUMN `staff`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
