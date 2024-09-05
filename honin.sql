-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: honin
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `canonymous`
--

DROP TABLE IF EXISTS `canonymous`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canonymous` (
  `canum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image` varchar(1000) DEFAULT NULL,
  `readcount` int DEFAULT NULL,
  `savefilename` varchar(1000) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`canum`),
  KEY `canonymous_f1_idx` (`writer`),
  CONSTRAINT `canonymous_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canonymous`
--

LOCK TABLES `canonymous` WRITE;
/*!40000 ALTER TABLE `canonymous` DISABLE KEYS */;
INSERT INTO `canonymous` VALUES (1,'최근 자취를 시작했는데, 혼자 있는 시간이 많아 외로움을 느낍니다. 어떻게 극복할 수 있을까요?',NULL,180,NULL,'자취 생활의 외로움 극복 방법','2024-09-02 10:43:14','오빛나리'),(2,'시험 기간이 다가오는데 집중이 잘 안 됩니다. 공부에 집중할 수 있는 팁이 있을까요?',NULL,160,NULL,'시험 공부 집중 팁','2024-09-02 10:42:14','송테무깡'),(3,'방 청소를 꾸준히 하기 어려워요. 좋은 습관을 기르는 방법이 있을까요?',NULL,150,NULL,'청소 습관 기르기','2024-09-02 10:41:14','박정빈'),(4,'친구와의 갈등 때문에 고민입니다. 어떻게 해결하면 좋을까요?',NULL,170,NULL,'친구와의 갈등 해결 방법','2024-09-02 10:40:14','조준서'),(5,'자취하면서 식비를 절약하고 싶은데, 좋은 방법이 있을까요?',NULL,200,NULL,'식비 절약 방법','2024-09-02 10:39:14','오수완'),(6,'자취방에서 벌레가 나와서 걱정입니다. 효과적인 방충 방법이 있을까요?',NULL,190,NULL,'자취방 방충 팁','2024-09-02 10:38:14','양용호'),(7,'학교 생활과 자취 생활을 균형 있게 할 수 있는 방법이 궁금합니다.',NULL,140,NULL,'학교와 자취 생활 균형 맞추기','2024-09-02 10:37:14','곽수아'),(8,'밤에 잠이 잘 오지 않아서 고민입니다. 수면의 질을 높이는 방법이 있을까요?',NULL,130,NULL,'수면의 질 향상 방법','2024-09-02 10:36:14','송버그'),(9,'자취하면서 친구를 사귀기가 어렵네요. 어떻게 하면 좋을까요?',NULL,175,NULL,'자취 생활에서 친구 사귀기','2024-09-02 10:35:14','박단비'),(10,'혼자 지내다 보니 건강 관리가 잘 안 됩니다. 자취생을 위한 건강 관리 팁이 있을까요?',NULL,185,NULL,'자취생 건강 관리 팁','2024-09-02 10:34:14','이정주'),(11,'자취 생활의 외로움을 극복하는 방법',NULL,190,NULL,'외로움 극복 방법','2024-09-02 09:44:14','조준서'),(12,'시험 기간 집중력을 높이는 팁',NULL,170,NULL,'시험 집중 팁','2024-09-02 04:44:14','박정빈'),(13,'청소 습관을 기르는 좋은 방법',NULL,160,NULL,'청소 습관','2024-09-01 22:44:14','이학바리'),(14,'갈등 해결을 위한 효과적인 방법',NULL,150,NULL,'갈등 해결','2024-09-01 14:44:14','송버그'),(15,'식비 절약의 다양한 방법',NULL,140,NULL,'식비 절약','2024-09-01 04:44:14','김민주'),(16,'방충 팁과 자취 생활',NULL,130,NULL,'방충 팁','2024-08-31 08:44:14','곽수아'),(17,'학교와 자취 생활의 균형 맞추기',NULL,120,NULL,'균형 맞추기','2024-08-30 02:44:14','곽수아'),(18,'수면 질 향상 방법',NULL,110,NULL,'수면 질 향상','2024-08-25 10:44:14','송버그'),(19,'자취 친구 사귀기 노하우',NULL,105,NULL,'친구 사귀기','2024-08-03 10:44:14','박정빈'),(20,'자취생 건강 관리 팁',NULL,100,NULL,'건강 관리','2023-09-02 10:44:14','이정주');
/*!40000 ALTER TABLE `canonymous` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canonymouslike`
--

