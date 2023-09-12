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
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `fk_comment_user_idx` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'test','2023-09-01 00:04:11',29,21),(2,'toi thu','2023-09-01 00:05:34',29,21),(3,'ok','2023-09-01 00:11:08',29,21),(4,'thu khong','2023-09-01 00:13:14',29,21),(5,'nhu nay duoc khong','2023-09-01 00:15:40',29,21),(6,'bình luận mới nè','2023-09-01 15:15:44',29,21),(7,'test','2023-09-01 15:17:07',29,21),(8,'nhà đẹp thế','2023-09-01 15:17:40',29,21),(9,'123123131','2023-09-01 15:18:07',29,21),(10,'32131231313','2023-09-01 15:18:08',29,21),(11,'u la tri','2023-09-01 15:18:12',29,21),(12,'um ba','2023-09-01 15:18:19',29,21),(13,'lachimolala','2023-09-01 15:18:23',29,21),(14,'omg','2023-09-01 15:18:29',29,21),(15,'Còn không bạn?','2023-09-04 15:58:32',30,41),(16,'hehe','2023-09-09 13:43:23',32,21),(17,'Ban can nguoi o ghep khong','2023-09-10 17:16:24',38,21),(18,'inbox','2023-09-11 23:38:34',39,21),(19,'.','2023-09-11 23:46:47',39,21),(20,'1','2023-09-11 23:52:25',39,21),(21,'12','2023-09-11 23:52:26',39,21),(22,'12','2023-09-11 23:52:26',39,21),(23,'3','2023-09-11 23:52:28',39,21),(24,'5','2023-09-11 23:52:30',39,21),(25,'411','2023-09-11 23:52:32',39,21),(26,'411','2023-09-11 23:52:32',39,21),(27,'3213','2023-09-11 23:52:34',39,21),(28,'321341','2023-09-11 23:52:37',39,21),(29,'chao','2023-09-12 00:46:34',38,21),(30,'!','2023-09-12 00:49:09',38,21),(31,'test','2023-09-12 00:49:19',38,21),(32,'1','2023-09-12 00:49:21',38,21),(33,'2','2023-09-12 00:49:22',38,21),(34,'3','2023-09-12 00:49:24',38,21),(35,'4','2023-09-12 00:49:26',38,21),(36,'5','2023-09-12 00:49:27',38,21),(37,'6','2023-09-12 00:49:29',38,21);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favourite_user_idx` (`user_id`),
  KEY `fk_favourite_post_idx` (`post_id`),
  CONSTRAINT `fk_favourite_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_favourite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
