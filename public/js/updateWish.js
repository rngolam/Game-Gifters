

const wishMap = new Map();
let wishToUpdate;

let updateemployeeIDInput;
let updateGameIDInput;
let updateDateWishedInput;

window.addEventListener("load", () => {
    
    if (wishInfo) {
        wishInfo.forEach((wish) => wishMap.set(wish.wish_id, wish));
    }
    
    const updateWishForm = document.querySelector("#update-wish-form");
    updateEmployeeIDInput = document.querySelector("#update-employee-id");
    updateGameIDInput = document.querySelector("#update-game-id");
    updateDateWishedInput = document.querySelector("#update-date-wished");

    updateWishForm.addEventListener("submit", function (event) {
        // Prevent form from submitting
        event.preventDefault();

        // Get values from form fields
        formData = {
            wishID: wishToUpdate.wish_id,
            employeeID: updateEmployeeIDInput.value,
            gameID: updateGameIDInput.value,
            dateWished: updateDateWishedInput.value,
        };

        // Set up AJAX request
        const req = new XMLHttpRequest();
        req.open("POST", "/wishes/", true);
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

function populateUpdateWishFields(id) {
    wishToUpdate = wishMap.get(id);

    updateEmployeeIDInput.value = wishToUpdate.associated_employee_id;
    updateGameIDInput.value = wishToUpdate.game_id;
    updateDateWishedInput.value = convertFormFriendlyDateString(
        wishToUpdate.date_wished_formatted
    );
}
