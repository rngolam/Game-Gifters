function showModal(modalID, rowID, populateFunction) {
    document.querySelector("#" + modalID).style.display = "block";

    if (rowID && populateFunction) {
        populateFunction(rowID);
    }
}

window.onclick = function (event) {
    // user clicks outside of modal
    if (event.target.className == "modal") {
        closeModal(event.target.id);
    }
};

function closeModal(modalID, clearResultsTableFunction) {
    document.querySelector("#" + modalID).style.display = "none";
    clearErrorMessage();

    if (clearResultsTableFunction) {
        clearResultsTableFunction();
    }
}
