const recipientInput = document.querySelector("#recipientID");
const distinctRecipients = new Map();

window.addEventListener("load", (event) => {
    populateRecipients();
    confirmRecipientButton = document.querySelector("#confirmRecipient");
    confirmRecipientButton.addEventListener("click", () => {
        confirmRecipient(confirmRecipientButton);
    });

    confirmGameButton = document.querySelector('#confirmGame');
    confirmGameButton.addEventListener("click", () => {
        confirmGame(confirmGameButton);
    });
});

function populateRecipients() {
    // Sort Employees with unfulfilled wishes by name
    unfulfilledWishes.sort((a, b) =>
        a.first_name + " " + a.last_name > b.first_name + " " + b.last_name
            ? 1
            : -1
    );

    // Create hashmap of distinct Employees with unfulfilled wishes
    unfulfilledWishes.forEach(wish =>
        distinctRecipients.set(
            wish.associated_employee_id,
            wish.first_name + " " + wish.last_name
        )
    );

    const recipientDatalist = document.querySelector("#employeeNames");

    distinctRecipients.forEach((employeeName, employeeID) => {
        let option = document.createElement("option");
        option.value = employeeName;
        option.setAttribute("data-value", employeeID);
        recipientDatalist.appendChild(option);
    });
}

function populateGames(recipientID) {
    
    unfulfilledWishes.sort((a, b) =>
        a.game_title > b.game_title
            ? 1
            : -1
    );

    const gamesDatalist = document.querySelector("#gameTitles");

    unfulfilledWishes.forEach(wish => {
        if (recipientID === wish.associated_employee_id) {
            let option = document.createElement('option');
            option.value = wish.game_title;
            option.setAttribute("data-value", wish.wish_id);
            gamesDatalist.appendChild(option);
        }
    });
}

function confirmRecipient(confirmRecipientButton) {
    let recipientID = getHiddenID("employeeNames", "recipientID");

    if (distinctRecipients.has(recipientID)) {
        recipientInput.setCustomValidity("");
        console.log("recipient found!");
        document.querySelector("#gameSelector").style.display = "block";
        confirmRecipientButton.style.display = "none";
        populateGames(recipientID);

    } else {
        recipientInput.setCustomValidity(
            "There is no Employee with unfulfilled wishes with this name. Please double-check your spelling"
        );
        console.log("recipient not found");
    }

    recipientInput.reportValidity();
}

function confirmGame(confirmGameButton) {

    const wishIDInput = document.querySelector('#wishID');

    let wishlistGames = Array.from(document.querySelector('#gameTitles').children).map(option => option.value)

    if (wishlistGames.includes(wishIDInput.value)) {

        console.log('game on wishlist!')
    } else {
        console.log('game not on wishlist')
    }

    let wishID = getHiddenID("gameTitles", "wishID");


}

function getHiddenID(listID, formID) {
    // Get currently selected datalist option string
    const selectedString = $("#" + formID).val();

    // First retrieves datalist option node in DOM where the displayed label = value, then access
    // the option's hidden data-value attribute
    return $("#" + listID + " " + '[value="' + selectedString + '"]').data(
        "value"
    );
}
