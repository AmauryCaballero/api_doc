-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: api-doc
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3
CREATE DATABASE IF NOT EXISTS `apidoc` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `apidoc`;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `UserId` bigint NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pic` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  'UserAge' bigint NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserProfile_Email_UN` (`Email`),
  UNIQUE KEY `UserProfile_UserName_UN` (`UserName`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `apidoc` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `spCreateUserProfile` */;
ALTER DATABASE `apidoc` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`apidoc`@`localhost` PROCEDURE `spCreateUserProfile`(=
IN inUserName VARCHAR(100),
IN inEmail VARCHAR(256)
IN inUserAge bigint,
)
spCreateUserProfile:BEGIN
	SET @emailCount = (SELECT COUNT(up.UserId) FROM UserProfile up WHERE up.Email = inEmail);
	SET @userNameCount = (SELECT COUNT(up.UserName) FROM UserProfile up WHERE up.UserName = inUserName);

	IF (@userNameCount > 0) THEN
		SELECT 'INVALID NAME' AS code, 'Nombre no disponible. No se pudo registrar usuario.' AS message;
		LEAVE spCreateUserProfile;
	END IF;

	IF (@emailCount > 0) THEN
		SELECT 'INVALID EMAIL' AS code, 'Dirección de correo no disponible. No se pudo registrar usuario.' AS message;
		LEAVE spCreateUserProfile;
	END IF;
	
	INSERT INTO UserProfile ( UserName, Email,UserAge, CreatedDate)
	VALUES ( inUserName, inEmail, inUserAge, now());
	SELECT 'OK' AS code, 'Usuario registrado.' AS message;
END ;;
DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `carredom` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `spUpdateUserProfile` */;
ALTER DATABASE `carredom` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`carredom`@`localhost` PROCEDURE `spUpdateUserPic`(
IN inUserId BIGINT,
IN inPic LONGTEXT,
)
BEGIN
	UPDATE UserProfile SET Pic = inPic, UpdateTime = now()
	WHERE UserId = inUserID;
	SELECT 'OK' AS code, 'Información actualizada correctamente.' AS message;
END ;;
DELIMITER ;