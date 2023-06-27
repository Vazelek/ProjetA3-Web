DROP TABLE IF EXISTS `etat_surface`;
DROP TABLE IF EXISTS `luminosite`;
DROP TABLE IF EXISTS `accident`;
DROP TABLE IF EXISTS `gravite`;
DROP TABLE IF EXISTS `conditions_atmospheriques`;
DROP TABLE IF EXISTS `securite`;
DROP TABLE IF EXISTS `ville`;

CREATE TABLE `etat_surface`(
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descr_etat_surf` TINYTEXT NOT NULL
);
CREATE TABLE `luminosite`(
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descr_lum` TINYTEXT NOT NULL
);
CREATE TABLE `accident`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `age` INT NOT NULL,
    `date` DATE NOT NULL,
    `heure` TIME NOT NULL,
    `latitude` DOUBLE(8, 5) NOT NULL,
    `longitude` DOUBLE(8, 5) NOT NULL,
    `id_ville` CHAR(5) NOT NULL,
    `id_lum` TINYINT UNSIGNED NOT NULL,
    `id_athmo` TINYINT UNSIGNED NOT NULL,
    `id_etat_surf` TINYINT UNSIGNED NOT NULL,
    `id_dispo_secu` TINYINT UNSIGNED NOT NULL,
    `id_grav` TINYINT UNSIGNED NULL
);
CREATE TABLE `gravite`(
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descr_grav` TINYTEXT NOT NULL
);
CREATE TABLE `conditions_atmospheriques`(
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descr_athmo` TINYTEXT NOT NULL
);
CREATE TABLE `securite`(
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descr_dispo_secu` TINYTEXT NOT NULL
);
CREATE TABLE `ville`(
    `code_insee` CHAR(5) NOT NULL,
    `nom_ville` TINYTEXT NOT NULL
);
ALTER TABLE
    `ville` ADD PRIMARY KEY(`code_insee`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_ville_foreign` FOREIGN KEY(`id_ville`) REFERENCES `ville`(`code_insee`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_grav_foreign` FOREIGN KEY(`id_grav`) REFERENCES `gravite`(`id`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_lum_foreign` FOREIGN KEY(`id_lum`) REFERENCES `luminosite`(`id`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_dispo_secu_foreign` FOREIGN KEY(`id_dispo_secu`) REFERENCES `securite`(`id`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_athmo_foreign` FOREIGN KEY(`id_athmo`) REFERENCES `conditions_atmospheriques`(`id`);
ALTER TABLE
    `accident` ADD CONSTRAINT `accident_id_etat_surf_foreign` FOREIGN KEY(`id_etat_surf`) REFERENCES `etat_surface`(`id`);