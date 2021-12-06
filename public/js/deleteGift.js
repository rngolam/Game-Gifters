const deleteGiftForm = document.querySelector("#delete-gift-form");

deleteGiftForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get selected IDs
    const deleteIDs = [];
    const toDelete = document.querySelectorAll(
        "input[name=delete-row]:checked"
    );

    if (toDelete.length === 0) {
        closeModal("delete-modal");
        return;
    }

    toDelete.forEach((row) => deleteIDs.push(row.value));

    formData = {
        deleteIDs: deleteIDs,
    };

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/gifts/", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("X-HTTP-Method-Override", "DELETE");

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
