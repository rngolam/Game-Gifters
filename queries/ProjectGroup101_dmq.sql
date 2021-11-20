/* colon : character denotes the variables that will have data from the backend programming language */

-- Get all rows in the Employees table to populate the Employees page
SELECT *, DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth FROM employees;

-- Get all rows in the Games table to populate the Games page
SELECT * FROM games;

-- Get all rows in the Wishes table along with their associated game title and name of employee who made the wish
-- ordered by oldest, unfulfilled wishes first
SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y") AS date_wished_formatted, fulfilled
FROM wishes
INNER JOIN games ON wishes.game_id=games.app_id
INNER JOIN employees ON wishes.wished_by=employees.employee_id
ORDER BY fulfilled, date_wished;

-- Get all rows in the Gifts table along with their associated game title, sender name, and recipient name
SELECT gift_id, gifts.wish_id AS associated_wish_id, games.title AS game_title,
fulfilled_by AS sender_id, sender.first_name AS sender_first_name, sender.last_name AS sender_last_name,
recipient.first_name AS recipient_first_name, recipient.last_name AS recipient_last_name, DATE_FORMAT(date_sent, "%c/%e/%Y") AS formatted_date_sent
FROM gifts
INNER JOIN wishes ON gifts.wish_id=wishes.wish_id
INNER JOIN games ON wishes.game_id=games.app_id
LEFT JOIN employees AS sender ON gifts.fulfilled_by=sender.employee_id
INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id;

-- Add a new Employee
INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth)
VALUES (:first_name_input, :last_name_input, :department_from_dropdown_input, :email_input, :phone_input, date_of_birth_from_date_input);

-- Add a new Game
INSERT INTO games (app_id, title, price)
VALUES (:app_id_input, :title_input, :price_input);

-- Add a new Wish
INSERT INTO wishes (game_id, wished_by, date_wished, fulfilled)
VALUES (:game_id_input, :wished_by_input, :date_wished_from_date_input, :fulfilled_from_toggle_switch_input);

-- Add a new Gift
-- Conditional insert: Employee cannot send gift to themselves
-- dual = dummy table
INSERT INTO gifts (wish_id, fulfilled_by, date_sent)
SELECT (:wish_id_input, :fulfilled_by_input, :date_sent_from_date_input); FROM dual
WHERE NOT EXISTS
(SELECT * FROM wishes
INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id
WHERE wishes.wish_id=:wish_id_input AND :fulfilled_by_input);

-- Update an Employee's data based on submission of the Update Employee form
UPDATE employees
SET first_name=:first_name_input,
last_name=:last_name_input,
department=:department_from_dropdown_input,
email=:email_input,
phone=:phone_input,
date_of_birth=:date_of_birth_from_date_input
WHERE employee_id=:employee_id_from_update_form;

-- Update a Game's metadata based on submission of the Update Game form
UPDATE games
SET app_id=:app_id_input,
title=:title_input,
price=:price_input
WHERE app_id=:app_id_from_update_form;

-- Delete a Wish
DELETE FROM wishes WHERE wish_id=:wish_id_checked_on_wishes_page;
-- ... we can use a loop in the backend language along with the UNION operator to string multiple subqueries together

-- Get all pertinent Employee information to pre-populate the Update form fields
SELECT * FROM employees
WHERE employee_id=:employee_id_from_update_button;

-- Get all pertinent Game metadata to pre-populate the Update form fields
SELECT * FROM games
WHERE app_id=:app_id_from_update_button;

-- Get Employees filtered by department
SELECT * FROM employees WHERE department=:department_checked;
-- ... we can use a loop in the backend language along with the UNION operator to string multiple queries together
-- and filter by multiple departments if more than 1 box is checked

-- Get an Employee by first and last name
SELECT employee_id FROM employees 
WHERE first_name = :first_name_from_input AND last_name = :last_name_from_input;

-- Get Wishes filtered by Employee name
SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
employees.first_name, employees.last_name, date_wished, fulfilled
FROM wishes
INNER JOIN games ON wishes.game_id=games.app_id
INNER JOIN employees ON wishes.wished_by=employees.employee_id
WHERE employee.first_name LIKE ':prefix_string_from_first_name_field%'
AND employee.last_name LIKE ':prefix_string_from_last_name_field%';

-- Search for Game app_id by title
SELECT app_id FROM games
WHERE title LIKE ':prefix_string_from_game_title_field%';