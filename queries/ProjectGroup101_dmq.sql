/* colon (:) character denotes the variables that will have data from the backend programming language */

/* EMPLOYEES DATA MANIPULATION QUERIES */

-- CREATE a new Employee
INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth)
VALUES (:first_name_input, :last_name_input, :department_from_dropdown_input, :email_input, :phone_input, :date_of_birth_from_date_input);

-- READ all rows in the Employees table to populate the Employees page,
-- ordered by last name
SELECT employee_id, first_name, last_name, department, email, phone,
DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth
FROM employees
ORDER BY last_name, first_name, employee_id;

-- READ all rows in the Employees table to populate the dropdown menus in the Create Wish and Create Gift forms
SELECT employee_id, first_name, last_name FROM employees
ORDER by first_name, last_name, employee_id;

-- UPDATE an Employee's data based on submission of the Update Employee form
UPDATE employees
SET first_name=:first_name_input,
last_name=:last_name_input,
department=:department_from_dropdown_input,
email=:email_input,
phone=:phone_input,
date_of_birth=:date_of_birth_from_date_input
WHERE employee_id=:employee_id_from_update_form;

-- DELETE multiple Employees based on which checkboxes were selected
DELETE FROM employees WHERE employee_id IN (:array_of_employee_ids_from_selected_checkboxes);


/* GAMES DATA MANIPULATION QUERIES */

-- CREATE a new Game
INSERT INTO games (app_id, title, price)
VALUES (:app_id_input, :title_input, :price_input);

-- READ all rows in the Games table to populate the Games table as well as the dynamic dropdown in the CREATE Wish
-- form, ordered by title
SELECT app_id, title, price FROM games
ORDER BY title;

-- UPDATE a Game's metadata based on submission of the Update Game form
UPDATE games
SET app_id=:app_id_input,
title=:title_input,
price=:price_input
WHERE app_id=:app_id_from_update_form;

-- DELETE multiple Games based on which checkboxes were selected
DELETE FROM games WHERE app_id IN (:array_of_app_ids_from_selected_checkboxes)


/* WISHES DATA MANIPULATION QUERIES */

-- CREATE a new Wish
INSERT INTO wishes (game_id, wished_by, date_wished)
VALUES (:game_id_dropdown_menu, :employee_id_dropdownmenu, :date_wished_from_date_input);

-- READ all rows in the Wishes table along with their associated game title and name of employee who made the wish
-- ordered by oldest, unfulfilled wishes first
SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y") AS date_wished_formatted, fulfilled
FROM wishes
INNER JOIN games ON wishes.game_id=games.app_id
INNER JOIN employees ON wishes.wished_by=employees.employee_id
ORDER BY fulfilled, date_wished;

-- READ Wishes filtered by Employee name
SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y"), fulfilled
FROM wishes
INNER JOIN games ON wishes.game_id=games.app_id
INNER JOIN employees ON wishes.wished_by=employees.employee_id
WHERE employee.first_name LIKE ':prefix_string_from_first_name_field%'
AND employee.last_name LIKE ':prefix_string_from_last_name_field%'
ORDER BY fulfilled, date_wished;

-- READ Wishes whose fulfilled attributes must be set back to False upon deletion of their
-- corresponding Gifts
SELECT gifts.wish_id FROM gifts
INNER JOIN wishes ON gifts.wish_id = wishes.wish_id
WHERE gifts.gift_id IN (:array_of_gift_ids_from_selected_checkboxes);

-- READ Wishes that have not been fulfilled yet in order to populate dropdown menu in Create Gift form
SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
employees.first_name, employees.last_name
FROM wishes
INNER JOIN games ON wishes.game_id=games.app_id
INNER JOIN employees ON wishes.wished_by=employees.employee_id
WHERE fulfilled=0
ORDER BY first_name, last_name, associated_employee_id, game_title;

-- UPDATE Wish based on submission of the Update Wish form
UPDATE wishes
SET game_id=game_id_dropdown_menu,
wished_by=:employee_id_dropdown_menu,
date_wished=:date_input,
WHERE wish_id=:wish_id_from_update_form;

-- UPDATE Wish fulfilled attribute when a Gift is created for it
UPDATE wishes
SET fulfilled=1
WHERE wish_id=:wish_id_from_create_gift_form;

-- UPDATE Wish fulfilled attributes when corresponding Gift is deleted
UPDATE wishes
SET fulfilled=0
WHERE wish_id IN (:array_of_wishes_returned_in_server_side_callback_select_query);

-- DELETE multiple Wishes based on which checkboxes were selected
DELETE FROM wishes WHERE wish_id IN (:array_of_wish_ids_from_selected_checkboxes);


/* GIFTS DATA MANIPULATION QUERIES */

-- CREATE a new Gift
INSERT INTO gifts (wish_id, fulfilled_by, date_sent)
VALUES (:wish_id_dropdown, :employee_id_dropdown, :date_sent_from_date_input);

-- READ all rows in the Gifts table along with their associated game title, sender name, and recipient name,
-- with the most recent Gifts displayed first
SELECT gift_id, gifts.wish_id AS associated_wish_id, games.title AS game_title,
fulfilled_by AS sender_id, sender.first_name AS sender_first_name, sender.last_name AS sender_last_name,
recipient.first_name AS recipient_first_name, recipient.last_name AS recipient_last_name, DATE_FORMAT(date_sent, "%c/%e/%Y") AS formatted_date_sent
FROM gifts
INNER JOIN wishes ON gifts.wish_id=wishes.wish_id
INNER JOIN games ON wishes.game_id=games.app_id
LEFT JOIN employees AS sender ON gifts.fulfilled_by=sender.employee_id
INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id;
ORDER BY date_sent DESC;

-- UPDATE Gift based on submission of the Update Gift form
UPDATE gifts
SET fulfilled_by=:employee_id_dropdown,
date_sent=:date_sent_from_date_input
WHERE gift_id=:gift_id_from_update_form;

-- DELETE multiple Gifts based on which checkboxes were selected
DELETE FROM gifts WHERE gift_id IN (:array_of_gift_ids_from_selected_checkboxes);

-- Add a new Gift
-- Conditional insert: Employee cannot send gift to themselves
-- dual = dummy table
INSERT INTO gifts (wish_id, fulfilled_by, date_sent)
SELECT (:wish_id_input, :fulfilled_by_input, :date_sent_from_date_input); FROM dual
WHERE NOT EXISTS
(SELECT * FROM wishes
INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id
WHERE wishes.wish_id=:wish_id_input AND :fulfilled_by_input);
