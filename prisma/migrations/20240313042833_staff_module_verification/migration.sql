-- AlterTable
ALTER TABLE `staff` ADD COLUMN `isVerifiedEmail` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `requestPasswordResetToken` TEXT NULL;
