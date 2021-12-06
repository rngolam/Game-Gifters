let gameIDInput;
let employeeIDInput;
let dateWishedInput;

window.addEventListener("load", () => {
    const addWishForm = document.getElementById("add-wish-form");
    gameIDInput = document.querySelector("#game-id");
    employeeIDInput = document.querySelector("#employee-id");
    dateWishedInput = document.querySelector("#date-wished");

    // Prepopulate wish date field with today's date
    document.querySelector("#date-wished").valueAsDate = new Date();

    addWishForm.addEventListener("submit", function (event) {
        // Prevent form from submitting
        event.preventDefault();

        const formData = {
            gameID: gameIDInput.value,
            employeeID: employeeIDInput.value,
            dateWished: dateWishedInput.value,
        };

        const formFields = [gameIDInput, employeeIDInput, dateWishedInput];

        // Set up AJAX request
        const req = new XMLHttpRequest();
        req.open("POST", "/wishes/", true);
        req.setRequestHeader("Content-type", "application/json");

        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                const responseData = JSON.parse(req.response);
                const insertedRowId = responseData.insertId;
                addRowToTable(formData, insertedRowId);
                addWishToMap(formData, insertedRowId);
                clearForm(formFields);
                closeModal("add-modal");
            } else if (req.readyState == 4 && req.status != 200) {
                const responseData = JSON.parse(req.response);
                handleInputError(responseData, "add-error-message");
            }
        };

        req.send(JSON.stringify(formData));
    });
});

function addRowToTable(formData, insertedRowId) {
    const wishesTable = document.querySelector("#wishes-table-body");
    const row = wishesTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const updateCell = document.createElement("td");
    const wishIDCell = document.createElement("td");
    const gameIDCell = document.createElement("td");
    const gameTitleCell = document.createElement("td");
    const associatedEmployeeIDCell = document.createElement("td");
    const employeeNameCell = document.createElement("td");
    const dateWishedCell = document.createElement("td");
    const fulfilledCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="delete-row" value="${insertedRowId}">`;
    deleteCheckboxCell.scope = "row";
    updateCell.innerHTML = `<a class="update" href="#" onclick="showModal('update-modal', ${insertedRowId}, populateUpdateWishFields)">&#128221;</a>`;
    wishIDCell.innerText = insertedRowId;
    gameIDCell.innerText = formData.gameID;
    gameTitleCell.innerText =
        gameIDInput.options[gameIDInput.selectedIndex].dataset.title;
    associatedEmployeeIDCell.innerText = formData.employeeID;
    employeeNameCell.innerText =
        employeeIDInput.options[employeeIDInput.selectedIndex].dataset.employee;
    dateWishedCell.innerText = convertDateString(formData.dateWished);
    fulfilledCell.innerHTML =
        '<i class="fa fa-dot-circle-o text-danger"></span><span class="ms-1"></i>No';

    cells = [
        deleteCheckboxCell,
        updateCell,
        wishIDCell,
        gameIDCell,
        gameTitleCell,
        associatedEmployeeIDCell,
        employeeNameCell,
        dateWishedCell,
        fulfilledCell,
    ];
    cells.forEach((cell) => row.appendChild(cell));
}

function addWishToMap(formData, insertedRowId) {
    addedWish = {
        wish_id: insertedRowId,
        game_id: formData.gameID,
        associated_employee_id: formData.employeeID,
        date_wished_formatted: convertDateString(formData.dateWished),
    };

    wishMap.set(insertedRowId, addedWish);
}
