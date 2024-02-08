/*
  Warnings:

  - You are about to drop the column `arrowDirection` on the `log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `log` DROP COLUMN `arrowDirection`;

-- AlterTable
ALTER TABLE `staff` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `zone` ADD COLUMN `imageUrl` VARCHAR(191) NULL;
