let wishIDInput;
let senderIDInput;
let dateSentInput;

window.addEventListener("load", () => {
    const addGiftForm = document.querySelector("#add-gift-form");
    wishIDInput = document.querySelector("#wish-id");
    senderIDInput = document.querySelector("#sender-id");
    dateSentInput = document.querySelector("#date-sent");

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
                addGiftToMap(formData, insertedRowId);

                // Remove wish from dropdown upon successful insertion
                wishIDInput.options[wishIDInput.selectedIndex].remove();

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
    const giftsTable = document.querySelector("#gifts-table-body");
    const row = giftsTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const updateCell = document.createElement("td");
    const giftIDCell = document.createElement("td");
    const wishIDCell = document.createElement("td");
    const gameTitleCell = document.createElement("td");
    const senderIDCell = document.createElement("td");
    const senderNameCell = document.createElement("td");
    const recipientNameCell = document.createElement("td");
    const dateSentCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="delete-row" value="${insertedRowId}">`;
    deleteCheckboxCell.scope = "row";
    updateCell.innerHTML = `<a class="update" href="#" onclick="showModal('update-modal', ${insertedRowId}, populateUpdateGiftFields)">&#128221;</a>`;
    giftIDCell.innerText = insertedRowId;
    wishIDCell.innerText = formData.wishID;
    gameTitleCell.innerText =
        wishIDInput.options[wishIDInput.selectedIndex].dataset.game;
    senderIDCell.innerText = formData.senderID;
    senderNameCell.innerText =
        senderIDInput.options[senderIDInput.selectedIndex].dataset.sender;
    recipientNameCell.innerText =
        wishIDInput.options[wishIDInput.selectedIndex].dataset.recipient;
    dateSentCell.innerText = convertDateString(formData.dateSent);

    cells = [
        deleteCheckboxCell,
        updateCell,
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

function addGiftToMap(formData, insertedRowId) {
    const gameTitle =
        wishIDInput.options[wishIDInput.selectedIndex].dataset.game;
    const recipientName =
        wishIDInput.options[wishIDInput.selectedIndex].dataset.recipient;

    addedGift = {
        gift_id: insertedRowId,
        associated_wish_id: formData.wishID,
        game_title: gameTitle,
        sender_id: formData.senderID,
        recipient_name_from_client: recipientName,
        formatted_date_sent: convertDateString(formData.dateSent),
    };

    giftMap.set(addedGift.gift_id, addedGift);
}
