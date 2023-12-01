-- CreateTable
CREATE TABLE `parking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `zoneId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `parking` ADD CONSTRAINT `parking_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `zone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
