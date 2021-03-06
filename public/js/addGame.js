let appIDInput;
let titleInput;
let priceInput;

window.addEventListener("load", () => {
    const addGameForm = document.querySelector("#add-game-form");
    appIDInput = document.querySelector("#app-id");
    titleInput = document.querySelector("#title");
    priceInput = document.querySelector("#price");

    addGameForm.addEventListener("submit", function (event) {
        // Prevent form from submitting
        event.preventDefault();

        const formData = {
            appID: appIDInput.value,
            title: titleInput.value,
            price: parseFloat(priceInput.value).toFixed(2),
        };

        const formFields = [appIDInput, titleInput, priceInput, searchQueryInput];

        // Set up AJAX request
        const req = new XMLHttpRequest();
        req.open("POST", "/games/", true);
        req.setRequestHeader("Content-type", "application/json");

        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                const responseData = JSON.parse(req.response);
                addRowToTable(formData);
                addGameToMap(formData);
                clearForm(formFields);
                closeModal("add-modal", clearResultsTable);
            } else if (req.readyState == 4 && req.status != 200) {
                const responseData = JSON.parse(req.response);
                handleInputError(responseData, "add-error-message");
            }
        };

        req.send(JSON.stringify(formData));
    });
});

function addRowToTable(formData) {
    const gamesTable = document.querySelector("#games-table-body");
    const row = gamesTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const updateCell = document.createElement("td");
    const idCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const priceCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="delete-row" value="${formData.appID}">`;
    deleteCheckboxCell.scope = "row";
    updateCell.innerHTML = `<a class="update" href="#" onclick="showModal('update-modal', ${formData.appID}, populateUpdateGameFields)">&#128221;</a>`;
    idCell.innerText = formData.appID;
    titleCell.innerText = formData.title;
    priceCell.innerText = "$" + formData.price;

    cells = [deleteCheckboxCell, updateCell, idCell, titleCell, priceCell];
    cells.forEach((cell) => row.appendChild(cell));
}

function addGameToMap(formData) {
    addedGame = {
        app_id: parseInt(formData.appID),
        title: formData.title,
        price: formData.price,
    };

    gameMap.set(addedGame.app_id, addedGame);
}
