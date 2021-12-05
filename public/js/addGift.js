const addGiftForm = document.querySelector("#add-gift-form");

// Get values from form fields
const wishIDInput = document.querySelector("#wishID");
const senderIDInput = document.querySelector("#senderID");
const dateSentInput = document.querySelector("#dateSent");

addGiftForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    const formData = {
        wishID: wishIDInput.value,
        senderID: senderIDInput.value,
        dateSent: dateSentInput.value,
    };

    const formFields = [wishIDInput, senderIDInput, dateSentInput];

    // SsenderAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/gifts/", true);
    req.setRequestHeader("Content-type", "application/json");

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const responseData = JSON.parse(req.response);
            const insertedRowId = responseData.insertId;
            addRowToTable(formData, insertedRowId);

            // Remove wish from dropdown upon successful insertion
            wishIDInput.options[wishIDInput.selectedIndex].remove();
            clearForm(formFields);
            closeModal("addModal");
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});

function addRowToTable(formData, insertedRowId) {
    const giftsTable = document.querySelector("#gifts-table-body");
    const row = giftsTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const giftIDCell = document.createElement("td");
    const wishIDCell = document.createElement("td");
    const gameTitleCell = document.createElement("td");
    const senderIDCell = document.createElement("td");
    const senderNameCell = document.createElement("td");
    const recipientNameCell = document.createElement("td");
    const dateSentCell = document.createElement("td");

    // Fill cells with data
    giftIDCell.innerText = insertedRowId;
    wishIDCell.innerText = formData.wishID;
    gameTitleCell.innerText =
        wishIDInput.options[wishIDInput.selectedIndex].getAttribute(
            "data-game"
        );
    senderIDCell.innerText = formData.senderID;
    senderNameCell.innerText =
        senderIDInput.options[senderIDInput.selectedIndex].getAttribute(
            "data-sender"
        );
    recipientNameCell.innerText =
        wishIDInput.options[wishIDInput.selectedIndex].getAttribute(
            "data-recipient"
        );
    dateSentCell.innerText = convertDateString(formData.dateSent);

    cells = [
        giftIDCell,
        wishIDCell,
        gameTitleCell,
        senderIDCell,
        senderNameCell,
        recipientNameCell,
        dateSentCell,
    ];
    cells.forEach((cell) => row.appendChild(cell));
}
