const gameMap = new Map();
let gameToUpdate;

let updateAppIDInput;
let updateTitleInput;
let updatePriceInput;

window.addEventListener("load", () => {

    if (gameInfo) {
        gameInfo.forEach((game) => gameMap.set(game.app_id, game));
    }

    const updateGameForm = document.querySelector("#update-game-form");
    updateAppIDInput = document.querySelector("#update-app-id");
    updateTitleInput = document.querySelector("#update-title");
    updatePriceInput = document.querySelector("#update-price");

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
                const responseData = JSON.parse(req.response);
                handleInputError(responseData, "update-error-message");
            }
        };

        req.send(JSON.stringify(formData));
    });
});

function populateUpdateGameFields(id) {
    gameToUpdate = gameMap.get(id);

    updateAppIDInput.value = gameToUpdate.app_id;
    updateTitleInput.value = gameToUpdate.title;
    updatePriceInput.value = gameToUpdate.price;
}
