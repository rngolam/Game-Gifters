const updateGiftForm = document.querySelector("#update-gift-form");

const editedWish = document.querySelector("#edited-wish");
const updateSenderIDInput = document.querySelector("#update-sender-id");
const updateDateSentInput = document.querySelector("#update-date-sent");

const giftMap = new Map();
let giftToUpdate;

if (giftInfo) {
    giftInfo.forEach((gift) => giftMap.set(gift.gift_id, gift));
}

function populateUpdateGiftFields(id) {
    giftToUpdate = giftMap.get(id);

    const recipientName = giftToUpdate.recipient_name_from_client || `${giftToUpdate.recipient_first_name} ${giftToUpdate.recipient_last_name}`

    editedWish.value = `${giftToUpdate.game_title} for ${recipientName} [${giftToUpdate.associated_wish_id}]`;

    updateSenderIDInput.value = giftToUpdate.sender_id;
    updateDateSentInput.value = convertFormFriendlyDateString(
        giftToUpdate.formatted_date_sent
    );
}

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
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});
