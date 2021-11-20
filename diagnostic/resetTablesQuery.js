let resetTableQuery = 'SET FOREIGN_KEY_CHECKS=0; ' +
'DROP TABLE IF EXISTS employees, games, gifts, wishes; ' +

'SET FOREIGN_KEY_CHECKS=1; ' +

'CREATE TABLE IF NOT EXISTS employees ( ' +
  'employee_id int(11) AUTO_INCREMENT, ' +
  'first_name varchar(255) NOT NULL, ' +
  'last_name varchar(255) NOT NULL, ' +
  'department varchar(255) DEFAULT NULL, ' +
  'email varchar(255) DEFAULT NULL, ' +
  'phone varchar(13) DEFAULT NULL, ' +
  'date_of_birth date NOT NULL, ' +
  'PRIMARY KEY (employee_id) ' +
') ENGINE=InnoDB DEFAULT CHARSET=utf8; ' +

'CREATE TABLE IF NOT EXISTS games ( ' +
  'app_id int(8) NOT NULL, ' +
  'title varchar(255) NOT NULL, ' +
  'price decimal(10,2) NOT NULL, ' +
  'PRIMARY KEY (app_id) ' +
') ENGINE=InnoDB DEFAULT CHARSET=utf8; ' +

'CREATE TABLE IF NOT EXISTS wishes ( ' +
  'wish_id int(11) NOT NULL AUTO_INCREMENT, ' +
  'game_id int(8) NOT NULL, ' +
  'wished_by int(11) NOT NULL, ' +
  'date_wished date NOT NULL, ' +
  'fulfilled tinyint(1) NOT NULL DEFAULT 0, ' +
  'PRIMARY KEY (wish_id), ' +
  'UNIQUE KEY game_id (game_id,wished_by), ' +
  'KEY fk_employee (wished_by), ' +
  'CONSTRAINT wishes_ibfk_1 FOREIGN KEY (game_id) REFERENCES games (app_id) ON DELETE CASCADE, ' +
  'CONSTRAINT wishes_ibfk_2 FOREIGN KEY (wished_by) REFERENCES employees (employee_id) ON DELETE CASCADE ' +
  ') ENGINE=InnoDB DEFAULT CHARSET=utf8; ' +
  
  'CREATE TABLE IF NOT EXISTS gifts ( ' +
    'gift_id int(11) NOT NULL AUTO_INCREMENT, ' +
    'wish_id int(11) NOT NULL, ' +
    'fulfilled_by int(11) DEFAULT NULL, ' +
    'date_sent date NOT NULL, ' +
    'PRIMARY KEY (gift_id), ' +
    'UNIQUE KEY wish_id (wish_id), ' +
    'KEY fk_fulfilled (fulfilled_by), ' +
    'CONSTRAINT gifts_ibfk_1 FOREIGN KEY (wish_id) REFERENCES wishes (wish_id) ON DELETE CASCADE, ' +
    'CONSTRAINT gifts_ibfk_2 FOREIGN KEY (fulfilled_by) REFERENCES employees (employee_id) ON DELETE SET NULL ' +
  ') ENGINE=InnoDB DEFAULT CHARSET=utf8; ' +
  
  'INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth) VALUES ' +
      '("Mark", "Otto", "Marketing", "mark@gamegifters.co", "206-112-3847", "1991-03-22"), ' +
      '("Jacob", "Thornton", "Finance", "jake@gamegifters.co", "691-555-1774", "1993-11-04"), ' +
      '("Richard", "Ngo-Lam", "Engineering", "richie@gamegifters.co", "010-142-6220", "1998-07-16"), ' +
      '("Sola", "Chang", "Design", "sola@gamegifters.co", "206-771-4410", "1992-08-08"), ' +
      '("Nathan", "Perkins", "Engineering", "nathan@gamegifters.co", "717-205-3412", "1990-01-15"); ' +
  
  'INSERT INTO games (app_id, title, price) VALUES ' +
      '(252950, "Rocket League", 9.99), ' +
      '(322330, "Don\'t Starve Together", 14.99), ' +
      '(435150, "Divinity: Original Sin 2", 44.99), ' +
      '(548430, "Deep Rock Galactic", 29.99), ' +
      '(739630, "Phasmophobia", 13.99), ' +
      '(1085660, "Destiny 2", 69.99); ' +
  
  'INSERT INTO wishes (game_id, wished_by, date_wished, fulfilled) VALUES ' +
      '(322330, 35, "2020-09-12", 1), ' +
      '(739630, 35, "2020-10-04", 0), ' +
      '(322330, 5, "2021-03-29", 0), ' +
      '(252950, 35, "2021-05-05", 0), ' +
      '(322330, 15, "2021-05-18", 1), ' +
      '(1085660, 45, "2021-06-21", 0); ' +
  
  'INSERT INTO gifts (wish_id, fulfilled_by, date_sent) VALUES ' +
      '(5, 15, "2021-12-23"), ' +
      '(45, 45, "2021-12-18");'

module.exports.query = resetTableQuery;