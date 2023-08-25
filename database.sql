-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: oupia
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.23.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment_parent_id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_parent_id` (`comment_parent_id`),
  KEY `post_id` (`post_id`),
  KEY `fk_comment_user_idx` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`comment_parent_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favourite_user_idx` (`user_id`),
  KEY `fk_favourite_post_idx` (`post_id`),
  CONSTRAINT `fk_favourite_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_favourite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `follow_user_id` int NOT NULL,
  `be_followed_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follow_user_id` (`follow_user_id`),
  KEY `be_followed_user_id` (`be_followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`be_followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_ibfk_1_idx` (`post_id`),
  CONSTRAINT `fk_image_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (45,'https://res.cloudinary.com/dzba4fewa/image/upload/c9o9cwuv2g2nfpeb2vzh',8),(46,'https://res.cloudinary.com/dzba4fewa/image/upload/mxeaiffbn81qfpw47ymr',8),(47,'https://res.cloudinary.com/dzba4fewa/image/upload/wcfekls3amvfsqfggvfw',8);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `message_type` enum('TEXT','IMAGE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `send_user_id` int NOT NULL,
  `receive_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `send_user_id` (`send_user_id`),
  KEY `receive_user_id` (`receive_user_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`send_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receive_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motel`
--

DROP TABLE IF EXISTS `motel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_location` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `phone_number` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_longitude` float NOT NULL,
  `location_latitude` float NOT NULL,
  `status` enum('PENDING','ACCEPTED','UNACCEPTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `location_id` (`full_location`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `motel_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motel`
--

LOCK TABLES `motel` WRITE;
/*!40000 ALTER TABLE `motel` DISABLE KEYS */;
INSERT INTO `motel` VALUES (49,'Nhà trọ SẠCH SẼ 449/17 Trường Chinh','449/17 Trường Chinh, phường 14, Tân Bình, Hồ Chí Minh',16,'2023-08-25 15:50:34','2023-08-25 15:50:34','nha-tro-sach-se-449-17-truong-chinh',0,'0987654321',106.633,10.8141,'PENDING');
/*!40000 ALTER TABLE `motel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,'Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','2023-08-25 15:50:42','2023-08-25 15:50:42',0,'nha-tro-sach-se-449-17-truong-chinh-cho-thue-gia-re-bao-ien-nuoc',16);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_find_detail`
--

DROP TABLE IF EXISTS `post_find_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_find_detail` (
  `id` int NOT NULL,
  `location` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `min_price` double NOT NULL,
  `max_price` double NOT NULL,
  `people` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_find_detail_1_idx` (`post_id`),
  CONSTRAINT `fk_post_find_detail_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_find_detail`
--

LOCK TABLES `post_find_detail` WRITE;
/*!40000 ALTER TABLE `post_find_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_find_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_rent_detail`
--

DROP TABLE IF EXISTS `post_rent_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_rent_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(15,2) NOT NULL,
  `area` double NOT NULL,
  `min_people` int DEFAULT '1',
  `max_people` int DEFAULT NULL,
  `num_of_bedrooms` int DEFAULT NULL,
  `num_of_bathrooms` int DEFAULT NULL,
  `motel_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `motel_id` (`motel_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_rent_detail_ibfk_1` FOREIGN KEY (`motel_id`) REFERENCES `motel` (`id`),
  CONSTRAINT `post_rent_detail_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_rent_detail`
--

LOCK TABLES `post_rent_detail` WRITE;
/*!40000 ALTER TABLE `post_rent_detail` DISABLE KEYS */;
INSERT INTO `post_rent_detail` VALUES (8,3000000.00,25,1,3,1,1,49,8);
/*!40000 ALTER TABLE `post_rent_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `id` int NOT NULL,
  `rate_stars` varchar(45) NOT NULL,
  `content` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  `motel_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rate_1_idx` (`user_id`),
  KEY `fk_rate_2_idx` (`motel_id`),
  CONSTRAINT `fk_rate_2` FOREIGN KEY (`motel_id`) REFERENCES `motel` (`id`),
  CONSTRAINT `fk_rate_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_role` enum('ADMIN','TENANT','LANDLORD') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_confirm` tinyint(1) NOT NULL,
  `status` enum('PENDING','ACCEPTED','UNACCEPTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$10$XRitZf0XqYI1aF.sYqMcsOYS/bwFDL7K4oW4SHPGLv5l1fHVByUx.','Admin','admin@gmail.com','1234567890','OTHER','2023-06-02 00:00:00','2023-08-08 00:00:00','2023-08-24 11:55:44','ADMIN','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/xxzugrejvq0hgtan1v8t',0,'PENDING',0),(16,'Dung','$2a$10$/4s.fbiI5mHwQdW1OZYMtuDHaWdP/PSEH4Yj/ZiISUrRS0Qm73qBO','Trần Ngọc Dung','Dung@gmail.com','1234567890987','FEMALE','2023-08-01 00:00:00','2023-08-11 00:00:00','2023-08-14 13:49:55','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/uclxeg8j2owjkvx0noqj',0,'ACCEPTED',0),(21,'hoanganh1234','$2a$10$lB5DFFRQs52nY7BibQiOMekz4DqpGVsUtFt9M68u2HlKwlzoUCcka','Hoàng Ánh','hoanganh@gmail.com','654345676543','MALE','2022-10-02 00:00:00','2023-08-19 00:00:00','2023-08-19 08:14:22','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/zq0woxqa1pzx6xx2xqoa',0,'PENDING',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-25 18:16:42
