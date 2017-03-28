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
  `email` VARCHAR(30) NOT NULL UNIQUE,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
);


-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`password`) VALUES
-- ('','','');