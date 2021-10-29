var addModal = document.getElementById("modalBox1");
var updateModal = document.getElementById("modalBox2");
var filterModal = document.getElementById("modalBox3");

function addEntry() { // user clicks on action button
    addModal.style.display = "block";
}

function updateEntry() { // user clicks on action button
    updateModal.style.display = "block";
}

function filter() { // user clicks on action button
    filterModal.style.display = "block";
}

window.onclick = function(event) { // user clicks outside of (x)
    if (event.target == addModal) {
        addModal.style.display = "none";
    } else if (event.target == updateModal) {
        updateModal.style.display = "none";
    } else if (event.target == filterModal) {
        filterModal.style.display = "none";
    } 
}


function close1() {
    addModal.style.display = "none";
}

function close2() {
    updateModal.style.display = "none";
}

function close3() {
    filterModal.style.display = "none";
}