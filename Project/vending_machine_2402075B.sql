CREATE DATABASE  IF NOT EXISTS `vending_machine` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vending_machine`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: vending_machine
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_cost` decimal(5,2) NOT NULL,
  `item_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` tinyint DEFAULT NULL,
  `item_quantity` int DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Pokka Ice Peach Tea',1.50,'/images/pokkaicepeachtea.png',1,15),(2,'Pokka Ice Lemon Tea (Less Sugar)',1.50,'/images/pokkaicelemontea.png',1,12),(3,'Pokka Kyoho Grape Juice Drink (Less Sugar)',1.50,'/images/pokkakiyodrink.png',0,0),(4,'Pokka Green Tea',1.50,'/images/pokkagreentea.png',1,8),(5,'7Up Original Can Drink',1.10,'/images/7upcan.png',0,0),(6,'100 Plus Isotonic Can Drink',1.10,'/images/100pluscan.png',1,13),(7,'Coco-Cola Original Taste Can Drink ',1.10,'/images/cokeoriginaltaste.png',0,0),(8,'Everest Plain Drinking Water',0.90,'/images/everestwater.png',1,10),(9,'C&C Sparkling Lemon Can Drink',1.70,'/images/c&clemoncan.png',1,6),(10,'Milo Original Can Drink',1.40,'/images/milocan.png',0,0),(11,'Red Bull Gold Energy Drink',1.50,'/images/redbullgoldcan.png',0,0),(12,'Wang Lao Ji Herbal Tea Can Drink',1.10,'/images/wanglaojican.png',1,10),(13,'Nescafe Mocha Can Drink ',1.30,'/images/nescafemochacan.png',0,0),(14,'Nescafe Original Milk Coffee Can Drink',1.40,'/images/nescafeoriginalcan.png',1,5),(15,'Ice Cool Young Coconut Can Drink',1.20,'/images/icecoolcoconutcan.png',1,12),(16,'Coco-Cola Zero Sugar Can Drink',1.20,'/images/cokezerosugarcan.png',0,0),(17,'Ribena Sparkling Juice Can Drink ',1.70,'/images/ribenacan.png',1,12),(18,'Suntory Boss Coffee Black No Sugar',3.00,'/images/suntorycoffee.png',1,10),(19,'NutriSoy Soya Milk Can Drink',1.10,'/images/nutrisoy.png',1,9),(20,'NutriSoy Soya Milk Can Drink',1.10,'/images/nutrisoy.png',0,0),(21,'Pokka Ice Peach Tea Can Drink (Less Sugar)',1.10,'/images/icepeachteacan.png',1,10),(22,'Pokka Ice Peach Tea Can Drink (Less Sugar)',1.10,'/images/icepeachteacan.png',0,0),(23,'Yeo\'s Chrysanthemum Tea Can',1.20,'/images/yeoschrysan.png',1,17),(24,'Yeo\'s Lemon Barley Can',1.20,'/images/yeoslemonbarley.png',1,10),(25,'Yeo\'s Winter Melon Tea Can',1.20,'/images/yeoswintermelontea.png',1,8),(26,'Pink Dolphin Vitaminised Drink (Peach)',2.00,'/images/pinkdolphin.png',0,0),(27,'Pokka Plenish Isotonic Drink ',1.30,'/images/pokkaplenish.png',1,6),(28,'Pokka Ice Blueberry Tea (Less Sugar)',1.50,'/images/iceblueberrytea.png',1,8),(29,'Pokka Ice Lemon Tea ',1.50,'/images/icelemontea.png',1,5),(30,'Glaceau Restore Vitamin Water Fruit Punch',2.50,'/images/glaceau1.png',1,10),(31,'Glaceau Restore Vitamin Water Triple Berry',2.50,'/images/glaceau2.png',1,5),(32,'Glaceau Restore Vitamin Water Orange',2.50,'/images/glaceau3.png',0,0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_restock`
--

DROP TABLE IF EXISTS `item_restock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_restock` (
  `item_restock_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `restock_quantity` int DEFAULT NULL,
  PRIMARY KEY (`item_restock_id`),
  KEY `item_id_idx` (`item_id`),
  CONSTRAINT `itemid` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_restock`
--

LOCK TABLES `item_restock` WRITE;
/*!40000 ALTER TABLE `item_restock` DISABLE KEYS */;
INSERT INTO `item_restock` VALUES (1,3,20),(2,5,20),(3,7,20),(4,10,20),(5,11,20),(6,13,20),(7,16,20),(8,20,20),(9,22,20),(10,26,20),(11,32,20);
/*!40000 ALTER TABLE `item_restock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `school` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `block` int NOT NULL,
  `floor` int NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Informatics and IT',3,3),(2,'Engineering',10,1);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,'Cash'),(2,'Ez-link'),(3,'Credit & Debit Card'),(4,'NETS');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Available'),(2,'Unavailable');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vending_item`
--

DROP TABLE IF EXISTS `vending_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vending_item` (
  `vending_item_id` int NOT NULL AUTO_INCREMENT,
  `vending_machine_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  PRIMARY KEY (`vending_item_id`),
  KEY `vending_machine_id_idx` (`vending_machine_id`),
  KEY `item_id_idx` (`item_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vending_machine_id` FOREIGN KEY (`vending_machine_id`) REFERENCES `vending_machine` (`vending_machine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vending_item`
--

LOCK TABLES `vending_item` WRITE;
/*!40000 ALTER TABLE `vending_item` DISABLE KEYS */;
INSERT INTO `vending_item` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,2,17),(18,2,18),(19,2,19),(20,2,20),(21,2,21),(22,2,22),(23,2,23),(24,2,24),(25,2,25),(26,2,26),(27,2,27),(28,2,28),(29,2,29),(30,2,30),(31,2,31),(32,2,32);
/*!40000 ALTER TABLE `vending_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vending_machine`
--

DROP TABLE IF EXISTS `vending_machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vending_machine` (
  `vending_machine_id` int NOT NULL AUTO_INCREMENT,
  `location_id` int DEFAULT NULL,
  `vendor_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  PRIMARY KEY (`vending_machine_id`),
  KEY `location_id_idx` (`location_id`),
  KEY `status_id_idx` (`status_id`),
  CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vending_machine`
--

LOCK TABLES `vending_machine` WRITE;
/*!40000 ALTER TABLE `vending_machine` DISABLE KEYS */;
INSERT INTO `vending_machine` VALUES (1,1,'Apac Vendings',1),(2,2,'Apac Vendings',1);
/*!40000 ALTER TABLE `vending_machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vending_payment`
--

DROP TABLE IF EXISTS `vending_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vending_payment` (
  `vending_payment_id` int NOT NULL AUTO_INCREMENT,
  `vending_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  PRIMARY KEY (`vending_payment_id`),
  KEY `vending_id_idx` (`vending_id`),
  KEY `payment_id_idx` (`payment_id`),
  CONSTRAINT `payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment_method` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vending_id` FOREIGN KEY (`vending_id`) REFERENCES `vending_machine` (`vending_machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vending_payment`
--

LOCK TABLES `vending_payment` WRITE;
/*!40000 ALTER TABLE `vending_payment` DISABLE KEYS */;
INSERT INTO `vending_payment` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,1),(6,2,2),(7,2,3),(8,2,4);
/*!40000 ALTER TABLE `vending_payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-24 11:49:35
