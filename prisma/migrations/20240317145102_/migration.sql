/*
  Warnings:

  - You are about to alter the column `email` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - You are about to alter the column `password` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - You are about to alter the column `licensePlate` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(12)`.
  - You are about to alter the column `color` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - You are about to alter the column `brand` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - You are about to alter the column `model` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - You are about to alter the column `province` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - You are about to alter the column `phoneNumber` on the `emergency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `arrowDirection` on the `log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.
  - You are about to alter the column `email` on the `staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - You are about to alter the column `phoneNumber` on the `staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - Added the required column `updatedAt` to the `emergency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `email` VARCHAR(80) NOT NULL,
    MODIFY `password` VARCHAR(80) NULL;

-- AlterTable
ALTER TABLE `car` MODIFY `licensePlate` VARCHAR(12) NOT NULL,
    MODIFY `color` VARCHAR(40) NOT NULL,
    MODIFY `brand` VARCHAR(40) NOT NULL,
    MODIFY `model` VARCHAR(80) NOT NULL,
    MODIFY `province` VARCHAR(40) NULL,
    MODIFY `imageUrl` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `device` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `brand` VARCHAR(255) NULL,
    MODIFY `deviceSerial` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `emergency` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `log` MODIFY `licenseUrl` VARCHAR(255) NULL,
    MODIFY `arrowDirection` VARCHAR(4) NULL;

-- AlterTable
ALTER TABLE `parking` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `firstname` VARCHAR(255) NOT NULL,
    MODIFY `lastname` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(80) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(20) NOT NULL,
    MODIFY `imageUrl` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `zone` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `address` VARCHAR(255) NULL,
    MODIFY `imageUrl` VARCHAR(255) NULL;
