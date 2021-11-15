-- --------------------------------------------------------
-- Host:                         us-cdbr-east-04.cleardb.com
-- Server version:               5.6.50-log - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Disable FK Check
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `employees`, `games`, `gifts`, `wishes`;

-- Re-enable FK Check
SET FOREIGN_KEY_CHECKS=1;

-- Dumping structure for table heroku_833f8f811c7ce79.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(11) AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- Dumping structure for table heroku_833f8f811c7ce79.games
CREATE TABLE IF NOT EXISTS `games` (
  `app_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table heroku_833f8f811c7ce79.wishes
CREATE TABLE IF NOT EXISTS `wishes` (
  `wish_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `wished_by` int(11) NOT NULL,
  `date_wished` date NOT NULL,
  `fulfilled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`wish_id`),
  UNIQUE KEY `game_id` (`game_id`,`wished_by`),
  KEY `fk_employee` (`wished_by`),
  CONSTRAINT `wishes_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`app_id`) ON DELETE CASCADE,
  CONSTRAINT `wishes_ibfk_2` FOREIGN KEY (`wished_by`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- Dumping structure for table heroku_833f8f811c7ce79.gifts
CREATE TABLE IF NOT EXISTS `gifts` (
  `gift_id` int(11) NOT NULL AUTO_INCREMENT,
  `wish_id` int(11) NOT NULL,
  `fulfilled_by` int(11) DEFAULT NULL,
  `date_sent` date NOT NULL,
  PRIMARY KEY (`gift_id`),
  UNIQUE KEY `wish_id` (`wish_id`),
  KEY `fk_fulfilled` (`fulfilled_by`),
  CONSTRAINT `gifts_ibfk_1` FOREIGN KEY (`wish_id`) REFERENCES `wishes` (`wish_id`) ON DELETE CASCADE,
  CONSTRAINT `gifts_ibfk_2` FOREIGN KEY (`fulfilled_by`) REFERENCES `employees` (`employee_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;


/* BEGIN POPULATING SAMPLE DATA */

-- Dumping data for table heroku_833f8f811c7ce79.employees: ~5 rows (approximately)
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `department`, `email`, `phone`, `date_of_birth`) VALUES
	(5, 'Mark', 'Otto', 'Marketing', 'mark@gamegifters.co', '206-112-3847', '1991-03-22'),
	(15, 'Jacob', 'Thornton', 'Finance', 'jake@gamegifters.co', '691-555-1774', '1993-11-04'),
	(25, 'Richard', 'Ngo-Lam', 'Engineering', 'richie@gamegifters.co', '010-142-6220', '1998-07-16'),
	(35, 'Sola', 'Chang', 'Design', 'sola@gamegifters.co', '206-771-4410', '1992-08-08'),
	(45, 'Nathan', 'Perkins', 'Engineering', 'nathan@gamegifters.co', '717-205-3412', '1990-01-15');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;

-- Dumping data for table heroku_833f8f811c7ce79.games: ~6 rows (approximately)
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`app_id`, `title`, `price`) VALUES
	(252950, 'Rocket League', 999),
	(322330, "Don't Starve Together", 1499),
	(435150, 'Divinity: Original Sin 2', 4499),
	(548430, 'Deep Rock Galactic', 2999),
	(739630, 'Phasmophobia', 1399),
	(1085660, 'Destiny 2', 6999);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;

-- Dumping data for table heroku_833f8f811c7ce79.wishes: ~0 rows (approximately)
/*!40000 ALTER TABLE `wishes` DISABLE KEYS */;
INSERT INTO `wishes` (`wish_id`, `game_id`, `wished_by`, `date_wished`, `fulfilled`) VALUES
	(5, 322330, 35, '2020-09-12', 1),
	(15, 739630, 35, '2020-10-04', 0),
	(25, 322330, 5, '2021-03-29', 0),
	(35, 252950, 35, '2021-05-05', 0),
	(45, 322330, 15, '2021-05-18', 1),
	(55, 1085660, 45, '2021-06-21', 0);
/*!40000 ALTER TABLE `wishes` ENABLE KEYS */;

-- Dumping data for table heroku_833f8f811c7ce79.gifts: ~0 rows (approximately)
/*!40000 ALTER TABLE `gifts` DISABLE KEYS */;
INSERT INTO `gifts` (`gift_id`, `wish_id`, `fulfilled_by`, `date_sent`) VALUES
	(5, 25, 5, '2021-12-23'),
	(15, 5, 25, '2021-12-18'),
	(25, 15, 5, '2021-12-03'),
	(35, 35, 15, '2020-12-03'),
	(45, 45, 5, '2021-12-02');
/*!40000 ALTER TABLE `gifts` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
