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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'test','2023-09-01 00:04:11',29,21),(2,'toi thu','2023-09-01 00:05:34',29,21),(3,'ok','2023-09-01 00:11:08',29,21),(4,'thu khong','2023-09-01 00:13:14',29,21),(5,'nhu nay duoc khong','2023-09-01 00:15:40',29,21);
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (45,'https://res.cloudinary.com/dzba4fewa/image/upload/c9o9cwuv2g2nfpeb2vzh',8),(46,'https://res.cloudinary.com/dzba4fewa/image/upload/mxeaiffbn81qfpw47ymr',8),(47,'https://res.cloudinary.com/dzba4fewa/image/upload/wcfekls3amvfsqfggvfw',8),(73,'https://res.cloudinary.com/dzba4fewa/image/upload/la7avhhjbfqoxo2d3jk1',19),(78,'https://res.cloudinary.com/dzba4fewa/image/upload/vmjqblylo13vqufqemre',25),(79,'https://res.cloudinary.com/dzba4fewa/image/upload/qihbuuqu063o8zhodbnq',25),(80,'https://res.cloudinary.com/dzba4fewa/image/upload/qdp1sw8huzepcekdeugi',25),(81,'https://res.cloudinary.com/dzba4fewa/image/upload/glvztrwjqnqlm1k6hwpo',26),(82,'https://res.cloudinary.com/dzba4fewa/image/upload/flkhybpjooadllxs2ipz',26),(83,'https://res.cloudinary.com/dzba4fewa/image/upload/zxfmndksuimglwl6n95d',26),(84,'https://res.cloudinary.com/dzba4fewa/image/upload/cvlsswipoufkywr6jt2x',26),(85,'https://res.cloudinary.com/dzba4fewa/image/upload/qtfx1e4de3msdyrwmfr7',26),(86,'https://res.cloudinary.com/dzba4fewa/image/upload/rbk0qrvthasfaref2tvk',27),(87,'https://res.cloudinary.com/dzba4fewa/image/upload/n90yllbkruxuawnp0ib2',27),(88,'https://res.cloudinary.com/dzba4fewa/image/upload/jxf8gdfa0oxmdhqtvs4l',27),(89,'https://res.cloudinary.com/dzba4fewa/image/upload/ts2jpiby2wh3althuyqd',28),(90,'https://res.cloudinary.com/dzba4fewa/image/upload/zneb7tt76d9f2qbksmur',28),(91,'https://res.cloudinary.com/dzba4fewa/image/upload/szp883h48izsvm2c8fak',28),(92,'https://res.cloudinary.com/dzba4fewa/image/upload/egrxenosblxnkcwuu4j4',29),(93,'https://res.cloudinary.com/dzba4fewa/image/upload/vdd2akuu0ugamovbgc4d',29),(94,'https://res.cloudinary.com/dzba4fewa/image/upload/ru0wdle4a2zorsh1gbww',29),(95,'https://res.cloudinary.com/dzba4fewa/image/upload/iemooafr9keansjansie',29);
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motel`
--

LOCK TABLES `motel` WRITE;
/*!40000 ALTER TABLE `motel` DISABLE KEYS */;
INSERT INTO `motel` VALUES (49,'Nhà trọ SẠCH SẼ 449/17','449/17 Trường Chinh, phường 14, Tân Bình, Hồ Chí Minh',16,NULL,'2023-08-27 21:41:57','nha-tro-sach-se-449-17-truong-chinh',0,'0987654321',106.633,10.8141,'ACCEPTED'),(50,'Kí túc xá Đại học Công Nghiệp 4','60 Huỳnh Khương An, Phường 5, Gò Vấp, Hồ Chí Minh',23,'2023-08-31 14:26:09','2023-08-31 14:26:09','ki-tuc-xa-ai-hoc-cong-nghiep-4',0,'0927131212',106.689,10.823,'ACCEPTED'),(51,'Ký túc xá Phú Nhuận - Sleepbox Nữ - Phan Xích Long','181 Phan Đăng Lưu, Phường 1, Phú Nhuận, Hồ Chí Minh',23,'2023-08-31 15:13:05','2023-08-31 15:13:05','ky-tuc-xa-phu-nhuan-sleepbox-nu-phan-xich-long',0,'3467865432',106.681,10.8001,'ACCEPTED'),(52,' Hệ Thống Căn Hộ Cao Cấp Tại Quận 7 - Nhà Bè ','hẻm 52, Tân Quy, Quận 7, Hồ Chí Minh',16,NULL,'2023-08-31 15:31:09','he-thong-can-ho-cao-cap-tai-quan-7-nha-be',0,'1234567890',106.708,10.7411,'ACCEPTED'),(53,'Dorm KTX cao cấp','118/61B Bạch Đằng, Phường 24, Bình Thạnh, Hồ Chí Minh',16,NULL,'2023-08-31 15:31:15','dorm-ktx-cao-cap',0,'9690854374',106.707,10.8044,'ACCEPTED');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,'Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','Nhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.\r\nNhà trọ SẠCH SẼ 449/17 Trường Chinh cho thuê giá rẻ bao điện nước.','2023-08-25 15:50:42','2023-08-25 15:50:42',0,'nha-tro-sach-se-449-17-truong-chinh-cho-thue-gia-re-bao-ien-nuoc',16),(19,'Tìm nhà trọ dành cho sinh viên khu vực quận 12','Em cần tìm nhà trọ giá sinh viên gần trong khu vực quận 12 ngay gần Tân Thới Nhất 8 để tiện đường đi học ạ.','2023-08-27 13:01:06','2023-08-27 13:01:06',0,'tim-nha-tro-danh-cho-sinh-vien-khu-vuc-quan-12',22),(25,'Cho thuê phòng mới xây tại 449/17 Trường Chinh P14 Q Tân Bình giá từ 3tr/th','Địa chỉ 449/17, Đường Trường Chinh, Phường 14, Quận Tân Bình, Tp Hồ Chí Minh\r\n\r\nDTSD 20m2 - 45m2\r\n\r\nPhòng trọ Tân Bình mới xây 100%. Gác cao 2m không đụng đầu. Đầy đủ tiện ích: Giặt sấy, tạp hóa,...\r\n\r\nngay khu dân cư an ninh, yên tĩnh, dân trí cao..\r\n\r\nvị trí đắc địa ngay trung tâm hành chính Q Tân Bình... Ngay trục đường chính rất thuận tiện giao thông,.....\r\n\r\nGần chợ, trường học, siêu thị, bệnh viện, công viên, cửa hàng tiện lợi, giao thông công cộng, ngân hàng, ATM, quán xá,...\r\n\r\nGiá thuê mùa dịch từ 3tr/th\r\n\r\nLH Chính chủ MS Ánh 0838676545','2023-08-29 09:35:59','2023-08-29 09:35:59',0,'cho-thue-phong-moi-xay-tai-449-17-truong-chinh-p14-q-tan-binh-gia-tu-3tr-th',16),(26,'KTX Đại Học Công Nghiệp 4 Gò Vấp free điện nước chỉ 1tr3','Địa chỉ: 60/18A Huỳnh Khương An, p. 15,\r\n\r\nGò Vấp.\r\n\r\nKhông gian rộng, có cửa sổ.\r\n\r\nTrang bị giường, nệm và drap mới.\r\n\r\nMáy lạnh.\r\n\r\nNhà vệ sinh riêng.\r\n\r\nCó bếp nấu ăn riêng trong phòng.\r\n\r\nWifi nhanh như máy bay.\r\n\r\nTrang bị máy giặt và nơi phơi đồ.\r\n\r\nKhông gian đảm bảo luôn được vệ sinh sạch sẽ.\r\n\r\nThang máy tiện lên xuống, camera an ninh, bảo vệ 24/7.\r\n\r\nĐảm bảo điều kiện sống cho bạn một cách tốt nhất.\r\n\r\nPhòng 6 giường.\r\n\r\nGiá: 1tr3/người phòng thường.\r\n\r\n1tr5/người phòng máy lạnh.\r\n\r\nCó cho thuê phòng riêng.','2023-08-31 14:26:21','2023-08-31 14:26:21',0,'ktx-ai-hoc-cong-nghiep-4-go-vap-free-ien-nuoc-chi-1tr3',23),(27,'✨ ✨ ✨ Sleepbox - KTX NỮ Bình Thạnh cách DH Văn Lang 500m','🌈🌈🌈Kí túc xá - sleepbox dành cho NỮ, cách chợ Bà Chiểu 700m, Đại Học Văn Lang 500m - Trung tâm Bình Thạnh, Trường HUTECH. Và nhiều Trường Đại Học Khác.\r\n\r\n💫 CHỈ TỪ 1200k ✨\r\n\r\n🌟🌟\r\n(Giá đã bao gồm tất cả chi phí ).\r\n\r\nTiện ích: phòng được trang bị máy lạnh kèm máy quạt thông thoáng, máy giặt, wifi, khoá vân tay, camera an ninh,tủ lạnh...và rất nhiều nội thất khác....). Các trang thiết bị hiện đại. CÓ CHỖ ĐỂ XE MIỄN PHÍ.\r\n\r\nCó dịch vụ dọn vệ sinh hàng tuần.\r\n\r\n-----------------------------------------------\r\n🌇🌃 Cơ sở 1 : 69/31A Nơ trang long, p.11, q. Phú Nhuận.(cách chợ bà chiểu 700m, ĐH VĂN LANG 500M)\r\n-----------------------------------------------\r\n🌇🌃 Cơ sở 2 : 181/39 phan đăng lưu,P.1,Q.Phú Nhuận.(ra phan xích long 200m)\r\n-----------------------------------------------\r\n\r\n🌆Phòng Sleepbox Mới Toanh Cực Kì Riêng Tư Ngay Ngã Tư Lê Định - Nơ Trang Long (1km ra khu ăn uống sầm uất Phạm Văn Đồng , Phan Xích Lon).\r\n== 🥂 BẾP\r\n\r\nBếp rộng rãi đầy đủ đồ\r\nFull nội thất\r\nPhòng bếp, phòng ăn,sofa đầy đủ, sạch sẽ\r\n\r\n== ⛺ PHÒNG SINH HOẠT\r\n\r\nKhông gian riêng tư tách biệt sinh viên - người đi làm\r\nBàn làm việc rộng rãi ngay tại box\r\nCửa sổ, ban công thoáng mát, quạt máy, Máy lạnh 24/24(Máy inverter tiết kiệm điện).\r\n.\r\n🧞🧞🧞 liên hệ hotline hoặc zalo xem phòng trực tiếp inb zalo trc khi qua.\r\n\r\n🌝 Tin đăng chính chủ, xem nhà miễn phí, không qua giới. Giá gốc hoàn toàn. 🌝\r\n\r\n🌹 Cảm ơn các bạn đã xem tin🌹\r\n🍀🍀🍀','2023-08-31 15:13:12','2023-08-31 15:13:12',0,'sleepbox-ktx-nu-binh-thanh-cach-dh-van-lang-500m',23),(28,'🏢 Hệ Thống Căn Hộ Cao Cấp Tại Quận 7 - Nhà Bè 🏢','🔷Đa dạng các loại phòng từ không nội thất đến full nội thất\r\n🔷 Vị trí thuận tiện\r\n- Di chuyển đến các quận trung tâm thành phố hồ chí minh.\r\n- Có các dạng phòng phù hợp với nhu cầu trực tiếp của khách hàng!\r\n🔷 Đầy đủ nội thất _ mới chưa một lần sử dụng\r\n- Máy lạnh, tủ lạnh, máy nước nóng lạnh;\r\n- Giường, nệm, rèm cửa;\r\n- Kệ bếp, tủ bếp, tủ đồ, bếp điện, bàn làm việc.\r\n- Vòi tắm hoa sen, gương tắm, lavabo, thanh treo đồ inox;\r\n🔷 Căn hộ có cửa sổ và ban công thoáng mát\r\n🔷 Dịch vụ miễn phí\r\n• Hệ thống PCCC\r\n• Hệ thống khóa vân tay thông minh\r\n• Camera an ninh 24/7\r\n• Vệ sinh khu vực chung hàng tuần\r\n• Máy giặt và máy sấy free\r\n• Hồ bơi - Phòng Gym free\r\nGIÁ:\r\nDạng Studio: 5.000.000 - 9.000.000đ\r\nDuplex: 4.700.000-5.500.000-6.000.000-7.300.0000\r\n1 Phòng ngủ : 6.500.000 - 8.500.000\r\n2 Phòng ngủ: 8.000.000-11.000.000\r\n🎆🎆 Nhanh tay liên hệ để nhận thông tin, hình ảnh và xem phòng thực tế bạn nha!','2023-08-31 15:18:46','2023-08-31 15:18:46',0,'he-thong-can-ho-cao-cap-tai-quan-7-nha-be',16),(29,'Giảm kịch sàn áp dụng tất cả các hệ thống phòng. Chỉ từ 1tr5/ phòng.','Dorm KTX cao cấp\r\nTưng bừng chào đón tân sinh viên bước vào năm học mới. \r\n😱Giảm kịch sàn áp dụng tất cả các hệ thống phòng. Chỉ từ 1tr5/ phòng.\r\n🏠Địa chỉ : 118/61B Bạch Đằng, phường 24, quận Bình Thạnh \r\n✅Tiện ích: Khu sinh viên, Family 24/24, gần ĐH Hutech, Tài Chính, Hồng bàng, GTVT\r\n_ Phòng ngủ máy lạnh siêu mát \r\n_ Giường, nệm sạch sẽ \r\n_ Đầy đủ dụng cụ nấu ăn , bếp điện\r\n_ Nước uống nóng lạnh free \r\n_ Khu bếp nấu ăn sạch sẽ\r\n_ Bao chỗ để xe \r\n_ Camera an ninh \r\n_ Cửa Vân Tay\r\n_ Máy Lạnh 24/24\r\n🔴 Giờ giấc tự do, khu vực an ninh tốt','2023-08-31 15:25:01','2023-08-31 15:25:01',0,'giam-kich-san-ap-dung-tat-ca-cac-he-thong-phong-chi-tu-1tr5-phong',16);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_find_detail`
--

