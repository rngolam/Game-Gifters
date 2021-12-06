const giftMap = new Map();
let giftToUpdate;

let editedWish;
let updateSenderIDInput;
let updateSentInput;

window.addEventListener("load", () => {
    if (giftInfo) {
        giftInfo.forEach((gift) => giftMap.set(gift.gift_id, gift));
    }

    const updateGiftForm = document.querySelector("#update-gift-form");
    editedWish = document.querySelector("#edited-wish");
    updateSenderIDInput = document.querySelector("#update-sender-id");
    updateDateSentInput = document.querySelector("#update-date-sent");

    updateGiftForm.addEventListener("submit", function (event) {
        // Prevent form from submitting
        event.preventDefault();

        // Get values from form fields
        formData = {
            giftID: giftToUpdate.gift_id,
            senderID: updateSenderIDInput.value,
            dateSent: updateDateSentInput.value,
        };

        // Set up AJAX reqsentconst req = new XMLHttpRequest();
        const req = new XMLHttpRequest();
        req.open("POST", "/gifts/", true);
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

function populateUpdateGiftFields(id) {
    giftToUpdate = giftMap.get(id);

    const recipientName =
        giftToUpdate.recipient_name_from_client ||
        `${giftToUpdate.recipient_first_name} ${giftToUpdate.recipient_last_name}`;

    editedWish.value = `${giftToUpdate.game_title} for ${recipientName} [${giftToUpdate.associated_wish_id}]`;

    updateSenderIDInput.value = giftToUpdate.sender_id;
    updateDateSentInput.value = convertFormFriendlyDateString(
        giftToUpdate.formatted_date_sent
    );
}