INSERT INTO `favourite` VALUES (2,21,29,'2023-09-04 15:44:00'),(7,41,30,'2023-09-04 15:59:34'),(8,41,32,'2023-09-04 20:36:19'),(10,21,32,'2023-09-09 13:43:45'),(11,16,38,'2023-09-10 17:30:08'),(13,21,39,'2023-09-10 22:49:21'),(14,21,34,'2023-09-10 22:49:27'),(15,21,31,'2023-09-10 22:49:33'),(16,21,30,'2023-09-10 22:49:38'),(17,21,28,'2023-09-10 22:50:01'),(18,21,27,'2023-09-10 22:50:05'),(19,21,26,'2023-09-10 22:50:13'),(20,21,8,'2023-09-10 22:50:23'),(34,21,19,'2023-09-12 01:49:10'),(47,21,37,'2023-09-12 01:57:00'),(49,21,38,'2023-09-12 02:09:04');
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `follow_user_id` int NOT NULL,
  `be_followed_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follow_user_id` (`follow_user_id`),
  KEY `be_followed_user_id` (`be_followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`be_followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (9,'2023-09-09 18:13:57',21,16),(10,'2023-09-10 01:28:40',47,16),(11,'2023-09-10 20:17:43',29,16);
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
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (45,'https://res.cloudinary.com/dzba4fewa/image/upload/c9o9cwuv2g2nfpeb2vzh',8),(46,'https://res.cloudinary.com/dzba4fewa/image/upload/mxeaiffbn81qfpw47ymr',8),(47,'https://res.cloudinary.com/dzba4fewa/image/upload/wcfekls3amvfsqfggvfw',8),(73,'https://res.cloudinary.com/dzba4fewa/image/upload/la7avhhjbfqoxo2d3jk1',19),(78,'https://res.cloudinary.com/dzba4fewa/image/upload/vmjqblylo13vqufqemre',25),(79,'https://res.cloudinary.com/dzba4fewa/image/upload/qihbuuqu063o8zhodbnq',25),(80,'https://res.cloudinary.com/dzba4fewa/image/upload/qdp1sw8huzepcekdeugi',25),(81,'https://res.cloudinary.com/dzba4fewa/image/upload/glvztrwjqnqlm1k6hwpo',26),(82,'https://res.cloudinary.com/dzba4fewa/image/upload/flkhybpjooadllxs2ipz',26),(83,'https://res.cloudinary.com/dzba4fewa/image/upload/zxfmndksuimglwl6n95d',26),(84,'https://res.cloudinary.com/dzba4fewa/image/upload/cvlsswipoufkywr6jt2x',26),(85,'https://res.cloudinary.com/dzba4fewa/image/upload/qtfx1e4de3msdyrwmfr7',26),(86,'https://res.cloudinary.com/dzba4fewa/image/upload/rbk0qrvthasfaref2tvk',27),(87,'https://res.cloudinary.com/dzba4fewa/image/upload/n90yllbkruxuawnp0ib2',27),(88,'https://res.cloudinary.com/dzba4fewa/image/upload/jxf8gdfa0oxmdhqtvs4l',27),(89,'https://res.cloudinary.com/dzba4fewa/image/upload/ts2jpiby2wh3althuyqd',28),(90,'https://res.cloudinary.com/dzba4fewa/image/upload/zneb7tt76d9f2qbksmur',28),(91,'https://res.cloudinary.com/dzba4fewa/image/upload/szp883h48izsvm2c8fak',28),(92,'https://res.cloudinary.com/dzba4fewa/image/upload/egrxenosblxnkcwuu4j4',29),(93,'https://res.cloudinary.com/dzba4fewa/image/upload/vdd2akuu0ugamovbgc4d',29),(94,'https://res.cloudinary.com/dzba4fewa/image/upload/ru0wdle4a2zorsh1gbww',29),(95,'https://res.cloudinary.com/dzba4fewa/image/upload/iemooafr9keansjansie',29),(96,'https://res.cloudinary.com/dzba4fewa/image/upload/zj5dkmsb9peqqmyzwpgh',30),(97,'https://res.cloudinary.com/dzba4fewa/image/upload/l8jedtikie7fgvbfhwoi',30),(98,'https://res.cloudinary.com/dzba4fewa/image/upload/met6txhdfnkhelfkv4t4',30),(99,'https://res.cloudinary.com/dzba4fewa/image/upload/eeoi1x6jkwhirppxltf6',31),(100,'https://res.cloudinary.com/dzba4fewa/image/upload/fn4o1xwgtvpwupozyzhk',31),(101,'https://res.cloudinary.com/dzba4fewa/image/upload/ozzdlcqfolguxyinnl2m',31),(102,'https://res.cloudinary.com/dzba4fewa/image/upload/if8czncgjaba2icmzkti',32),(103,'https://res.cloudinary.com/dzba4fewa/image/upload/m8leybkdpfd7cwyhe9jg',32),(104,'https://res.cloudinary.com/dzba4fewa/image/upload/fdtlloenc21ttzxgcttp',32),(111,'https://res.cloudinary.com/dzba4fewa/image/upload/xer9ynggtfyewdpo3yln',34),(112,'https://res.cloudinary.com/dzba4fewa/image/upload/lqq7wq8coqzogfktwpda',34),(113,'https://res.cloudinary.com/dzba4fewa/image/upload/m0okl8spremq9z5yei5y',34),(114,'https://res.cloudinary.com/dzba4fewa/image/upload/g1zp0vj7x5hmjrrfqwds',34),(115,'https://res.cloudinary.com/dzba4fewa/image/upload/rn5wfy93jxzvzdr44rb8',34),(116,'https://res.cloudinary.com/dzba4fewa/image/upload/i6fz7fgyijgzirecgo76',34),(129,'https://res.cloudinary.com/dzba4fewa/image/upload/ftwyj5730qjbpzak7zer',39),(130,'https://res.cloudinary.com/dzba4fewa/image/upload/u49bayfrsnlketc3ch04',39),(131,'https://res.cloudinary.com/dzba4fewa/image/upload/qw7agbxisjaxt1uqqrvg',39),(132,'https://res.cloudinary.com/dzba4fewa/image/upload/fn6csnckkm00r1tkssq4',39),(133,'https://res.cloudinary.com/dzba4fewa/image/upload/h0oxaczk5i3jdopz1gqp',39),(134,'https://res.cloudinary.com/dzba4fewa/image/upload/yb58viyrfegjgetsovd3',39),(135,'https://res.cloudinary.com/dzba4fewa/image/upload/atf5yizbcnotbxmri0yx',41),(136,'https://res.cloudinary.com/dzba4fewa/image/upload/vpbujnp7e0qah6n2atyt',41),(137,'https://res.cloudinary.com/dzba4fewa/image/upload/wszuvcj2nge7plnhpxit',41);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motel`
--

LOCK TABLES `motel` WRITE;
/*!40000 ALTER TABLE `motel` DISABLE KEYS */;
INSERT INTO `motel` VALUES (49,'Nhà trọ SẠCH SẼ 449/17','449/17 Trường Chinh, phường 14, Tân Bình, Hồ Chí Minh',16,NULL,'2023-09-10 19:11:28','nha-tro-sach-se-449-17-truong-chinh',0,'0987654321',106.633,10.8141,'ACCEPTED'),(50,'Kí túc xá Đại học Công Nghiệp 4','60 Huỳnh Khương An, Phường 5, Gò Vấp, Hồ Chí Minh',23,'2023-08-31 14:26:09','2023-08-31 14:26:09','ki-tuc-xa-ai-hoc-cong-nghiep-4',0,'0927131212',106.689,10.823,'ACCEPTED'),(51,'Ký túc xá Phú Nhuận - Sleepbox Nữ - Phan Xích Long','181 Phan Đăng Lưu, Phường 1, Phú Nhuận, Hồ Chí Minh',23,'2023-08-31 15:13:05','2023-08-31 15:13:05','ky-tuc-xa-phu-nhuan-sleepbox-nu-phan-xich-long',0,'3467865432',106.681,10.8001,'ACCEPTED'),(52,' Hệ Thống Căn Hộ Cao Cấp Tại Quận 7 - Nhà Bè ','hẻm 52, Tân Quy, Quận 7, Hồ Chí Minh',16,NULL,'2023-08-31 15:31:09','he-thong-can-ho-cao-cap-tai-quan-7-nha-be',0,'1234567890',106.708,10.7411,'ACCEPTED'),(53,'Dorm KTX cao cấp','118/61B Bạch Đằng, Phường 24, Bình Thạnh, Hồ Chí Minh',16,NULL,'2023-08-31 15:31:15','dorm-ktx-cao-cap',0,'9690854374',106.707,10.8044,'ACCEPTED'),(54,'Nhà trọ SuviHem','68/34 Út Tịch, Phường 4, Tân Bình, Hồ Chí Minh',16,'2023-09-02 11:59:39','2023-09-02 11:59:39','nha-tro-suvihem',0,'1234567890',106.659,10.7957,'ACCEPTED'),(60,'nhà trọ đức trọng','Cafe Dốc Đá, Hiệp Thạnh, Đức Trọng, Lâm Đồng',29,NULL,'2023-09-08 12:53:23','nha-tro-uc-trong',0,'0789654321',108.419,11.7813,'ACCEPTED'),(61,'Nhà trọ Yên Thế','123 Nguyễn Tri Phương, Phường 8, Quận 5, Hồ Chí Minh',41,NULL,'2023-09-04 16:28:36','nha-tro-yen-the',0,'0901234567',106.669,10.7548,'ACCEPTED'),(62,'Nhà trọ Kelvin Tuấn Minh','371 Nguyễn Kiệm, Phường 3, Gò Vấp, Hồ Chí Minh',61,'2023-09-12 12:29:01','2023-09-12 12:29:01','nha-tro-kelvin-tuan-minh',0,'0980980988',106.678,10.8181,'PENDING');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,'Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','2023-08-25 15:50:42','2023-08-25 15:50:42',0,'nha-tro-sach-se-449-17-truong-chinh-cho-thue-gia-re-bao-ien-nuoc',16),(19,'Tìm nhà trọ dành cho sinh viên khu vực quận 12','Em cần tìm nhà trọ giá sinh viên gần trong khu vực quận 12 ngay gần Tân Thới Nhất 8 để tiện đường đi học ạ.','2023-08-27 13:01:06','2023-08-27 13:01:06',0,'tim-nha-tro-danh-cho-sinh-vien-khu-vuc-quan-12',22),(25,'Cho thuê phòng mới xây tại 449/17 Trường Chinh P14 Q Tân Bình giá từ 3tr/th','Địa chỉ 449/17, Đường Trường Chinh, Phường 14, Quận Tân Bình, Tp Hồ Chí Minh\r\n\r\nDTSD 20m2 - 45m2\r\n\r\nPhòng trọ Tân Bình mới xây 100%. Gác cao 2m không đụng đầu. Đầy đủ tiện ích: Giặt sấy, tạp hóa,...\r\n\r\nngay khu dân cư an ninh, yên tĩnh, dân trí cao..\r\n\r\nvị trí đắc địa ngay trung tâm hành chính Q Tân Bình... Ngay trục đường chính rất thuận tiện giao thông,.....\r\n\r\nGần chợ, trường học, siêu thị, bệnh viện, công viên, cửa hàng tiện lợi, giao thông công cộng, ngân hàng, ATM, quán xá,...\r\n\r\nGiá thuê mùa dịch từ 3tr/th\r\n\r\nLH Chính chủ MS Ánh 0838676545','2023-08-29 09:35:59','2023-08-29 09:35:59',0,'cho-thue-phong-moi-xay-tai-449-17-truong-chinh-p14-q-tan-binh-gia-tu-3tr-th',16),(26,'KTX Đại Học Công Nghiệp 4 Gò Vấp free điện nước chỉ 1tr3','Địa chỉ: 60/18A Huỳnh Khương An, p. 15,\r\n\r\nGò Vấp.\r\n\r\nKhông gian rộng, có cửa sổ.\r\n\r\nTrang bị giường, nệm và drap mới.\r\n\r\nMáy lạnh.\r\n\r\nNhà vệ sinh riêng.\r\n\r\nCó bếp nấu ăn riêng trong phòng.\r\n\r\nWifi nhanh như máy bay.\r\n\r\nTrang bị máy giặt và nơi phơi đồ.\r\n\r\nKhông gian đảm bảo luôn được vệ sinh sạch sẽ.\r\n\r\nThang máy tiện lên xuống, camera an ninh, bảo vệ 24/7.\r\n\r\nĐảm bảo điều kiện sống cho bạn một cách tốt nhất.\r\n\r\nPhòng 6 giường.\r\n\r\nGiá: 1tr3/người phòng thường.\r\n\r\n1tr5/người phòng máy lạnh.\r\n\r\nCó cho thuê phòng riêng.','2023-08-31 14:26:21','2023-08-31 14:26:21',0,'ktx-ai-hoc-cong-nghiep-4-go-vap-free-ien-nuoc-chi-1tr3',23),(27,'✨ ✨ ✨ Sleepbox - KTX NỮ Bình Thạnh cách DH Văn Lang 500m','🌈🌈🌈Kí túc xá - sleepbox dành cho NỮ, cách chợ Bà Chiểu 700m, Đại Học Văn Lang 500m - Trung tâm Bình Thạnh, Trường HUTECH. Và nhiều Trường Đại Học Khác.\r\n\r\n💫 CHỈ TỪ 1200k ✨\r\n\r\n🌟🌟\r\n(Giá đã bao gồm tất cả chi phí ).\r\n\r\nTiện ích: phòng được trang bị máy lạnh kèm máy quạt thông thoáng, máy giặt, wifi, khoá vân tay, camera an ninh,tủ lạnh...và rất nhiều nội thất khác....). Các trang thiết bị hiện đại. CÓ CHỖ ĐỂ XE MIỄN PHÍ.\r\n\r\nCó dịch vụ dọn vệ sinh hàng tuần.\r\n\r\n-----------------------------------------------\r\n🌇🌃 Cơ sở 1 : 69/31A Nơ trang long, p.11, q. Phú Nhuận.(cách chợ bà chiểu 700m, ĐH VĂN LANG 500M)\r\n-----------------------------------------------\r\n🌇🌃 Cơ sở 2 : 181/39 phan đăng lưu,P.1,Q.Phú Nhuận.(ra phan xích long 200m)\r\n-----------------------------------------------\r\n\r\n🌆Phòng Sleepbox Mới Toanh Cực Kì Riêng Tư Ngay Ngã Tư Lê Định - Nơ Trang Long (1km ra khu ăn uống sầm uất Phạm Văn Đồng , Phan Xích Lon).\r\n== 🥂 BẾP\r\n\r\nBếp rộng rãi đầy đủ đồ\r\nFull nội thất\r\nPhòng bếp, phòng ăn,sofa đầy đủ, sạch sẽ\r\n\r\n== ⛺ PHÒNG SINH HOẠT\r\n\r\nKhông gian riêng tư tách biệt sinh viên - người đi làm\r\nBàn làm việc rộng rãi ngay tại box\r\nCửa sổ, ban công thoáng mát, quạt máy, Máy lạnh 24/24(Máy inverter tiết kiệm điện).\r\n.\r\n🧞🧞🧞 liên hệ hotline hoặc zalo xem phòng trực tiếp inb zalo trc khi qua.\r\n\r\n🌝 Tin đăng chính chủ, xem nhà miễn phí, không qua giới. Giá gốc hoàn toàn. 🌝\r\n\r\n🌹 Cảm ơn các bạn đã xem tin🌹\r\n🍀🍀🍀','2023-08-31 15:13:12','2023-08-31 15:13:12',0,'sleepbox-ktx-nu-binh-thanh-cach-dh-van-lang-500m',23),(28,'🏢 Hệ Thống Căn Hộ Cao Cấp Tại Quận 7 - Nhà Bè 🏢','🔷Đa dạng các loại phòng từ không nội thất đến full nội thất\r\n🔷 Vị trí thuận tiện\r\n- Di chuyển đến các quận trung tâm thành phố hồ chí minh.\r\n- Có các dạng phòng phù hợp với nhu cầu trực tiếp của khách hàng!\r\n🔷 Đầy đủ nội thất _ mới chưa một lần sử dụng\r\n- Máy lạnh, tủ lạnh, máy nước nóng lạnh;\r\n- Giường, nệm, rèm cửa;\r\n- Kệ bếp, tủ bếp, tủ đồ, bếp điện, bàn làm việc.\r\n- Vòi tắm hoa sen, gương tắm, lavabo, thanh treo đồ inox;\r\n🔷 Căn hộ có cửa sổ và ban công thoáng mát\r\n🔷 Dịch vụ miễn phí\r\n• Hệ thống PCCC\r\n• Hệ thống khóa vân tay thông minh\r\n• Camera an ninh 24/7\r\n• Vệ sinh khu vực chung hàng tuần\r\n• Máy giặt và máy sấy free\r\n• Hồ bơi - Phòng Gym free\r\nGIÁ:\r\nDạng Studio: 5.000.000 - 9.000.000đ\r\nDuplex: 4.700.000-5.500.000-6.000.000-7.300.0000\r\n1 Phòng ngủ : 6.500.000 - 8.500.000\r\n2 Phòng ngủ: 8.000.000-11.000.000\r\n🎆🎆 Nhanh tay liên hệ để nhận thông tin, hình ảnh và xem phòng thực tế bạn nha!','2023-08-31 15:18:46','2023-08-31 15:18:46',0,'he-thong-can-ho-cao-cap-tai-quan-7-nha-be',16),(29,'Giảm kịch sàn áp dụng tất cả các hệ thống phòng. Chỉ từ 1tr5/ phòng.','Dorm KTX cao cấp\r\nTưng bừng chào đón tân sinh viên bước vào năm học mới. \r\n😱Giảm kịch sàn áp dụng tất cả các hệ thống phòng. Chỉ từ 1tr5/ phòng.\r\n🏠Địa chỉ : 118/61B Bạch Đằng, phường 24, quận Bình Thạnh \r\n✅Tiện ích: Khu sinh viên, Family 24/24, gần ĐH Hutech, Tài Chính, Hồng bàng, GTVT\r\n_ Phòng ngủ máy lạnh siêu mát \r\n_ Giường, nệm sạch sẽ \r\n_ Đầy đủ dụng cụ nấu ăn , bếp điện\r\n_ Nước uống nóng lạnh free \r\n_ Khu bếp nấu ăn sạch sẽ\r\n_ Bao chỗ để xe \r\n_ Camera an ninh \r\n_ Cửa Vân Tay\r\n_ Máy Lạnh 24/24\r\n🔴 Giờ giấc tự do, khu vực an ninh tốt','2023-08-31 15:25:01','2023-08-31 15:25:01',0,'giam-kich-san-ap-dung-tat-ca-cac-he-thong-phong-chi-tu-1tr5-phong',16),(30,'Phòng trọ SuviHem giá từ 3 triệu','Tiện nghi:\r\n-Internet tốc độ miễn phí (WiFi)\r\n-Cho phép vật nuôi ( Cho phép chó / vật nuôi )\r\n-Khu để hành lý\r\n-Khách sạn không hút thuốc\r\n-Phòng bếp chung\r\n-Tiếp tân 24 giờ\r\n-Dịch vụ giặt là\r\nTiện nghi trong phòng:\r\n-Điều hòa nhiệt độ','2023-09-02 11:59:48','2023-09-02 11:59:48',0,'phong-tro-suvihem-gia-tu-3-trieu',16),(31,'nhà trọ đức trọng  nhà trọ đức trọng hhehe ','nhà trọ đức trọng \nnhà trọ đức trọng \nnhà trọ đức trọng \nnhà trọ đức trọng ','2023-09-02 22:11:12','2023-09-02 22:11:12',0,'nha-tro-uc-trong-nha-tro-uc-trong-hhehe',29),(32,'Ra mắt nhà trọ sinh viên giá cả hợp lý','_Nội thất trong phòng bao gồm.\n\n- Tivi treo tường 32in\n\n- Tủ Lạnh,\n\n- Giường, nệm 1m6 x2m\n\n- tủ quần áo\n\n- Máy Lạnh\n\n- Máy Giặt\n\n- Bếp nấu ăn\n\n- Bàn ghế làm việc\n\n_Ngoài ra còn có các tiện ích xung quanh.\n\n_wifi Tốc độ cao, cáp tivi 100 kênh HD.\n\n_Máy Giặt...\n\n_Giờ giấc đi lại tự do. Không chung chủ rất thoải mái.\n\n_ Đặc biệt xe để Miễn phí trong nhà rất an toàn, với hệ thống camera giám sat 24/24.Bảo mật bằng vân tay.','2023-09-03 16:23:36','2023-09-03 16:23:36',0,'ra-mat-nha-tro-sinh-vien-gia-ca-hop-ly',41),(34,'tést tést tést tést tést tést ','tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést tést ','2023-09-07 11:53:20','2023-09-12 13:22:56',1,'test-test-test-test-test-test',41),(37,'Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình','Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình có máy lạnh, chổ giữ xe','2023-09-07 11:27:06','2023-09-07 11:27:06',0,'tim-nha-tro-o-thanh-pho-ha-noi-quan-ba-inh',21),(38,'Tìm nhà trọ khu vực quận ba đình, hà nội','Em là sinh viên năm nhất cần kiếm nhà trọ khu vực ba đình hà nội có máy lạnh, chổ giữ xe an toàn','2023-09-07 12:08:12','2023-09-07 12:08:12',0,'tim-nha-tro-khu-vuc-quan-ba-inh-ha-noi',43),(39,'Giảm giá lớn cho sinh viên liên hệ từ ngày 10/9/2023 đến ngày 15/9/2023','Giảm giá lớn cho sinh viên liên hệ từ ngày 10/9/2023 đến ngày 15/9/2023\nGiảm giá lớn cho sinh viên liên hệ từ ngày 10/9/2023 đến ngày 15/9/2023','2023-09-10 01:30:56','2023-09-10 01:30:56',0,'giam-gia-lon-cho-sinh-vien-lien-he-tu-ngay-10-9-2023-en-ngay-15-9-2023',16),(40,'Cần tìm nhà trọ ở Đắk Nông giá cả hợp lý','Cần phòng cho ít nhất 2 người trở lên, tiện ích đầy đủ, có wifi, máy lạnh.','2023-09-12 12:18:10','2023-09-12 12:18:10',0,'can-tim-nha-tro-o-ak-nong-gia-ca-hop-ly',21),(41,'Nhà trọ kelvin tuấn minh mới khai trương','Nhà trọ kelvin tuấn minh rất vui lòng đón tiếp các sinh viên hoặc người có nhu cầu mướn trọ.\nNhà trọ bao gồm nhiều tiện ích như:\n- wifi\n- máy lạnh\n- bao điện nước\n- có chổ giữ xe an toàn','2023-09-12 12:29:01','2023-09-12 12:29:01',0,'nha-tro-kelvin-tuan-minh-moi-khai-truong',61);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_find_detail`
--

DROP TABLE IF EXISTS `post_find_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_find_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `min_price` double DEFAULT NULL,
  `max_price` double DEFAULT NULL,
  `post_id` int NOT NULL,
  `location_longitude` varchar(45) NOT NULL,
  `location_latitude` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_find_detail_1_idx` (`post_id`),
  CONSTRAINT `fk_post_find_detail_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_find_detail`
--

LOCK TABLES `post_find_detail` WRITE;
/*!40000 ALTER TABLE `post_find_detail` DISABLE KEYS */;
INSERT INTO `post_find_detail` VALUES (1,'Tân Thới Nhất 8, Tân Thới Nhất, Quận 12, Hồ Chí Minh',0,3000000,19,'106.61093',10.8295),(3,'Phúc Xá, Ba Đình, Hà Nội',2000000,4000000,37,'105.849945',21.0444),(4,'Quận Ba Đình, Hà Nội',0,3000000,38,'105.81452',21.034),(5,'Đắk Nông, Việt Nam',100000,7000000,40,'107.696144',12.0019);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_rent_detail`
--

LOCK TABLES `post_rent_detail` WRITE;
/*!40000 ALTER TABLE `post_rent_detail` DISABLE KEYS */;
INSERT INTO `post_rent_detail` VALUES (8,3000000.00,25,1,3,1,1,49,8),(17,3000000.00,45,1,10,3,1,49,25),(18,1299000.00,30,1,5,1,1,50,26),(19,1200000.00,25,1,3,1,1,51,27),(20,5000000.00,40,1,5,2,1,52,28),(21,1500000.00,30,1,6,2,2,53,29),(22,3000000.00,25,1,3,1,1,54,30),(23,2000000.00,25,1,2,1,1,60,31),(24,3400000.00,25,2,3,2,1,61,32),(25,3000000.00,25,1,3,1,1,61,34),(26,4000000.00,50,1,6,3,2,52,39),(27,5000000.00,35,1,4,3,1,62,41);
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
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$10$XRitZf0XqYI1aF.sYqMcsOYS/bwFDL7K4oW4SHPGLv5l1fHVByUx.','Admin','admin@gmail.com','1234567890','OTHER','2023-06-02 00:00:00','2023-08-08 00:00:00','2023-08-24 11:55:44','ADMIN','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/xxzugrejvq0hgtan1v8t',0,'PENDING',0),(16,'Dung','$2a$10$1TBFKLp76CuHPG5ArwnlQ.TuKyA1tqrF7AZFW2lwUtSzI6t2A2pW2','Trần Ngọc Dung','Dung@gmail.com','1234567890987','FEMALE','2023-08-01 00:00:00','2023-08-11 00:00:00','2023-09-10 01:29:16','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/uclxeg8j2owjkvx0noqj',0,'ACCEPTED',0),(21,'hoanganh1234','$2a$10$/WO09AXGrqg/ui8xUsIpW.fGW9VOg48a2ZErPp8fqa282QcoWKcn2','Hoàng Ánh','hoanganh@gmail.com','654345676543','MALE','2022-10-02 00:00:00','2023-08-19 00:00:00','2023-08-27 23:56:50','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/zq0woxqa1pzx6xx2xqoa',0,'ACCEPTED',0),(22,'ngan0206','$2a$10$YTPjp3rFsmS5ga0xxVDOfepCC0TWpqH6G.JV4y2ex2dsrv/8LRxeW','Nguyễn Kim Bảo Ngân','ngannguyeny0206@gmail.com','12345678902131','FEMALE','2002-06-02 00:00:00','2023-08-25 00:00:00','2023-08-27 21:02:25','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/iqzbc5dturx5ccb8bs3b',0,'ACCEPTED',0),(23,'lananh86','$2a$10$rbPmwGulWLixDnBO54lvIeq2O9bD41nkVpJEVn.ySQVkIS4xbt5da','Hoàng Thị Ánh Lan','LanAnh@gmail.com','1234567890','FEMALE','1986-05-05 00:00:00','2023-08-31 14:22:25','2023-08-31 14:22:25','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/y9ywiqnqt5tvgtuhlesr',0,'ACCEPTED',0),(29,'minhtrieu','$2a$10$0vvGyHVqHEB2T3BdRx/6aujQSIbGpyB7/LiGanAm5XTbHgob7nDVO','Minh Triệu','minhtrieu@gmail.com','09876543234567','MALE','2011-02-02 00:00:00','2023-09-02 00:00:00','2023-09-08 12:53:09','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/j4jid7kissc1sk5zjohp',0,'ACCEPTED',0),(41,'nguyenyen','$2a$10$zv/ls/P6XaTL02IpK0Hpwej4nKtYZmcleorrC0/x49fdiiXlf.7SW','Nguyễn Yên','yen@gmail.com','567890123456','MALE','2002-12-11 00:00:00','2023-09-03 00:00:00','2023-09-04 16:27:41','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/rg3qdffgzykcwhffemrl',0,'ACCEPTED',0),(43,'kimanh','$2a$10$0HC1gfUmv3bSynUTbzWJ0uXHeE8dOSZtXsRH0pKb7wljxGGKSVXhG','Kim Anh','kimanh@gmail.com','6789054321','MALE','2002-02-02 00:00:00','2023-09-07 12:06:26','2023-09-07 12:06:26','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/zqf6qvjm7cxj7qzakv6m',0,'ACCEPTED',0),(47,'ngannguyenne','$2a$10$oSzWIku/FUELdUWBBmRBSOftixgtxAosLrd6NS9NXkb8txwcWCQtm','Nguyễn Kim Bảo Ngân','yuu.mmd02@gmail.com','456789098765','FEMALE','2002-06-02 00:00:00','2023-09-09 23:17:43','2023-09-10 01:00:42','TENANT','https://res.cloudinary.com/dzba4fewa/raw/upload/v1694276257/agiqikfuxmiabwlbeglp',1,'ACCEPTED',0),(54,'TESTNETROI','$2a$10$ZW4J1Vou3kMNC/kzkPsX6eRLW9H210mxlJXNQeh985WHDYyOf/83K','tôi nè ngân','ngannguyeny0202@gmail.com','123456789048','FEMALE','2002-05-06 00:00:00','2023-09-09 23:59:13','2023-09-10 00:13:57','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/v1694278751/f29kjyl9ueaums3dwkbb.jpg',1,'ACCEPTED',0),(58,'okok','$2a$10$8E7Lk8ffaAv6HHqjZ3td5eo.AsFmOSSUw.UeiLC.qP33XxCv8zMym','okok','2051052087ngan@ou.edu.vn','898989890090','FEMALE','2023-08-31 00:00:00','2023-09-10 00:43:25','2023-09-10 00:43:25','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/v1694281404/lovdx0mq46sisgxxzhm5.jpg',0,'ACCEPTED',0),(59,'timtro123','$2a$10$I6crcCPbsUjgz5TOpumrfePume2zpfErgYtoDCE3QZSgY5bt/BLyW','Nguyễn Kim Bảo Ngân','ngannguyeny0202@gmail.com','123412341234','MALE','2023-09-05 00:00:00','2023-09-10 23:22:43','2023-09-10 23:22:43','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/v1694362962/eamqpnicnvwjsbxkgy3t.jpg',0,'ACCEPTED',0),(60,'minhthuanne','$2a$10$ZhsFfzTlNoDge5dySeRL6OnKfoQHcAbAxQhXuTVi2MZCR95x32Voa','Trần Minh Thuận','vophuphat.14112002@gmail.com','123412340987','MALE','2002-02-02 00:00:00','2023-09-12 12:20:26','2023-09-12 12:20:26','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/v1694496025/ob7syz9fkbwjeltd2cbf.jpg',0,'ACCEPTED',0),(61,'kelvintuanminh','$2a$10$VOP/uTb/.gTQkjyjvuvfnOHaZnhOIociKPX0CWlYc1e4NfuvUUiXC','Võ Tuấn Minh','vophuphat.14112002@gmail.com','0987654321655','FEMALE','1999-02-02 07:00:00','2023-09-12 12:29:00','2023-09-12 12:29:00','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/u7j6cmt9pmnukmvsmxvp',0,'PENDING',0);
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

-- Dump completed on 2023-09-12 13:29:36
