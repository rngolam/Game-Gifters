# Game Gifters
Track video game wishlists for your company's employees.

![Splash Page](https://user-images.githubusercontent.com/69094063/145110584-0e21be1a-a743-4040-934b-3f83e86dfff1.PNG)
- [Heroku Link](http://gamegifters.herokuapp.com/)

## Setup Environment
- Install Node.js
- Navigate to Game-Gifters root directory
- Install dependencies with `npm install`

## MySQL Database Setup
- Create new `.env` file in Game-Gifters root directory
- Add the following lines to the `.env` file with your MySQL database credentials
```
PORT={YOUR PORT}
DB_HOST={YOUR DATABASE HOST}
DB_USER={YOUR DATABASE USERNAME}
DB_PASS={YOUR DATABASE PASSWORD}
DB_NAME={YOUR DATABASE NAME}
```

## Run App
- Navigate to Game-Gifters root directory
- Run app with `node app.js`

## Navigate App
- Navigate to `localhost:{YOUR PORT}` e.g. `localhost:3000` in your web browser
- There are four pages: Employees, Games, Wishes, and Gifts, each with their own tables
- To add a row to a table, select the Add option from the dropdown menu above the table
- To update a row in a table, click the memo icon in the row you wish to edit
- To delete a row or multiple rows, select the checkboxes next to each row you would like to delete, then select the Delete option from the above dropdown menu
- When adding a new Game, you can choose to enter a search query that interfaces with the Steam Store API and quickly retrieve a game's metadata

![Games Table](https://user-images.githubusercontent.com/69094063/145112549-1ce1aeb7-9606-4821-be27-d1cf199e6241.png)
![Adding a Game](https://user-images.githubusercontent.com/69094063/145112662-691efa32-c0eb-4ae8-8aec-1886cf1957e4.png)
![Searching the Steam Store](https://user-images.githubusercontent.com/69094063/145112739-348f1dc6-8504-49d7-9f10-2298664b430f.png)
![Newly-added Row](https://user-images.githubusercontent.com/69094063/145112836-2839802e-501e-4552-bdd2-6d1fbb5d9910.png)
![Deleting Multiple Games](https://user-images.githubusercontent.com/69094063/145113197-11798d1a-acd7-43bd-8ced-b7757d600d8b.png)
