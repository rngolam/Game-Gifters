const updateGameForm = document.querySelector("#update-game-form");
const updateAppIDInput = document.querySelector("#update-app-id");
const updateTitleInput = document.querySelector("#update-title");
const updatePriceInput = document.querySelector("#update-price");

const gameMap = new Map();
let gameToUpdate;

if (gameInfo) {
    gameInfo.forEach((game) => gameMap.set(game.app_id, game));
}

function populateUpdateGameFields(id) {
    gameToUpdate = gameMap.get(id);

    updateAppIDInput.value = gameToUpdate.app_id;
    updateTitleInput.value = gameToUpdate.title;
    updatePriceInput.value = gameToUpdate.price;
}

updateGameForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    formData = {
        oldAppID: gameToUpdate.app_id,
        newAppID: updateAppIDInput.value,
        title: updateTitleInput.value,
        price: updatePriceInput.value,
    };

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/games/", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("X-HTTP-Method-Override", "PUT");

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const responseData = JSON.parse(req.response);
            window.location.reload();
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});
