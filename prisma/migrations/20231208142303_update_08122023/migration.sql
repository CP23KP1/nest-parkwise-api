/*
  Warnings:

  - You are about to drop the column `licenseUrl` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `log` DROP COLUMN `licenseUrl`;

-- AlterTable
ALTER TABLE `staff` DROP COLUMN `status`;
