CREATE DATABASE `experiencesInventory`;
  
USE `experiencesInventory`;

DROP TABLE IF EXISTS `Experiences`;
		
CREATE TABLE `Experiences` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Experience_title` MEDIUMTEXT NULL DEFAULT NULL,
  `Guest_max` INTEGER NULL DEFAULT NULL,
  `Price_USD` INTEGER NULL DEFAULT NULL,
  `neighborhood_id` INTEGER NULL DEFAULT NULL,
  `host_id` INTEGER NULL DEFAULT NULL,
  `City_id` INTEGER NULL DEFAULT NULL,
  `type_experience` bit NULL DEFAULT 1,
  `picture` MEDIUMTEXT NULL DEFAULT NULL,
  `user_id` INT(20) NULL DEFAULT NULL,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `date_range` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Neighborhood'
-- 
-- ---

DROP TABLE IF EXISTS `Neighborhood`;
		
CREATE TABLE `Neighborhood` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Neighborhood` VARCHAR(25) NULL DEFAULT NULL,
  `City_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'City'
-- 
-- ---

DROP TABLE IF EXISTS `City`;
		
CREATE TABLE `City` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `City` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Reservations'
-- 
-- ---

DROP TABLE IF EXISTS `Reservations`;
		
CREATE TABLE `Reservations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `sold_out` bit NULL DEFAULT 1,
  `date_range` VARCHAR(50) NULL DEFAULT NULL,
  `experience_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Experiences` ADD FOREIGN KEY (neighborhood_id) REFERENCES `Neighborhood` (`id`);
ALTER TABLE `Experiences` ADD FOREIGN KEY (City_id) REFERENCES `City` (`id`);
ALTER TABLE `Neighborhood` ADD FOREIGN KEY (City_id) REFERENCES `City` (`id`);
ALTER TABLE `Reservations` ADD FOREIGN KEY (experience_id) REFERENCES `Experiences` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Experiences` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Neighborhood` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `City` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Reservations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Experiences` (`id`,`Experience_title`,`Guest_max`,`Price_USD`,`neighborhood_id`,`host_id`,`City_id`,`type_experience`,`picture`,`user_id`,`address`,`date_range`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `Neighborhood` (`id`,`Neighborhood`,`city_id`) VALUES
-- ('','','');
-- INSERT INTO `City` (`id`,`City`) VALUES
-- ('','');
-- INSERT INTO `Reservations` (`id`,`sold_out`,`date`,`experience_id`) VALUES
-- ('','','','');