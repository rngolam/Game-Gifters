const deleteWishForm = document.querySelector("#delete-wish-form");

deleteWishForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get selected IDs
    const deleteIDs = [];
    const toDelete = document.querySelectorAll("input[name=deleteRow]:checked");

    if (toDelete.length === 0) {
        close2();
        return;
    }

    toDelete.forEach((row) => deleteIDs.push(row.value));

    formData = {
        deleteIDs: deleteIDs,
    };

    console.log(formData);

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/wishes/delete-wish", true);
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
