// Prepopulate wish date field with today's date
document.querySelector("#dateWished").valueAsDate = new Date();

const addWishForm = document.getElementById("add-wish-form");

// Get values from form fields
const gameIDInput = document.querySelector("#gameID");
const employeeIDInput = document.querySelector("#employeeID");
const dateWishedInput = document.querySelector("#dateWished");

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
            clearForm(formFields);
            closeModal("addModal");
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});

function addRowToTable(formData, insertedRowId) {
    const wishesTable = document.querySelector("#wishes-table-body");
    const row = wishesTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const wishIDCell = document.createElement("td");
    const gameIDCell = document.createElement("td");
    const gameTitleCell = document.createElement("td");
    const associatedEmployeeIDCell = document.createElement("td");
    const employeeNameCell = document.createElement("td");
    const dateWishedCell = document.createElement("td");
    const fulfilledCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="deleteRow" value="${insertedRowId}">`;
    deleteCheckboxCell.scope = "row";
    wishIDCell.innerText = insertedRowId;
    gameIDCell.innerText = formData.gameID;
    gameTitleCell.innerText =
        gameIDInput.options[gameIDInput.selectedIndex].getAttribute(
            "data-title"
        );
    associatedEmployeeIDCell.innerText = formData.employeeID;
    employeeNameCell.innerText =
        employeeIDInput.options[employeeIDInput.selectedIndex].getAttribute(
            "data-employee"
        );
    dateWishedCell.innerText = convertDateString(formData.dateWished);
    fulfilledCell.innerHTML =
        '<span class="fa fa-dot-circle-o text-danger"></span><span class="ms-1">No</span>';

    cells = [
        deleteCheckboxCell,
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
