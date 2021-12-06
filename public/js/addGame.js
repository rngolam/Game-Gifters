const addEmployeeForm = document.getElementById("add-game-form");

addEmployeeForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const appIDInput = document.getElementById("appID");
    const titleInput = document.getElementById("title");
    const priceInput = document.getElementById("price");

    const formData = {
        appID: appIDInput.value,
        title: titleInput.value,
        price: parseFloat(priceInput.value).toFixed(2),
    };

    const formFields = [appIDInput, titleInput, priceInput];

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/games/", true);
    req.setRequestHeader("Content-type", "application/json");

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const responseData = JSON.parse(req.response);
            addRowToTable(formData, formData.appID);
            clearForm(formFields);
            closeModal("addModal");
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});

function addRowToTable(formData, appID) {
    const gamesTable = document.getElementById("games-table-body");
    const row = gamesTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const updateCell = document.createElement("td");
    const idCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const priceCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="deleteRow" value="${appID}">`;
    deleteCheckboxCell.scope = "row";
    updateCell.innerHTML = `<a class="update" href="#" onclick="showModal('updateModal', ${appID}, populateUpdateGameFields)">&#128221;</a>`;
    idCell.innerText = formData.appID;
    titleCell.innerText = formData.title;
    priceCell.innerText = "$" + formData.price;

    cells = [deleteCheckboxCell, updateCell, idCell, titleCell, priceCell];
    cells.forEach((cell) => row.appendChild(cell));
}
