function addEntry() {
    // user clicks on action button
    document.getElementById("modalBox1").style.display = "block";
}

function updateEntry(id) {
    // user clicks on action button
    document.getElementById("modalBox2").style.display = "block";
    populateUpdateEmployeeFields(id);
}

function filter() {
    // user clicks on action button
    document.getElementById("modalBox3").style.display = "block";
}

window.onclick = function (event) {
    // user clicks outside of (x)
    if (event.target == document.getElementById("modalBox1")) {
        document.getElementById("modalBox1").style.display = "none";
    } else if (event.target == document.getElementById("modalBox2")) {
        document.getElementById("modalBox2").style.display = "none";
    } else if (event.target == document.getElementById("modalBox3")) {
        document.getElementById("modalBox3").style.display = "none";
    }
};

function close1() {
    document.getElementById("modalBox1").style.display = "none";
}

function close2() {
    document.getElementById("modalBox2").style.display = "none";
}

function close3() {
    document.getElementById("modalBox3").style.display = "none";
}