DROP TABLE IF EXISTS `canonymouslike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canonymouslike` (
  `calnum` int NOT NULL AUTO_INCREMENT,
  `canum` int DEFAULT NULL,
  `likenick` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`calnum`),
  KEY `canonymouslike_f1_idx` (`likenick`),
  KEY `canonymouslike_f2_idx` (`canum`),
  CONSTRAINT `canonymouslike_f1` FOREIGN KEY (`likenick`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `canonymouslike_f2` FOREIGN KEY (`canum`) REFERENCES `canonymous` (`canum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canonymouslike`
--

LOCK TABLES `canonymouslike` WRITE;
/*!40000 ALTER TABLE `canonymouslike` DISABLE KEYS */;
INSERT INTO `canonymouslike` VALUES (1,1,'조준서'),(2,1,'오수완'),(3,1,'박정빈'),(4,2,'이학바리'),(5,3,'박단비');
/*!40000 ALTER TABLE `canonymouslike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canonymousreply`
--

DROP TABLE IF EXISTS `canonymousreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canonymousreply` (
  `replynum` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `canum` int DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`replynum`),
  KEY `canonymousreply_f1_idx` (`writer`),
  KEY `canonymousreply_f2_idx` (`canum`),
  CONSTRAINT `canonymousreply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `canonymousreply_f2` FOREIGN KEY (`canum`) REFERENCES `canonymous` (`canum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canonymousreply`
--

LOCK TABLES `canonymousreply` WRITE;
/*!40000 ALTER TABLE `canonymousreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `canonymousreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `canonymousview`
--

DROP TABLE IF EXISTS `canonymousview`;
/*!50001 DROP VIEW IF EXISTS `canonymousview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `canonymousview` AS SELECT 
 1 AS `postnum`,
 1 AS `postcontent`,
 1 AS `image`,
 1 AS `readcount`,
 1 AS `savefilename`,
 1 AS `posttitle`,
 1 AS `postwritedate`,
 1 AS `postwriter`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `tablename`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cfree`
--

DROP TABLE IF EXISTS `cfree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfree` (
  `cfnum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image` varchar(1000) DEFAULT NULL,
  `readcount` int DEFAULT NULL,
  `savefilename` varchar(1000) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cfnum`),
  KEY `cfree_f1_idx` (`writer`),
  CONSTRAINT `cfree_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfree`
--

LOCK TABLES `cfree` WRITE;
/*!40000 ALTER TABLE `cfree` DISABLE KEYS */;
INSERT INTO `cfree` VALUES (1,'6월 실화냐ㄹㅇ 누가 훔쳐감?','6th.png',152,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/6th.png','벌써 6월 실화냐 5월 돌려줘요','2024-05-14 15:00:00','양용호'),(2,'ㅅㅂ개갈구던 선임 면상나오더라','bearmy.webp',263,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/bearmy.webp','재입대하는 꿈 꿨다 질문안받는다','2024-08-20 15:00:00','이정주'),(3,'이사업체 추천 <양용호 이사>라고 든든하고 듬직하더라 근데 업체추천 게시판은 뭐냐?','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/movebox.jpg',331,'movebox.jpg','이사업체 추천 받냐?','2024-03-10 15:00:00','곽수아'),(4,'나머지 나이는 뒷마당에 두고옴ㅇㅇ','myage.jpg',278,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myage.jpg','용호는 10짤','2024-08-08 15:00:00','이학바리'),(5,'이미 늦었삼ㅋ','toolate.jpeg',84,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/toolate.jpeg','여태까지 살아온 인생이 후회될때 있냐?','2022-10-04 15:00:00','송테무깡'),(6,'짤로 내용 대체','thanksfreinds.jpeg',112,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/thanksfreinds.jpeg','길가다 급똥마려웠던 썰','2024-01-27 15:00:00','오빛나리'),(7,'다 읽었니? 자 이제 할일을 하자','whatthe.jpg',198,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/whatthe.jpg','다들 힘내 좋아를 거꾸로 읽어보자','2024-02-02 15:00:00','박정빈'),(8,'상체 쉬었더니 점심 닭가슴살 빼먹은 기분이다','helchang.jpeg',46,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/helchang.jpeg','헬스 2주차인데 이런 기분 드는거 정상임?','2024-08-16 15:00:00','조준서'),(9,'응 오늘의 집','myhouse2.avif',300,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myhouse2.avif','이런 집은 어디서 구하냐','2024-07-13 15:00:00','오수완'),(10,'어떻게 생각해?','myiq.jpg',212,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myiq.jpg','나 요즘 ㄹㅇ 지능 문제 있는거같다','2024-05-29 15:00:00','양용호'),(11,'난 우선 맛있음ㅇㅇ','mymeal.webp',189,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/mymeal.webp','오늘 식단 어떰','2024-07-19 15:00:00','곽수아'),(12,'예쁘지 않음?','food.jpeg',375,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/food.jpeg','컨셉사진 찍어봤어','2024-04-15 15:00:00','송버그'),(13,'트럭 하나로 운전해서 옴','move3.jpg',158,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/move3.jpg','방금 이사왔습니다 인사 오지게 박습니다','2024-06-20 15:00:00','이학바리'),(14,'자꾸 옆집 여자가 잼얘해달라는데 이거 무슨 뜻이냐','funnystory2.jpeg',68,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/funnystory2.jpeg','잼얘 없냐?','2024-08-08 15:00:00','오빛나리'),(15,'ㅇㅇ?','whereismymoney.jpg',343,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/whereismymoney.jpg','내 나이 서른 500원 모았습니다 결혼 가능할까요?','2024-08-10 15:00:00','박정빈');
/*!40000 ALTER TABLE `cfree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfreelike`
--

DROP TABLE IF EXISTS `cfreelike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfreelike` (
  `cflnum` int NOT NULL AUTO_INCREMENT,
  `cfnum` int DEFAULT NULL,
  `likenick` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cflnum`),
  KEY `cfreelike_f1_idx` (`likenick`),
  KEY `cfreelike_f2_idx` (`cfnum`),
  CONSTRAINT `cfreelike_f1` FOREIGN KEY (`likenick`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cfreelike_f2` FOREIGN KEY (`cfnum`) REFERENCES `cfree` (`cfnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfreelike`
--

LOCK TABLES `cfreelike` WRITE;
/*!40000 ALTER TABLE `cfreelike` DISABLE KEYS */;
INSERT INTO `cfreelike` VALUES (1,1,'오수완'),(2,1,'오빛나리'),(3,1,'오빛나리'),(4,1,'조준서'),(5,1,'이학바리'),(6,2,'곽수아'),(7,2,'김민주'),(8,3,'이대승');
/*!40000 ALTER TABLE `cfreelike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfreereply`
--

DROP TABLE IF EXISTS `cfreereply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfreereply` (
  `cfrnum` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `cfnum` int DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cfrnum`),
  KEY `cfreereply_f1_idx` (`writer`),
  KEY `cfreereply_f2_idx` (`cfnum`),
  CONSTRAINT `cfreereply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cfreereply_f2` FOREIGN KEY (`cfnum`) REFERENCES `cfree` (`cfnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfreereply`
--

LOCK TABLES `cfreereply` WRITE;
/*!40000 ALTER TABLE `cfreereply` DISABLE KEYS */;
INSERT INTO `cfreereply` VALUES (1,'This is a comment 1',1,'2024-09-02 10:44:14','조준서'),(2,'This is a comment 2',2,'2024-09-02 10:44:14','오수완'),(3,'This is a comment 3',3,'2024-09-02 10:44:14','오빛나리'),(4,'This is a comment 4',4,'2024-09-02 10:44:14','양용호'),(5,'This is a comment 5',5,'2024-09-02 10:44:14','김민주'),(6,'This is a comment 6',6,'2024-09-02 10:44:14','곽수아'),(7,'This is a comment 7',7,'2024-09-02 10:44:14','이학바리'),(8,'This is a comment 8',8,'2024-09-02 10:44:14','송테무깡'),(9,'This is a comment 9',9,'2024-09-02 10:44:14','송버그'),(10,'This is a comment 10',10,'2024-09-02 10:44:14','송테무깡'),(11,'This is a comment 11',1,'2024-09-02 10:44:14','송테무깡'),(12,'This is a comment 12',2,'2024-09-02 10:44:14','김현재'),(13,'This is a comment 13',3,'2024-09-02 10:44:14','김현재'),(14,'This is a comment 14',4,'2024-09-02 10:44:14','송버그'),(15,'This is a comment 15',5,'2024-09-02 10:44:14','송테무깡'),(16,'This is a comment 16',6,'2024-09-02 10:44:14','이학바리'),(17,'This is a comment 17',7,'2024-09-02 10:44:14','박정빈'),(18,'This is a comment 18',8,'2024-09-02 10:44:14','이학바리'),(19,'This is a comment 19',9,'2024-09-02 10:44:14','박정빈'),(20,'This is a comment 20',10,'2024-09-02 10:44:14','이정주');
/*!40000 ALTER TABLE `cfreereply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `cfreeview`
--

DROP TABLE IF EXISTS `cfreeview`;
/*!50001 DROP VIEW IF EXISTS `cfreeview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cfreeview` AS SELECT 
 1 AS `postnum`,
 1 AS `postcontent`,
 1 AS `image`,
 1 AS `readcount`,
 1 AS `savefilename`,
 1 AS `posttitle`,
 1 AS `postwritedate`,
 1 AS `postwriter`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `tablename`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `chatmessage`
--

DROP TABLE IF EXISTS `chatmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatmessage` (
  `chatmessageid` bigint NOT NULL AUTO_INCREMENT,
  `chatroomid` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `isread` bit(1) NOT NULL,
  `message` varchar(255) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `sentat` datetime(6) NOT NULL,
  PRIMARY KEY (`chatmessageid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatmessage`
--

LOCK TABLES `chatmessage` WRITE;
/*!40000 ALTER TABLE `chatmessage` DISABLE KEYS */;
INSERT INTO `chatmessage` VALUES (1,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 19:44:27.847073'),(2,1,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/carrot.jpg',_binary '\0','','오빛나리','2024-09-02 19:47:05.614223'),(3,1,NULL,_binary '\0','ㅇㅇ','곽수아','2024-09-02 19:50:00.711797'),(4,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 19:50:09.159074'),(5,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 19:50:11.422940'),(6,1,NULL,_binary '\0','ㅇㅇ','곽수아','2024-09-02 19:50:13.511164'),(7,1,NULL,_binary '\0','좆밥','곽수아','2024-09-02 19:51:22.329410'),(8,1,NULL,_binary '\0','ㅋㅋ','곽수아','2024-09-02 20:11:42.690655'),(9,1,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/cherry.jpg',_binary '\0','','오빛나리','2024-09-02 20:29:13.827694'),(10,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 20:29:17.455049'),(11,1,NULL,_binary '\0','ㅇㅇ','곽수아','2024-09-02 20:29:28.277509'),(12,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 20:29:37.254179'),(13,1,NULL,_binary '\0','ㅇㅇ','곽수아','2024-09-02 20:29:39.870270'),(14,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 20:30:20.730747'),(15,1,NULL,_binary '\0','ㅇㅇ','오빛나리','2024-09-02 20:32:17.416369'),(16,1,NULL,_binary '\0','ㅋㅋ','오빛나리','2024-09-02 20:32:19.432327'),(17,1,NULL,_binary '\0','ㅇㅇ','곽수아','2024-09-02 20:32:33.599869'),(18,1,NULL,_binary '\0','ㅋㅋ병신','곽수아','2024-09-02 20:32:35.632943'),(19,1,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/cherry.jpg',_binary '\0','','곽수아','2024-09-02 20:32:45.170534'),(20,7,NULL,_binary '\0','dd','김태희','2024-09-03 17:55:51.162132');
/*!40000 ALTER TABLE `chatmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `chatroomid` bigint NOT NULL AUTO_INCREMENT,
  `createdat` datetime(6) NOT NULL,
  `lastmessageat` datetime(6) DEFAULT NULL,
  `buyernickname` varchar(50) NOT NULL,
  `sellernickname` varchar(50) NOT NULL,
  `snum` int NOT NULL,
  PRIMARY KEY (`chatroomid`),
  KEY `FKdp697d5o0nwteu40nuppknoyp` (`buyernickname`),
  KEY `FKk6ppmrm3umig2xfcxoo3xigqq` (`sellernickname`),
  KEY `FK94j6vo3w5jlpq90fa5p2kpg7j` (`snum`),
  CONSTRAINT `FK94j6vo3w5jlpq90fa5p2kpg7j` FOREIGN KEY (`snum`) REFERENCES `secondhand` (`snum`),
  CONSTRAINT `FKdp697d5o0nwteu40nuppknoyp` FOREIGN KEY (`buyernickname`) REFERENCES `member` (`nickname`),
  CONSTRAINT `FKk6ppmrm3umig2xfcxoo3xigqq` FOREIGN KEY (`sellernickname`) REFERENCES `member` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
INSERT INTO `chatroom` VALUES (1,'2024-09-02 19:44:26.351212',NULL,'오빛나리','곽수아',20),(5,'2024-09-03 14:11:35.209997',NULL,'오빛나리','오수완',18),(6,'2024-09-03 15:33:39.809970',NULL,'김태희','오빛나리',21),(7,'2024-09-03 17:55:39.993934',NULL,'김태희','곽수아',20);
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crecommended`
--

DROP TABLE IF EXISTS `crecommended`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crecommended` (
  `crnum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image` varchar(1000) DEFAULT NULL,
  `readcount` int DEFAULT NULL,
  `savefilename` varchar(1000) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`crnum`),
  KEY `crecommended_f1_idx` (`writer`),
  CONSTRAINT `crecommended_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crecommended`
--

LOCK TABLES `crecommended` WRITE;
/*!40000 ALTER TABLE `crecommended` DISABLE KEYS */;
INSERT INTO `crecommended` VALUES (1,'서울에서 저렴하고 친절한 이삿짐 센터 추천합니다. 최근 이용했는데 서비스가 훌륭했습니다.',NULL,150,NULL,'서울 이삿짐 센터 추천','2024-09-02 10:43:14','오수완'),(2,'자취생들을 위한 가성비 좋은 청소 업체를 소개합니다. 청소 품질이 매우 좋았습니다.',NULL,120,NULL,'가성비 좋은 청소 업체','2024-09-02 10:42:14','이학바리'),(3,'원룸 수리할 때 이용할 만한 수리 업체를 찾았습니다. 친절하고 가격도 합리적입니다.',NULL,130,NULL,'원룸 수리 업체 추천','2024-09-02 10:41:14','이정주'),(4,'이사를 도와주는 작은 이삿짐 센터를 찾고 계신다면 여기를 추천합니다. 서비스가 좋습니다.',NULL,140,NULL,'작은 이삿짐 센터 추천','2024-09-02 10:40:14','박정빈'),(5,'자취방 청소할 때 이용하기 좋은 청소 업체를 추천합니다. 매우 청결하게 해줍니다.',NULL,110,NULL,'자취방 청소 업체 추천','2024-09-02 10:39:14','김태희'),(6,'이사할 때 필요한 모든 것을 제공해주는 종합 이삿짐 센터를 소개합니다. 아주 편리했습니다.',NULL,160,NULL,'종합 이삿짐 센터 추천','2024-09-02 10:38:14','곽수아'),(7,'자취생에게 필요한 간단한 수리 서비스를 제공하는 회사를 추천합니다. 가격도 착합니다.',NULL,125,NULL,'간단한 수리 서비스 추천','2024-09-02 10:37:14','이대승'),(8,'이사 후 청소가 필요할 때 이용할 수 있는 청소 업체를 추천합니다. 서비스가 빠르고 좋습니다.',NULL,135,NULL,'이사 후 청소 업체','2024-09-02 10:36:14','박단비'),(9,'이사 비용 절감을 원하시면 이 업체를 추천합니다. 합리적인 가격에 서비스를 제공합니다.',NULL,145,NULL,'이사 비용 절감 업체','2024-09-02 10:35:14','김민주'),(10,'전문적이고 신뢰할 수 있는 수리 업체를 찾고 계신다면 여기를 추천합니다. 매우 만족스러웠습니다.',NULL,155,NULL,'전문 수리 업체 추천','2024-09-02 10:34:14','김민주'),(11,'서울의 추천 이삿짐 센터',NULL,165,NULL,'서울 이삿짐 센터','2024-09-02 09:44:14','김민주'),(12,'자취방 청소를 도와주는 훌륭한 업체',NULL,175,NULL,'자취방 청소 업체','2024-09-02 04:44:14','송테무깡'),(13,'원룸 수리의 좋은 업체 추천',NULL,185,NULL,'원룸 수리 업체','2024-09-01 22:44:14','송버그'),(14,'작은 이삿짐 센터의 장점',NULL,195,NULL,'작은 이삿짐 센터','2024-09-01 14:44:14','이학바리'),(15,'자취방 청소를 완벽하게 해주는 업체',NULL,205,NULL,'청소 업체','2024-09-01 04:44:14','이정주'),(16,'모든 이사를 지원해주는 종합 이삿짐 센터',NULL,215,NULL,'종합 이삿짐 센터','2024-08-31 08:44:14','박정빈'),(17,'자취생을 위한 간단한 수리 서비스',NULL,225,NULL,'수리 서비스','2024-08-30 02:44:14','곽수아'),(18,'이사 후 청소의 중요성과 추천 업체',NULL,235,NULL,'이사 후 청소','2024-08-25 10:44:14','오수완'),(19,'이사 비용 절감을 위한 업체 추천',NULL,245,NULL,'이사 비용 절감','2024-08-03 10:44:14','박단비'),(20,'전문적인 수리 업체의 신뢰도',NULL,255,NULL,'전문 수리 업체','2023-09-02 10:44:14','조준서');
/*!40000 ALTER TABLE `crecommended` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crecommendedlike`
--

DROP TABLE IF EXISTS `crecommendedlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crecommendedlike` (
  `crlnum` int NOT NULL AUTO_INCREMENT,
  `crnum` int DEFAULT NULL,
  `likenick` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`crlnum`),
  KEY `crecommendedlike_f1_idx` (`likenick`),
  KEY `crecommendedlike_f2_idx` (`crnum`),
  CONSTRAINT `crecommendedlike_f1` FOREIGN KEY (`likenick`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `crecommendedlike_f2` FOREIGN KEY (`crnum`) REFERENCES `crecommended` (`crnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crecommendedlike`
--

LOCK TABLES `crecommendedlike` WRITE;
/*!40000 ALTER TABLE `crecommendedlike` DISABLE KEYS */;
INSERT INTO `crecommendedlike` VALUES (1,1,'조준서'),(2,1,'오수완'),(3,2,'박정빈'),(4,2,'김민주'),(5,3,'곽수아');
/*!40000 ALTER TABLE `crecommendedlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crecommendedreply`
--

DROP TABLE IF EXISTS `crecommendedreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crecommendedreply` (
  `replynum` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `crnum` int DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`replynum`),
  KEY `crecommendedreply_f1_idx` (`writer`),
  KEY `crecommendedreply_f2_idx` (`crnum`),
  CONSTRAINT `crecommendedreply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `crecommendedreply_f2` FOREIGN KEY (`crnum`) REFERENCES `crecommended` (`crnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crecommendedreply`
--

LOCK TABLES `crecommendedreply` WRITE;
/*!40000 ALTER TABLE `crecommendedreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `crecommendedreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `crecommendedview`
--

DROP TABLE IF EXISTS `crecommendedview`;
/*!50001 DROP VIEW IF EXISTS `crecommendedview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `crecommendedview` AS SELECT 
 1 AS `postnum`,
 1 AS `postcontent`,
 1 AS `image`,
 1 AS `readcount`,
 1 AS `savefilename`,
 1 AS `posttitle`,
 1 AS `postwritedate`,
 1 AS `postwriter`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `tablename`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ctip`
--

DROP TABLE IF EXISTS `ctip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctip` (
  `ctnum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image` varchar(1000) DEFAULT NULL,
  `readcount` int DEFAULT NULL,
  `savefilename` varchar(1000) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ctnum`),
  KEY `ctip_f1_idx` (`writer`),
  CONSTRAINT `ctip_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctip`
--

LOCK TABLES `ctip` WRITE;
/*!40000 ALTER TABLE `ctip` DISABLE KEYS */;
INSERT INTO `ctip` VALUES (1,'자취방에서 간단히 만들 수 있는 요리 레시피 모음',NULL,220,NULL,'자취 요리 레시피','2024-09-02 10:43:14','김태희'),(2,'저렴하게 방을 꾸미는 인테리어 팁',NULL,185,NULL,'저렴한 인테리어','2024-09-02 10:42:14','곽수아'),(3,'자취생을 위한 생활 필수품 리스트',NULL,150,NULL,'생활 필수품','2024-09-02 10:41:14','박정빈'),(4,'월세 절약하는 방법과 팁',NULL,210,NULL,'월세 절약 팁','2024-09-02 10:40:14','이정주'),(5,'자취생이 알아두면 좋은 청소 꿀팁',NULL,195,NULL,'청소 꿀팁','2024-09-02 10:39:14','이학바리'),(6,'혼자서 간단하게 할 수 있는 운동 방법',NULL,170,NULL,'간단한 운동법','2024-09-02 10:38:14','박단비'),(7,'자취생을 위한 빨래 효율적으로 하는 법',NULL,180,NULL,'효율적인 빨래법','2024-09-02 10:37:14','조준서'),(8,'혼자서 쉽게 수리할 수 있는 집안 수리 방법',NULL,165,NULL,'간단한 집안 수리','2024-09-02 10:36:14','송테무깡'),(9,'자취 생활에서의 스트레스 관리법',NULL,190,NULL,'스트레스 관리법','2024-09-02 10:35:14','송테무깡'),(10,'자취방에서 절약할 수 있는 전기 및 수도 요금 절약 팁',NULL,200,NULL,'전기/수도 절약 팁','2024-09-02 10:34:14','송테무깡'),(11,'자취 생활을 더욱 즐겁게 해주는 팁',NULL,155,NULL,'즐거운 자취 생활','2024-09-02 09:44:14','이정주'),(12,'자취생을 위한 간단한 인테리어 아이디어',NULL,175,NULL,'간단한 인테리어 아이디어','2024-09-02 04:44:14','곽수아'),(13,'자취방 청소를 효과적으로 하는 법',NULL,185,NULL,'효과적인 청소법','2024-09-01 22:44:14','오빛나리'),(14,'자취생을 위한 경제적인 팁',NULL,195,NULL,'경제적인 자취 팁','2024-09-01 14:44:14','오수완'),(15,'자취방의 안전을 높이는 간단한 방법',NULL,205,NULL,'자취방 안전','2024-09-01 04:44:14','양용호'),(16,'자취 방의 방충 팁',NULL,215,NULL,'방충 팁','2024-08-31 08:44:14','김태희'),(17,'자취 생활을 위한 다양한 아이템 추천',NULL,225,NULL,'생활 아이템 추천','2024-08-30 02:44:14','조준서'),(18,'자취 시작 8일 전의 팁과 요령',NULL,235,NULL,'자취 시작 팁','2024-08-25 10:44:14','박단비'),(19,'자취 생활의 30일 전 준비 팁',NULL,245,NULL,'30일 전 준비 팁','2024-08-03 10:44:14','양용호'),(20,'자취 1년을 맞이하며 느낀 점',NULL,255,NULL,'1년 자취 후기','2023-09-02 10:44:14','오빛나리');
/*!40000 ALTER TABLE `ctip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctiplike`
--

DROP TABLE IF EXISTS `ctiplike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctiplike` (
  `ctlnum` int NOT NULL AUTO_INCREMENT,
  `ctnum` int DEFAULT NULL,
  `likenick` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ctlnum`),
  KEY `ctiplike_f1_idx` (`likenick`),
  KEY `ctiplike_f2_idx` (`ctnum`),
  CONSTRAINT `ctiplike_f1` FOREIGN KEY (`likenick`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ctiplike_f2` FOREIGN KEY (`ctnum`) REFERENCES `ctip` (`ctnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctiplike`
--

LOCK TABLES `ctiplike` WRITE;
/*!40000 ALTER TABLE `ctiplike` DISABLE KEYS */;
INSERT INTO `ctiplike` VALUES (1,1,'이정주'),(2,2,'박정빈'),(3,2,'오빛나리'),(4,3,'오수완'),(5,4,'이학바리');
/*!40000 ALTER TABLE `ctiplike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctipreply`
--

DROP TABLE IF EXISTS `ctipreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctipreply` (
  `ctrnum` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `ctnum` int DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ctrnum`),
  KEY `ctipreply_f1_idx` (`writer`),
  KEY `ctipreply_f2_idx` (`ctnum`),
  CONSTRAINT `ctipreply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ctipreply_f2` FOREIGN KEY (`ctnum`) REFERENCES `ctip` (`ctnum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctipreply`
--

LOCK TABLES `ctipreply` WRITE;
/*!40000 ALTER TABLE `ctipreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `ctipreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ctipview`
--

DROP TABLE IF EXISTS `ctipview`;
/*!50001 DROP VIEW IF EXISTS `ctipview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ctipview` AS SELECT 
 1 AS `postnum`,
 1 AS `postcontent`,
 1 AS `image`,
 1 AS `readcount`,
 1 AS `savefilename`,
 1 AS `posttitle`,
 1 AS `postwritedate`,
 1 AS `postwriter`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `tablename`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `expiredproductsview`
--

DROP TABLE IF EXISTS `expiredproductsview`;
/*!50001 DROP VIEW IF EXISTS `expiredproductsview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `expiredproductsview` AS SELECT 
 1 AS `mfnum`,
 1 AS `category`,
 1 AS `exdate`,
 1 AS `fname`,
 1 AS `image`,
 1 AS `indate`,
 1 AS `memo`,
 1 AS `owner`,
 1 AS `safestate`,
 1 AS `savefilename`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `expiringsoonproductsview`
--

DROP TABLE IF EXISTS `expiringsoonproductsview`;
/*!50001 DROP VIEW IF EXISTS `expiringsoonproductsview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `expiringsoonproductsview` AS SELECT 
 1 AS `mfnum`,
 1 AS `category`,
 1 AS `exdate`,
 1 AS `fname`,
 1 AS `image`,
 1 AS `indate`,
 1 AS `memo`,
 1 AS `owner`,
 1 AS `safestate`,
 1 AS `savefilename`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `hasreviewstoreview`
--

DROP TABLE IF EXISTS `hasreviewstoreview`;
/*!50001 DROP VIEW IF EXISTS `hasreviewstoreview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `hasreviewstoreview` AS SELECT 
 1 AS `sinum`,
 1 AS `storeid`,
 1 AS `address`,
 1 AS `category`,
 1 AS `nickname`,
 1 AS `phone`,
 1 AS `storename`,
 1 AS `url`,
 1 AS `roadname`,
 1 AS `lng`,
 1 AS `lat`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `infoshare`
--

DROP TABLE IF EXISTS `infoshare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infoshare` (
  `inum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image` varchar(1000) DEFAULT NULL,
  `readcount` int DEFAULT '0',
  `savefilename` varchar(1000) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`inum`),
  KEY `infoshare_f1_idx` (`writer`),
  CONSTRAINT `infoshare_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infoshare`
--

LOCK TABLES `infoshare` WRITE;
/*!40000 ALTER TABLE `infoshare` DISABLE KEYS */;
/*!40000 ALTER TABLE `infoshare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ireply`
--

DROP TABLE IF EXISTS `ireply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ireply` (
  `irnum` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `inum` int DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`irnum`),
  KEY `ireply_f1_idx` (`writer`),
  KEY `ireply_f2_idx` (`inum`),
  CONSTRAINT `ireply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ireply_f2` FOREIGN KEY (`inum`) REFERENCES `infoshare` (`inum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ireply`
--

LOCK TABLES `ireply` WRITE;
/*!40000 ALTER TABLE `ireply` DISABLE KEYS */;
/*!40000 ALTER TABLE `ireply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `nickname` varchar(50) NOT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `address3` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `indate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(1000) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `profileimg` varchar(1000) DEFAULT NULL,
  `profilemsg` varchar(1000) DEFAULT NULL,
  `provider` varchar(20) DEFAULT NULL,
  `snsid` varchar(50) DEFAULT NULL,
  `userstate` char(1) NOT NULL DEFAULT 'Y',
  `zipnum` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('admin','서울시 강남구 상섬동 11-23','607호','서울시 강남구 삼성동','admin@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-5555','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/nah.jpg','난 나옹이다옹',NULL,NULL,'Y',NULL),('곽수아','서울시 서대문구 충정로 45-67','1010호','서울시 서대문구 충정동','user15@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3342','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/mango.png','망고망고',NULL,NULL,'Y',NULL),('김민주','서울시 송파구 잠실동 32-21','405호','서울시 송파구 잠실동','user09@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3336','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/orange.jpg','오렌지오렌지',NULL,NULL,'Y',NULL),('김태희','서울시 강남구 역삼동 123-45','203호','서울시 강남구 역삼동','user07@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3334','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/apple.jpg','사과사과',NULL,NULL,'Y',NULL),('김현재','서울시 광진구 자양동 55-44','708호','서울시 광진구 자양동','user12@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3339','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/banana.jpg','바나나바나나',NULL,NULL,'Y',NULL),('박단비','서울시 동작구 노량진동 100-12','910호','서울시 동작구 노량진동','user14@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3341','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/watermelon.jpg','수박수박',NULL,NULL,'Y',NULL),('박정빈','서울시 마포구 합정동 98-76','506호','서울시 마포구 합정동','user10@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3337','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/strowberry.jpg','딸기딸기',NULL,NULL,'Y',NULL),('송버그','서울시 강남구 삼성동 11-23','1104호','서울시 강남구 삼성동','user05@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-5555','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/majayong.jpg','마자용마자용',NULL,NULL,'Y',NULL),('송테무깡','서울시 은평구 녹번동 108-30','101호','서울시 은평구 녹번동','user04@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-4444','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/yadoran.jpg','야도란야도란',NULL,NULL,'Y',NULL),('양용호','서울시 강남구 논현동 102-3','102호','서울시 강남구 논현동','user01@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-1111','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/pika.png','피카피카',NULL,NULL,'Y',NULL),('오빛나리','서울시 중랑구 중동 8-12','B01호','서울시 중랑구 중동','user03@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/seed.png','이상해씨이상해씨',NULL,NULL,'Y',NULL),('오수완','서울시 종로구 낙원동 120-12','504호','서울시 종로구 낙원동','user02@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-2222','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/pairi.jpg','파이리파이리',NULL,NULL,'Y',NULL),('이대승','서울시 강서구 화곡동 22-15','809호','서울시 강서구 화곡동','user13@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3340','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/cherry.jpg','체리체리',NULL,NULL,'Y',NULL),('이정주','서울시 용산구 이태원동 12-34','607호','서울시 용산구 이태원동','user11@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3338','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/podo.jpg','포도포도',NULL,NULL,'Y',NULL),('이학바리','서울시 도봉구 가리봉길 14-3','102호','서울시 도봉구 가리봉동','user06@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3333','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/carrot.jpg','당근당근',NULL,NULL,'Y',NULL),('조준서','서울시 서초구 반포동 67-89','304호','서울시 서초구 반포동','user08@abc.com','2024-09-02 10:44:14','$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm','010-3333-3335','https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/bae.jpg','배배',NULL,NULL,'Y',NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_member_role_list`
--

DROP TABLE IF EXISTS `member_member_role_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_member_role_list` (
  `member_nickname` varchar(50) NOT NULL,
  `member_role_list` tinyint DEFAULT NULL,
  KEY `FKeek9b2rmo8fwb9fgofcxtbenu` (`member_nickname`),
  CONSTRAINT `FKeek9b2rmo8fwb9fgofcxtbenu` FOREIGN KEY (`member_nickname`) REFERENCES `member` (`nickname`),
  CONSTRAINT `member_member_role_list_chk_1` CHECK ((`member_role_list` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_member_role_list`
--

LOCK TABLES `member_member_role_list` WRITE;
/*!40000 ALTER TABLE `member_member_role_list` DISABLE KEYS */;
INSERT INTO `member_member_role_list` VALUES ('양용호',0),('오수완',0),('오빛나리',0),('송테무깡',0),('송버그',0),('이학바리',0),('김태희',0),('조준서',0),('김민주',0),('박정빈',0),('이정주',0),('김현재',0),('이대승',0),('박단비',0),('곽수아',0),('admin',1);
/*!40000 ALTER TABLE `member_member_role_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myfood`
--

DROP TABLE IF EXISTS `myfood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myfood` (
  `mfnum` int NOT NULL AUTO_INCREMENT,
  `category` char(1) DEFAULT '1',
  `exdate` date DEFAULT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `indate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `memo` varchar(500) DEFAULT NULL,
  `owner` varchar(50) DEFAULT NULL,
  `safestate` char(1) DEFAULT 'Y',
  `savefilename` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`mfnum`),
  KEY `myfood_f1_idx` (`owner`),
  CONSTRAINT `myfood_f1` FOREIGN KEY (`owner`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myfood`
--

LOCK TABLES `myfood` WRITE;
/*!40000 ALTER TABLE `myfood` DISABLE KEYS */;
INSERT INTO `myfood` VALUES (1,'1','2024-09-15','Apple',NULL,'2024-07-31 15:00:00','냉장고 위칸','오빛나리','y','food1.jpg'),(2,'2','2024-08-30','수박',NULL,'2024-08-04 15:00:00','냉동실 아래칸','오수완','n','food1.jpg'),(3,'1','2024-09-20','Carrot',NULL,'2024-08-06 15:00:00','냉장고 중간칸','이학바리','y','food3.jpg'),(4,'2','2024-08-25','Fish',NULL,'2024-08-07 15:00:00','냉동실 위칸','박정빈','n','food4.jpg'),(5,'1','2024-09-05','Milk',NULL,'2024-08-01 15:00:00','냉장고 아래칸','김현재','y','food5.jpg'),(6,'2','2024-08-28','Beef',NULL,'2024-08-03 15:00:00','냉동실 중간칸','오빛나리','n','food1.jpg'),(7,'1','2024-09-10','바나나킥',NULL,'2024-08-05 15:00:00','냉장고 위칸','오수완','y','food2.jpg'),(8,'2','2024-09-03','Pork',NULL,'2024-08-08 15:00:00','냉동실 아래칸','이학바리','n','food3.jpg'),(9,'1','2024-09-18','Lettuce',NULL,'2024-08-09 15:00:00','냉장고 중간칸','박정빈','y','food4.jpg'),(10,'2','2024-08-29','Shrimp',NULL,'2024-08-02 15:00:00','냉동실 위칸','김현재','n','food5.jpg'),(11,'1','2024-09-12','Yogurt',NULL,'2024-08-11 15:00:00','냉장고 아래칸','오빛나리','y','food1.jpg'),(12,'2','2024-08-26','초코칩',NULL,'2024-08-10 15:00:00','냉동실 중간칸','오수완','n','food3.jpg'),(13,'1','2024-09-08','Tomato',NULL,'2024-08-12 15:00:00','냉장고 위칸','이학바리','y','food3.jpg'),(14,'2','2024-08-27','Salmon',NULL,'2024-08-13 15:00:00','냉동실 아래칸','박정빈','n','food4.jpg'),(15,'1','2024-09-02','Butter',NULL,'2024-08-14 15:00:00','냉장고 중간칸','김현재','y','food5.jpg'),(16,'2','2024-08-31','Turkey',NULL,'2024-08-15 15:00:00','냉동실 위칸','오빛나리','n','food1.jpg'),(17,'1','2024-09-09','당근',NULL,'2024-08-16 15:00:00','냉장고 아래칸','오수완','y','food4.jpg'),(18,'2','2024-08-24','Duck',NULL,'2024-08-17 15:00:00','냉동실 중간칸','이학바리','n','food3.jpg'),(19,'1','2024-09-06','Grapes',NULL,'2024-08-18 15:00:00','냉장고 위칸','박정빈','y','food4.jpg'),(20,'2','2024-08-23','Crab',NULL,'2024-08-19 15:00:00','냉동실 아래칸','김현재','n','food5.jpg'),(21,'1','2024-09-09','딸기',NULL,'2024-08-16 15:00:00','냉장고 중간쪽','오수완','y','food5.jpg');
/*!40000 ALTER TABLE `myfood` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ncareer`
--

DROP TABLE IF EXISTS `ncareer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ncareer` (
  `ncnum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `readcount` int DEFAULT '0',
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ncnum`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ncareer`
--

LOCK TABLES `ncareer` WRITE;
/*!40000 ALTER TABLE `ncareer` DISABLE KEYS */;
INSERT INTO `ncareer` VALUES (1,'최신 IT 기업의 채용 동향과 전망에 대해 알아보세요. 다양한 IT 직무와 요구되는 기술들에 대해 설명합니다.',120,'2024년 IT 산업 채용 동향','2024-07-31 15:00:00','ADMIN'),(2,'2024년 상반기 금융권 취업 전략과 필수 자격증 정보를 제공합니다. 면접 준비 방법도 포함되어 있습니다.',85,'금융권 취업 전략 및 자격증','2024-07-24 15:00:00','ADMIN'),(3,'해외 취업을 위한 필수 준비 사항과 유용한 팁을 제공합니다. 글로벌 취업 시장의 트렌드도 함께 확인해 보세요.',95,'해외 취업 준비 가이드','2024-08-04 15:00:00','ADMIN'),(4,'최신 스타트업의 채용 공고와 창업 생태계의 변화를 알아보세요. 스타트업에서 요구되는 역량에 대해서도 설명합니다.',70,'스타트업 채용 및 창업 트렌드','2024-07-29 15:00:00','ADMIN'),(5,'정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다. 공공기관의 채용 절차도 안내합니다.',60,'공공기관 채용 및 일자리 정보','2024-07-27 15:00:00','ADMIN'),(6,'최신 IT 기업의 채용 동향과 전망에 대해 알아보세요. 다양한 IT 직무와 요구되는 기술들에 대해 설명합니다.',120,'2024년 IT 산업 채용 동향','2024-07-31 15:00:00','ADMIN'),(7,'2024년 상반기 금융권 취업 전략과 필수 자격증 정보를 제공합니다. 면접 준비 방법도 포함되어 있습니다.',85,'금융권 취업 전략 및 자격증','2024-07-24 15:00:00','ADMIN'),(8,'해외 취업을 위한 필수 준비 사항과 유용한 팁을 제공합니다. 글로벌 취업 시장의 트렌드도 함께 확인해 보세요.',95,'해외 취업 준비 가이드','2024-08-04 15:00:00','ADMIN'),(9,'최신 스타트업의 채용 공고와 창업 생태계의 변화를 알아보세요. 스타트업에서 요구되는 역량에 대해서도 설명합니다.',70,'스타트업 채용 및 창업 트렌드','2024-07-29 15:00:00','ADMIN'),(10,'정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다1. 공공기관의 채용 절차도 안내합니다. 정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다2. 공공기관의 채용 절차도 안내합니다. 정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다3. 공공기관의 채용 절차도 안내합니다.',60,'공공기관 채용 및 일자리 정보','2024-07-27 15:00:00','ADMIN'),(11,'남양주도시공사 공고 제2024-475호\r\n\r\n - 2024년도 제11회 청년 체험형 인턴（청소년 활동 프로그램 및 시설 운영, 운영보조）-\r\n 공개경쟁채용 공고\r\n 2024년도 남양주도사공사 제11회 청년 체험형 인턴（청소년 활동 프로그램 및 시설 운영, 운영보조） 공개경쟁채용 공고 일정을 다음과 같이 공고합니다.\r\n\r\n 2024년 8월 21일\r\n 남양주도시공사 사장\r\n\r\n 자세한 사항은 남양주도시공사 홈페이지 채용 게시판을 참고해주시기 바랍니다.',0,'2024년 제11회 청년 체험형 인턴 공개경쟁채용 공고','2024-09-02 10:44:14','ADMIN'),(12,'남양주시 2024년 장애인일자리사업 현황입니다.',0,'2024년 장애인일자리사업 현황','2024-09-02 10:44:14','ADMIN');
/*!40000 ALTER TABLE `ncareer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ncimages`
--

DROP TABLE IF EXISTS `ncimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ncimages` (
  `ncinum` int NOT NULL AUTO_INCREMENT,
  `savefilename` varchar(1000) DEFAULT NULL,
  `ncnum` int DEFAULT NULL,
  PRIMARY KEY (`ncinum`),
  KEY `FKtp4jhmk0a2kx77li9i9r4jutv` (`ncnum`),
  CONSTRAINT `FKtp4jhmk0a2kx77li9i9r4jutv` FOREIGN KEY (`ncnum`) REFERENCES `ncareer` (`ncnum`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ncimages`
--

LOCK TABLES `ncimages` WRITE;
/*!40000 ALTER TABLE `ncimages` DISABLE KEYS */;
INSERT INTO `ncimages` VALUES (1,'career1.jpg',1),(2,'career2.jpg',2),(3,'career3.jpg',3),(4,'career4.jpg',4),(5,'career5.jpg',5),(6,'career1.jpg',6),(7,'career2.jpg',7),(8,'career3.jpg',8),(9,'career4.jpg',9),(10,'career5.jpg',10),(11,'채험형인턴.png',11),(12,'제11회 공고（청년）.pdf',11),(13,'장애인일자리.png',12),(14,'2024년도 장애인복지일자리사업 현황.hwp',12);
/*!40000 ALTER TABLE `ncimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `npimages`
--

DROP TABLE IF EXISTS `npimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `npimages` (
  `npinum` int NOT NULL AUTO_INCREMENT,
  `savefilename` varchar(1000) DEFAULT NULL,
  `npnum` int DEFAULT NULL,
  PRIMARY KEY (`npinum`),
  KEY `FK4ye6l4qwxjthm0loshl1o5i9s` (`npnum`),
  CONSTRAINT `FK4ye6l4qwxjthm0loshl1o5i9s` FOREIGN KEY (`npnum`) REFERENCES `npolicy` (`npnum`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npimages`
--

LOCK TABLES `npimages` WRITE;
/*!40000 ALTER TABLE `npimages` DISABLE KEYS */;
INSERT INTO `npimages` VALUES (1,'policy1.jpg',1),(2,'policy2.jpg',2),(3,'policy3.jpg',3),(4,'policy4.jpg',4),(5,'policy5.jpg',5),(6,'policy6.jpg',6),(7,'policy7.jpg',7),(8,'policy8.jpg',8),(9,'policy9.jpg',9),(10,'policy10.jpg',10),(11,'고용동향.PNG',11),(12,'24.7월 고용동향(기재부).PDF',11),(13,'24.7월 고용동향(통계청).PDF',11);
/*!40000 ALTER TABLE `npimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `npolicy`
--

DROP TABLE IF EXISTS `npolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `npolicy` (
  `npnum` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `readcount` int DEFAULT '0',
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`npnum`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npolicy`
--

LOCK TABLES `npolicy` WRITE;
/*!40000 ALTER TABLE `npolicy` DISABLE KEYS */;
INSERT INTO `npolicy` VALUES (1,'공공기관 채용 및 일자리 정보 제공.',60,'공공기관 채용 정보','2024-07-31 15:00:00','ADMIN'),(2,'스타트업 채용 공고와 창업 생태계 변화 설명.',70,'스타트업 채용 및 트렌드','2024-08-01 15:00:00','ADMIN'),(3,'해외 취업을 위한 필수 준비 사항 및 유용한 팁 제공.',95,'해외 취업 준비 가이드','2024-08-02 15:00:00','ADMIN'),(4,'2024년 상반기 금융권 취업 전략 및 필수 자격증 정보.',120,'금융권 취업 전략','2024-08-03 15:00:00','ADMIN'),(5,'청년들을 위한 최신 공기업 채용 정보 제공.',85,'공기업 채용 정보','2024-08-04 15:00:00','ADMIN'),(6,'AI와 데이터 분석 직무의 취업 트렌드 분석.',110,'AI 및 데이터 분석 취업','2024-08-05 15:00:00','ADMIN'),(7,'공공 기관 채용 지원 절차와 필요 서류 안내.',45,'공공 기관 채용 절차','2024-08-06 15:00:00','ADMIN'),(8,'청년 스타트업 지원 정책 및 혜택 안내.',150,'청년 스타트업 지원','2024-08-07 15:00:00','ADMIN'),(9,'정부의 청년 주거 지원 정책 설명.',130,'청년 주거 지원 정책','2024-08-08 15:00:00','ADMIN'),(10,'해외 취업 성공 사례 및 노하우 공유.',200,'해외 취업 성공 사례','2024-08-09 15:00:00','ADMIN'),(11,'24년 7월 청년고용동향입니다',0,'[통계] 7월 청년고용동향','2024-09-02 10:44:14','ADMIN');
/*!40000 ALTER TABLE `npolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secondhand`
--

DROP TABLE IF EXISTS `secondhand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secondhand` (
  `snum` int NOT NULL AUTO_INCREMENT,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `address3` varchar(100) DEFAULT NULL,
  `buyer` varchar(50) DEFAULT NULL,
  `content` text,
  `price` int DEFAULT NULL,
  `readcount` int DEFAULT '0',
  `seller` varchar(50) DEFAULT NULL,
  `state` char(1) NOT NULL DEFAULT 'Y',
  `title` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `member_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`snum`),
  KEY `FKdfr9jse6sew1u4e803fwllxdp` (`member_id`),
  KEY `secondhand_f1_idx` (`seller`),
  CONSTRAINT `FKdfr9jse6sew1u4e803fwllxdp` FOREIGN KEY (`member_id`) REFERENCES `member` (`nickname`),
  CONSTRAINT `secondhand_f1` FOREIGN KEY (`seller`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secondhand`
--

LOCK TABLES `secondhand` WRITE;
/*!40000 ALTER TABLE `secondhand` DISABLE KEYS */;
INSERT INTO `secondhand` VALUES (1,NULL,NULL,NULL,NULL,'에어팟 프로2 팔아요 상태 좋아요 근데 가끔 왼쪽이 안들리는데 충전 잘하시면 될것 같습니다',230000,80,'김민주','Y','에어팟 프로2','2024-09-02 10:44:14',NULL),(2,NULL,NULL,NULL,NULL,'가방 팝니다. 세번 썼어요. 평소 스타일과 맞지 않아 판매합니다 15만원에 샀어요. 카키색 검은색 있습니다 문의주세요. 예민한 분 사절',50000,100,'오빛나리','Y','디스커버리 백팩','2024-09-02 10:44:14',NULL),(3,NULL,NULL,NULL,NULL,'핏 좋은 와이드 카고 팬츠입니다. 잘 입다가 스타일이 바뀌어서 판매해요. 제 착샷도 첨부합니다. 핏 보시고 구매하실분만 연락주세요',20000,60,'이학바리','Y','와이드핏 카고 팬츠','2024-09-02 10:44:14',NULL),(4,NULL,NULL,NULL,NULL,'10년 정도 쓰던건데 최근 헐거운 부분 나사 조이니까 새것 같습니다. 빈티지한 세월의 흐름이 느껴져요. 빈티지의 가치를 아시는 분만 연락 부탁드립니다',150000,50,'박정빈','Y','빈티지한 원목 의자','2024-09-02 10:44:14',NULL),(5,NULL,NULL,NULL,NULL,'이사가게 되면서 필요한 분 있을까 올려봅니다. 10개 모아뒀어요 필요한분 연락주세요. 아메리카노 10개는 드실 수 있을 겁니다',30000,80,'이정주','Y','동네 카페 커피 쿠폰','2024-09-02 10:44:14',NULL),(6,NULL,NULL,NULL,NULL,'회사 탕비실에서 쿠크다스 가져왔는데 안먹을것 같아서 팝니다... 예민한 분 사절',5000,120,'조준서','Y','쿠크다스 2박스','2024-09-02 10:44:14',NULL),(7,NULL,NULL,NULL,NULL,'그릇으로 유명한 메종 디올 그릇입니다. 선물할려다가 기분나빠져서 그냥 팝니다 비싼거에요 예쁩니다',130000,130,'곽수아','Y','메종 디올 그릇','2024-09-02 10:44:14',NULL),(8,NULL,NULL,NULL,NULL,'사용감 있으나 전체적으로 좋은 컨디션입니다. 안그래도 싸게 파는데 이것저것 재실 분은 연락주지 마세요',40000,135,'양용호','Y','퓨마 건담 운동화','2024-09-02 10:44:14',NULL),(9,NULL,NULL,NULL,NULL,'야마하 기타 유명한 거 다들 아실 겁니다. 기타 입문 2주만에 질려서 팝니다... 저보다 좋은 주인 만나길 바랍니다',100000,90,'박정빈','Y','야마하 일렉기타','2024-09-02 10:44:14',NULL),(10,NULL,NULL,NULL,NULL,'자취방에 이만한 조명 없습니다. 사진 보시죠',30000,80,'오수완','Y','이케아 조명','2024-09-02 10:44:14',NULL),(11,NULL,NULL,NULL,NULL,'이니스프리 미개봉 스킨&로션입니다. 너무 많이 쟁여둬서 팝니다.',30000,50,'박단비','Y','이니스프리 스킨&로션','2024-09-02 10:44:14',NULL),(12,NULL,NULL,NULL,NULL,'사이즈 280 네고문의 절대사절 직거래시 정품 영수증 보여드립니다',280000,180,'오빛나리','Y','나이키 조던 280','2024-09-02 10:44:14',NULL),(13,NULL,NULL,NULL,NULL,'집 꾸미려고 샀는데 몇개는 인테리어랑 안어울려서 팝니다. 사진 중 맘에 드는 거 골라서 연락주세요, 개당 가격입니다.',20000,50,'오빛나리','Y','앙리 마티스 액자','2024-09-02 10:44:14',NULL),(14,NULL,NULL,NULL,NULL,'상태 좋아요 롯데백화점에서 샀습니다 예민한분은 거절합니다 색깔 맘에 드는 거 보고 문의주세요',30000,80,'이정주','Y','나이키 헤리티지 볼캡 팝니다','2024-09-02 10:44:14',NULL),(15,NULL,NULL,NULL,NULL,'리미티드 에디션입니다. 같이 들어있던 게임팩도 드립니다.',330000,280,'양용호','Y','닌텐도 포켓몬 피카츄 에디션','2024-09-02 10:44:14',NULL),(16,NULL,NULL,NULL,NULL,'파혼해서 팝니다. 기타문의 사양합니다. 급처합니다.',230000,71,'박정빈','Y','14K 금 귀걸이','2024-09-02 10:44:14',NULL),(17,NULL,NULL,NULL,NULL,'살려주세요 명절이라고 스팸을 너무 많이 받았습니다... 누가 저 대신 먹어주세요',30000,120,'이학바리','Y','스팸','2024-09-02 10:44:14',NULL),(18,NULL,NULL,NULL,NULL,'산지 이틀된 블루투스 스피커입니다. 소리 잘나옵니다.',40000,121,'오수완','Y','블루투스 스피커','2024-09-02 10:44:14',NULL),(19,NULL,NULL,NULL,NULL,'자취생 필수품 아닌가요? 많이 샀는데 환불교환 귀찮아서 올립니다. 필요한 분 싼 값에 가져가세요',10000,41,'박단비','Y','스탠 반찬통','2024-09-02 10:44:14',NULL),(20,NULL,NULL,NULL,NULL,'상태 좋아요',35000,89,'곽수아','Y','원목스툴','2024-09-02 10:44:14',NULL),(21,NULL,NULL,NULL,NULL,'3년 썼습니다. 3만원 추가시 배송해드립니다.',230000,82,'오빛나리','Y','LG트롬 드럼세탁기','2024-09-02 10:44:14',NULL);
/*!40000 ALTER TABLE `secondhand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `secondhandview`
--

DROP TABLE IF EXISTS `secondhandview`;
/*!50001 DROP VIEW IF EXISTS `secondhandview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `secondhandview` AS SELECT 
 1 AS `snum`,
 1 AS `content`,
 1 AS `price`,
 1 AS `readcount`,
 1 AS `seller`,
 1 AS `state`,
 1 AS `title`,
 1 AS `writedate`,
 1 AS `images`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `address1`,
 1 AS `address2`,
 1 AS `address3`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `simages`
--

DROP TABLE IF EXISTS `simages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simages` (
  `sinum` int NOT NULL AUTO_INCREMENT,
  `savefilename` varchar(1000) DEFAULT NULL,
  `snum` int DEFAULT NULL,
  PRIMARY KEY (`sinum`),
  KEY `simages_f1_idx` (`sinum`),
  KEY `simages_f1` (`snum`),
  CONSTRAINT `FK3nsn05jfyusdnvg1epbdc6mku` FOREIGN KEY (`snum`) REFERENCES `secondhand` (`snum`),
  CONSTRAINT `simages_f1` FOREIGN KEY (`snum`) REFERENCES `secondhand` (`snum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simages`
--

LOCK TABLES `simages` WRITE;
/*!40000 ALTER TABLE `simages` DISABLE KEYS */;
INSERT INTO `simages` VALUES (1,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot1.jpg',1),(2,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot2.jpg',1),(3,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot3.jpg',1),(4,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag1.jpg',2),(5,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag2.jpg',2),(6,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag3.jpg',2),(7,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag4.jpg',2),(8,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag5.jpg',2),(9,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants1.jpg',3),(10,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants2.jpg',3),(11,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants3.jpg',3),(12,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/chair1.jpg',4),(13,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/chair2.jpg',4),(14,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/coupon1.png',5),(15,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/coupon2.png',5),(16,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/couque1.jpg',6),(17,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/couque2.jpg',6),(18,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/dior1.jpeg',7),(19,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/dior2.jeg',7),(20,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma1.jpg',8),(21,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma2.jpg',8),(22,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma3.jpg',8),(23,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/guitar1.jpg',9),(24,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/guitar2.jpg',9),(25,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea1.jpg',10),(26,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea2.jpg',10),(27,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea3.jpg',10),(28,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/innisfree1.jpg',11),(29,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/innisfree2.jpg',11),(30,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan1.jpg',12),(31,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan2.jpg',12),(32,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan3.jpg',12),(33,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan4.jpg',12),(34,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis1.jpg',13),(35,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis2.jpg',13),(36,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis3.jpg',13),(37,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike1.jpg',14),(38,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike2.jpg',14),(39,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike3.jpg',14),(40,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike4.jpg',14),(41,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nintendo1.jpg',15),(42,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nintendo2.jpg',15),(43,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ring1.jpg',16),(44,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ring2.jpg',16),(45,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam1.jpg',17),(46,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam2.jpg',17),(47,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam3.jpg',17),(48,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/speaker1.jpg',18),(49,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/speaker2.jpg',18),(50,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan1.jpg',19),(51,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan2.jpg',19),(52,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan3.jpg',19),(53,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stool1.jpg',20),(54,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stool2.jpg',20),(55,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/trom1.jpg',21),(56,'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/trom2.jpg',21);
/*!40000 ALTER TABLE `simages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slike`
--

DROP TABLE IF EXISTS `slike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slike` (
  `slnum` int NOT NULL AUTO_INCREMENT,
  `likenick` varchar(50) DEFAULT NULL,
  `snum` int DEFAULT NULL,
  PRIMARY KEY (`slnum`),
  KEY `slike_f1_idx` (`likenick`),
  KEY `slike_f2_idx` (`snum`),
  CONSTRAINT `slike_f1` FOREIGN KEY (`likenick`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `slike_f2` FOREIGN KEY (`snum`) REFERENCES `secondhand` (`snum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slike`
--

LOCK TABLES `slike` WRITE;
/*!40000 ALTER TABLE `slike` DISABLE KEYS */;
/*!40000 ALTER TABLE `slike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sreply`
--

DROP TABLE IF EXISTS `sreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sreply` (
  `srnum` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `snum` int DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`srnum`),
  KEY `sreply_f1_idx` (`writer`),
  KEY `sreply_f2_idx` (`snum`),
  CONSTRAINT `sreply_f1` FOREIGN KEY (`writer`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sreply_f2` FOREIGN KEY (`snum`) REFERENCES `secondhand` (`snum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sreply`
--

LOCK TABLES `sreply` WRITE;
/*!40000 ALTER TABLE `sreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `sreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `steamedlistview`
--

DROP TABLE IF EXISTS `steamedlistview`;
/*!50001 DROP VIEW IF EXISTS `steamedlistview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `steamedlistview` AS SELECT 
 1 AS `nickname`,
 1 AS `slnum`,
 1 AS `snum`,
 1 AS `title`,
 1 AS `content`,
 1 AS `price`,
 1 AS `state`,
 1 AS `images`,
 1 AS `replycount`,
 1 AS `likecount`,
 1 AS `address1`,
 1 AS `address2`,
 1 AS `address3`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `storeinfo`
--

DROP TABLE IF EXISTS `storeinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storeinfo` (
  `sinum` int NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `storeid` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `storename` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `roadname` varchar(100) DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  PRIMARY KEY (`sinum`),
  KEY `storeinfo_f1_idx` (`nickname`),
  CONSTRAINT `storeinfo_f1` FOREIGN KEY (`nickname`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeinfo`
--

LOCK TABLES `storeinfo` WRITE;
/*!40000 ALTER TABLE `storeinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `storeinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `storeinfo_review_view`
--

DROP TABLE IF EXISTS `storeinfo_review_view`;
/*!50001 DROP VIEW IF EXISTS `storeinfo_review_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `storeinfo_review_view` AS SELECT 
 1 AS `sinum`,
 1 AS `storeid`,
 1 AS `address`,
 1 AS `category`,
 1 AS `store_nickname`,
 1 AS `phone`,
 1 AS `storename`,
 1 AS `url`,
 1 AS `roadname`,
 1 AS `lng`,
 1 AS `lat`,
 1 AS `review_id`,
 1 AS `content`,
 1 AS `review_nickname`,
 1 AS `score`,
 1 AS `writedate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `storereview`
--

DROP TABLE IF EXISTS `storereview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storereview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `storeid` varchar(50) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `storereview_f1_idx` (`nickname`),
  CONSTRAINT `storereview_f1` FOREIGN KEY (`nickname`) REFERENCES `member` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storereview`
--

LOCK TABLES `storereview` WRITE;
/*!40000 ALTER TABLE `storereview` DISABLE KEYS */;
/*!40000 ALTER TABLE `storereview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `storereviewinfo`
--

DROP TABLE IF EXISTS `storereviewinfo`;
/*!50001 DROP VIEW IF EXISTS `storereviewinfo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `storereviewinfo` AS SELECT 
 1 AS `id`,
 1 AS `content`,
 1 AS `nickname`,
 1 AS `score`,
 1 AS `storeid`,
 1 AS `writedate`,
 1 AS `sinum`,
 1 AS `address`,
 1 AS `category`,
 1 AS `phone`,
 1 AS `storename`,
 1 AS `url`,
 1 AS `roadname`,
 1 AS `lng`,
 1 AS `lat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `top10posts`
--

DROP TABLE IF EXISTS `top10posts`;
/*!50001 DROP VIEW IF EXISTS `top10posts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `top10posts` AS SELECT 
 1 AS `boardindex`,
 1 AS `boardname`,
 1 AS `num`,
 1 AS `title`,
 1 AS `likecount`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `canonymousview`
--

/*!50001 DROP VIEW IF EXISTS `canonymousview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `canonymousview` AS select `c`.`canum` AS `postnum`,`c`.`content` AS `postcontent`,`c`.`image` AS `image`,`c`.`readcount` AS `readcount`,`c`.`savefilename` AS `savefilename`,`c`.`title` AS `posttitle`,`c`.`writedate` AS `postwritedate`,`c`.`writer` AS `postwriter`,(select count(0) from `canonymousreply` `r` where (`r`.`canum` = `c`.`canum`)) AS `replycount`,(select count(0) from `canonymouslike` `l` where (`l`.`canum` = `c`.`canum`)) AS `likecount`,'고민상담' AS `tablename` from `canonymous` `c` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cfreeview`
--

/*!50001 DROP VIEW IF EXISTS `cfreeview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cfreeview` AS select `c`.`cfnum` AS `postnum`,`c`.`content` AS `postcontent`,`c`.`image` AS `image`,`c`.`readcount` AS `readcount`,`c`.`savefilename` AS `savefilename`,`c`.`title` AS `posttitle`,`c`.`writedate` AS `postwritedate`,`c`.`writer` AS `postwriter`,(select count(0) from `cfreereply` `r` where (`r`.`cfnum` = `c`.`cfnum`)) AS `replycount`,(select count(0) from `cfreelike` `l` where (`l`.`cfnum` = `c`.`cfnum`)) AS `likecount`,'자유게시판' AS `tablename` from `cfree` `c` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `crecommendedview`
--

/*!50001 DROP VIEW IF EXISTS `crecommendedview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `crecommendedview` AS select `c`.`crnum` AS `postnum`,`c`.`content` AS `postcontent`,`c`.`image` AS `image`,`c`.`readcount` AS `readcount`,`c`.`savefilename` AS `savefilename`,`c`.`title` AS `posttitle`,`c`.`writedate` AS `postwritedate`,`c`.`writer` AS `postwriter`,(select count(0) from `crecommendedreply` `r` where (`r`.`crnum` = `c`.`crnum`)) AS `replycount`,(select count(0) from `crecommendedlike` `l` where (`l`.`crnum` = `c`.`crnum`)) AS `likecount`,'업체추천' AS `tablename` from `crecommended` `c` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ctipview`
--

/*!50001 DROP VIEW IF EXISTS `ctipview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ctipview` AS select `c`.`ctnum` AS `postnum`,`c`.`content` AS `postcontent`,`c`.`image` AS `image`,`c`.`readcount` AS `readcount`,`c`.`savefilename` AS `savefilename`,`c`.`title` AS `posttitle`,`c`.`writedate` AS `postwritedate`,`c`.`writer` AS `postwriter`,(select count(0) from `ctipreply` `r` where (`r`.`ctnum` = `c`.`ctnum`)) AS `replycount`,(select count(0) from `ctiplike` `l` where (`l`.`ctnum` = `c`.`ctnum`)) AS `likecount`,'팁과 노하우' AS `tablename` from `ctip` `c` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `expiredproductsview`
--

/*!50001 DROP VIEW IF EXISTS `expiredproductsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `expiredproductsview` AS select `myfood`.`mfnum` AS `mfnum`,`myfood`.`category` AS `category`,`myfood`.`exdate` AS `exdate`,`myfood`.`fname` AS `fname`,`myfood`.`image` AS `image`,`myfood`.`indate` AS `indate`,`myfood`.`memo` AS `memo`,`myfood`.`owner` AS `owner`,`myfood`.`safestate` AS `safestate`,`myfood`.`savefilename` AS `savefilename` from `myfood` where (`myfood`.`exdate` < curdate()) order by `myfood`.`exdate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `expiringsoonproductsview`
--

/*!50001 DROP VIEW IF EXISTS `expiringsoonproductsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `expiringsoonproductsview` AS select `myfood`.`mfnum` AS `mfnum`,`myfood`.`category` AS `category`,`myfood`.`exdate` AS `exdate`,`myfood`.`fname` AS `fname`,`myfood`.`image` AS `image`,`myfood`.`indate` AS `indate`,`myfood`.`memo` AS `memo`,`myfood`.`owner` AS `owner`,`myfood`.`safestate` AS `safestate`,`myfood`.`savefilename` AS `savefilename` from `myfood` where ((`myfood`.`exdate` >= curdate()) and (`myfood`.`exdate` <= (curdate() + interval 7 day))) order by `myfood`.`exdate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `hasreviewstoreview`
--

/*!50001 DROP VIEW IF EXISTS `hasreviewstoreview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `hasreviewstoreview` AS select `si`.`sinum` AS `sinum`,`si`.`storeid` AS `storeid`,`si`.`address` AS `address`,`si`.`category` AS `category`,`si`.`nickname` AS `nickname`,`si`.`phone` AS `phone`,`si`.`storename` AS `storename`,`si`.`url` AS `url`,`si`.`roadname` AS `roadname`,`si`.`lng` AS `lng`,`si`.`lat` AS `lat` from (`storeinfo` `si` join `storereview` `sr` on((`si`.`storeid` = `sr`.`storeid`))) group by `si`.`sinum`,`si`.`storeid` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `secondhandview`
--

/*!50001 DROP VIEW IF EXISTS `secondhandview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `secondhandview` AS select `s`.`snum` AS `snum`,`s`.`content` AS `content`,`s`.`price` AS `price`,`s`.`readcount` AS `readcount`,`s`.`seller` AS `seller`,`s`.`state` AS `state`,`s`.`title` AS `title`,`s`.`writedate` AS `writedate`,json_arrayagg(`i`.`savefilename`) AS `images`,count(distinct `sr`.`srnum`) AS `replycount`,count(distinct `sl`.`slnum`) AS `likecount`,`m`.`address1` AS `address1`,`m`.`address2` AS `address2`,`m`.`address3` AS `address3` from ((((`secondhand` `s` left join `simages` `i` on((`i`.`snum` = `s`.`snum`))) left join `sreply` `sr` on((`sr`.`snum` = `s`.`snum`))) left join `slike` `sl` on((`sl`.`snum` = `s`.`snum`))) left join `member` `m` on((`m`.`nickname` = `s`.`seller`))) group by `s`.`snum`,`s`.`content`,`s`.`price`,`s`.`readcount`,`s`.`seller`,`s`.`state`,`s`.`title`,`s`.`writedate`,`m`.`address1`,`m`.`address2`,`m`.`address3` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `steamedlistview`
--

/*!50001 DROP VIEW IF EXISTS `steamedlistview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `steamedlistview` AS select `sl`.`likenick` AS `nickname`,`sl`.`slnum` AS `slnum`,`s`.`snum` AS `snum`,`s`.`title` AS `title`,`s`.`content` AS `content`,`s`.`price` AS `price`,`s`.`state` AS `state`,json_arrayagg(`i`.`savefilename`) AS `images`,count(distinct `sr`.`srnum`) AS `replycount`,count(distinct `sl2`.`slnum`) AS `likecount`,`m`.`address1` AS `address1`,`m`.`address2` AS `address2`,`m`.`address3` AS `address3` from (((((`secondhand` `s` left join `slike` `sl` on((`s`.`snum` = `sl`.`snum`))) left join `simages` `i` on((`s`.`snum` = `i`.`snum`))) left join `sreply` `sr` on((`s`.`snum` = `sr`.`snum`))) left join `slike` `sl2` on((`s`.`snum` = `sl2`.`snum`))) left join `member` `m` on((`m`.`nickname` = `s`.`seller`))) group by `sl`.`likenick`,`sl`.`slnum`,`s`.`snum`,`s`.`title`,`s`.`content`,`s`.`price`,`s`.`state`,`m`.`address1`,`m`.`address2`,`m`.`address3` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `storeinfo_review_view`
--

/*!50001 DROP VIEW IF EXISTS `storeinfo_review_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `storeinfo_review_view` AS select `si`.`sinum` AS `sinum`,`si`.`storeid` AS `storeid`,`si`.`address` AS `address`,`si`.`category` AS `category`,`si`.`nickname` AS `store_nickname`,`si`.`phone` AS `phone`,`si`.`storename` AS `storename`,`si`.`url` AS `url`,`si`.`roadname` AS `roadname`,`si`.`lng` AS `lng`,`si`.`lat` AS `lat`,`sr`.`id` AS `review_id`,`sr`.`content` AS `content`,`sr`.`nickname` AS `review_nickname`,`sr`.`score` AS `score`,`sr`.`writedate` AS `writedate` from (`storeinfo` `si` left join `storereview` `sr` on((`si`.`storeid` = `sr`.`storeid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `storereviewinfo`
--

/*!50001 DROP VIEW IF EXISTS `storereviewinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `storereviewinfo` AS select `sr`.`id` AS `id`,`sr`.`content` AS `content`,`sr`.`nickname` AS `nickname`,`sr`.`score` AS `score`,`sr`.`storeid` AS `storeid`,`sr`.`writedate` AS `writedate`,`si`.`sinum` AS `sinum`,`si`.`address` AS `address`,`si`.`category` AS `category`,`si`.`phone` AS `phone`,`si`.`storename` AS `storename`,`si`.`url` AS `url`,`si`.`roadname` AS `roadname`,`si`.`lng` AS `lng`,`si`.`lat` AS `lat` from (`storereview` `sr` join `storeinfo` `si` on((`sr`.`storeid` = `si`.`storeid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `top10posts`
--

/*!50001 DROP VIEW IF EXISTS `top10posts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `top10posts` AS with `likecounts` as (select 'cfnum' AS `boardname`,`cfree`.`title` AS `title`,`cfree`.`cfnum` AS `num`,count(`cfreelike`.`cflnum`) AS `likecount` from (`cfree` left join `cfreelike` on((`cfree`.`cfnum` = `cfreelike`.`cfnum`))) group by `cfree`.`cfnum`,`cfree`.`title` union all select 'canum' AS `boardname`,`canonymous`.`title` AS `title`,`canonymous`.`canum` AS `num`,count(`canonymouslike`.`calnum`) AS `likecount` from (`canonymous` left join `canonymouslike` on((`canonymous`.`canum` = `canonymouslike`.`canum`))) group by `canonymous`.`canum`,`canonymous`.`title` union all select 'crnum' AS `boardname`,`crecommended`.`title` AS `title`,`crecommended`.`crnum` AS `num`,count(`crecommendedlike`.`crlnum`) AS `likecount` from (`crecommended` left join `crecommendedlike` on((`crecommended`.`crnum` = `crecommendedlike`.`crnum`))) group by `crecommended`.`crnum`,`crecommended`.`title` union all select 'ctnum' AS `boardname`,`ctip`.`title` AS `title`,`ctip`.`ctnum` AS `num`,count(`ctiplike`.`ctlnum`) AS `likecount` from (`ctip` left join `ctiplike` on((`ctip`.`ctnum` = `ctiplike`.`ctnum`))) group by `ctip`.`ctnum`,`ctip`.`title`), `rankedposts` as (select row_number() OVER (ORDER BY `likecounts`.`likecount` desc )  AS `boardindex`,`likecounts`.`boardname` AS `boardname`,`likecounts`.`num` AS `num`,`likecounts`.`title` AS `title`,`likecounts`.`likecount` AS `likecount` from `likecounts`) select `rankedposts`.`boardindex` AS `boardindex`,`rankedposts`.`boardname` AS `boardname`,`rankedposts`.`num` AS `num`,`rankedposts`.`title` AS `title`,`rankedposts`.`likecount` AS `likecount` from `rankedposts` where (`rankedposts`.`boardindex` <= 10) order by `rankedposts`.`boardindex` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 18:46:48