LOCK TABLES `post_find_detail` WRITE;
/*!40000 ALTER TABLE `post_find_detail` DISABLE KEYS */;
INSERT INTO `post_find_detail` VALUES (1,'Tân Thới Nhất 8, Tân Thới Nhất, Quận 12, Hồ Chí Minh',0,3000000,19,'106.61093',10.8295);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_rent_detail`
--

LOCK TABLES `post_rent_detail` WRITE;
/*!40000 ALTER TABLE `post_rent_detail` DISABLE KEYS */;
INSERT INTO `post_rent_detail` VALUES (8,3000000.00,25,1,3,1,1,49,8),(17,3000000.00,45,1,10,3,1,49,25),(18,1299000.00,30,1,5,1,1,50,26),(19,1200000.00,25,1,3,1,1,51,27),(20,5000000.00,40,1,5,2,1,52,28),(21,1500000.00,30,1,6,2,2,53,29);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$10$XRitZf0XqYI1aF.sYqMcsOYS/bwFDL7K4oW4SHPGLv5l1fHVByUx.','Admin','admin@gmail.com','1234567890','OTHER','2023-06-02 00:00:00','2023-08-08 00:00:00','2023-08-24 11:55:44','ADMIN','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/xxzugrejvq0hgtan1v8t',0,'PENDING',0),(16,'Dung','$2a$10$/4s.fbiI5mHwQdW1OZYMtuDHaWdP/PSEH4Yj/ZiISUrRS0Qm73qBO','Trần Ngọc Dung','Dung@gmail.com','1234567890987','FEMALE','2023-08-01 00:00:00','2023-08-11 00:00:00','2023-08-14 13:49:55','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/uclxeg8j2owjkvx0noqj',0,'ACCEPTED',0),(21,'hoanganh1234','$2a$10$/WO09AXGrqg/ui8xUsIpW.fGW9VOg48a2ZErPp8fqa282QcoWKcn2','Hoàng Ánh','hoanganh@gmail.com','654345676543','MALE','2022-10-02 00:00:00','2023-08-19 00:00:00','2023-08-27 23:56:50','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/zq0woxqa1pzx6xx2xqoa',0,'PENDING',0),(22,'ngan0206','$2a$10$YTPjp3rFsmS5ga0xxVDOfepCC0TWpqH6G.JV4y2ex2dsrv/8LRxeW','Nguyễn Kim Bảo Ngân','ngannguyeny0206@gmail.com','12345678902131','FEMALE','2002-06-02 00:00:00','2023-08-25 00:00:00','2023-08-27 21:02:25','TENANT','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/iqzbc5dturx5ccb8bs3b',0,'PENDING',0),(23,'lananh86','$2a$10$rbPmwGulWLixDnBO54lvIeq2O9bD41nkVpJEVn.ySQVkIS4xbt5da','Hoàng Thị Ánh Lan','LanAnh@gmail.com','1234567890','FEMALE','1986-05-05 00:00:00','2023-08-31 14:22:25','2023-08-31 14:22:25','LANDLORD','https://res.cloudinary.com/dzba4fewa/image/upload/c_fill,h_350,w_350/y9ywiqnqt5tvgtuhlesr',0,'ACCEPTED',0);
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

-- Dump completed on 2023-09-01 15:05:22
