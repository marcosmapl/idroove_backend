-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `renavam` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('SEDAN', 'HATCH', 'SUV', 'PICKUP', 'VAN', 'COUPE', 'CONVERTIBLE', 'OTHER') NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `portas` INTEGER NOT NULL,
    `motorizacao` VARCHAR(191) NOT NULL,
    `tipo_cambio` ENUM('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC', 'CVT', 'OTHER') NOT NULL,
    `direcao` ENUM('MANUAL', 'HYDRAULIC', 'ELECTRIC', 'OTHER') NOT NULL,
    `kilometragem` INTEGER NOT NULL,
    `situacao_licenciamento` ENUM('REGULAR', 'IRREGULAR', 'PENDING') NOT NULL,
    `situacao_veiculo` ENUM('AVAILABLE', 'SOLD', 'IN_REPAIR', 'RESERVED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vehicle_placa_key`(`placa`),
    UNIQUE INDEX `Vehicle_renavam_key`(`renavam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
