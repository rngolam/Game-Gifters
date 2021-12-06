const updateWishForm = document.querySelector("#update-wish-form");

const updateEmployeeIDInput = document.querySelector("#update-employee-id");
const updateGameIDInput = document.querySelector("#update-game-id");
const updateDateWishedInput = document.querySelector("#update-date-wished")

const wishMap = new Map();
let wishToUpdate;

if (wishInfo) {
    wishInfo.forEach((wish) =>
        wishMap.set(wish.wish_id, wish)
    );
}

function populateUpdateWishFields(id) {
    wishToUpdate = wishMap.get(id);

    updateEmployeeIDInput.value = wishToUpdate.associated_employee_id;
    updateGameIDInput.value = wishToUpdate.game_id;
    updateDateWishedInput.value = convertFormFriendlyDateString(wishToUpdate.date_wished_formatted);
}

updateWishForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    formData = {
        wishID: wishToUpdate.wish_id,
        employeeID: updateEmployeeIDInput.value,
        gameID: updateGameIDInput.value,
        dateWished: updateDateWishedInput.value
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
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});
