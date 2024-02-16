/*
  Warnings:

  - Added the required column `arrowDirection` to the `car_guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car_guest` ADD COLUMN `arrowDirection` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `log` ADD COLUMN `arrowDirection` VARCHAR(191) NULL;
