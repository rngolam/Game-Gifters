function showModal(modalID, rowID, populateFunction) {
    document.querySelector("#" + modalID).style.display = "block";

    if (rowID && populateFunction) {
        populateFunction(rowID);
    }
}

window.onclick = function (event) {
    // user clicks outside of modal
    if (event.target.className == "modal") {
        event.target.style.display = "none";
    }
};

function closeModal(modalID) {
    document.querySelector("#" + modalID).style.display = "none";
}
