DROP DATABASE IF EXISTS `core`;
-- ---
-- Globals
-- ---

CREATE DATABASE `core`;
-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;
USE `core`;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'recipes'
--
-- ---

DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `image` MEDIUMTEXT NOT NULL,
  `difficulty` CHAR(10) NOT NULL,
  `cook_time` INT NOT NULL,
  `prep_time` INT NOT NULL,
  `servings` INTEGER NOT NULL,
  `instructions` MEDIUMTEXT NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ingredients'
--
-- ---

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `ingredient` MEDIUMTEXT NOT NULL,
  `quantity` MEDIUMTEXT NOT NULL,
  `recipe_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS `reviews`;
    
CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `review` MEDIUMTEXT NOT NULL,
  `recipe_id` INTEGER NOT NULL,
  `rating` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'favorites'
-- 
-- ---

DROP TABLE IF EXISTS `favorites`;
    
CREATE TABLE `favorites` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `recipe_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


-- ---
-- Foreign Keys
-- ---

ALTER TABLE `recipes` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `ingredients` ADD FOREIGN KEY (recipe_id) REFERENCES `recipes` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (recipe_id) REFERENCES `recipes` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `favorites` ADD FOREIGN KEY (recipe_id) REFERENCES `recipes` (`id`);
ALTER TABLE `favorites` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `recipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`password`,`email`) VALUES
-- ('','','','');
-- INSERT INTO `recipes` (`id`,`name`,`image`,`difficulty`,`cooktime`,`preptime`,`servings`,`instructions`,`user_id`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `ingredients` (`id`,`ingredient`,`quantity`,`recipe_id`) VALUES
-- ('','','','');
-- INSERT INTO `reviews` (`id`,`review`,`recipe_id`) VALUES
-- ('','','');