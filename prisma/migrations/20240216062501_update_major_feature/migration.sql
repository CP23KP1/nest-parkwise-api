/*
  Warnings:

  - You are about to drop the `emergency` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `staff` ADD COLUMN `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `emergency`;
