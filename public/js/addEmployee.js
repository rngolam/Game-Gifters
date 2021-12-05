const addEmployeeForm = document.getElementById("add-employee-form");

addEmployeeForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const departmentInput = document.getElementById("department");
    const phoneInput = document.getElementById("phone");
    const birthdateInput = document.getElementById("birthdate");

    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        department: departmentInput.value,
        phone: phoneInput.value,
        birthdate: birthdateInput.value,
    };

    const formFields = [
        firstNameInput,
        lastNameInput,
        emailInput,
        departmentInput,
        phoneInput,
        birthdateInput,
    ];

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/employees/", true);
    req.setRequestHeader("Content-type", "application/json");

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const responseData = JSON.parse(req.response);
            const insertedRowId = responseData.insertId;
            addRowToTable(formData, insertedRowId);
            addEmployeeToMap(formData, insertedRowId);
            clearForm(formFields);
            closeModal("addModal");
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});

function addRowToTable(formData, insertedRowId) {
    const employeeTable = document.getElementById("employees-table-body");
    const row = employeeTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const idCell = document.createElement("td");
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const departmentCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const dobCell = document.createElement("td");
    const updateCell = document.createElement("td");

    // Fill cells with data
    idCell.innerText = insertedRowId;
    firstNameCell.innerText = formData.firstName;
    lastNameCell.innerText = formData.lastName;
    departmentCell.innerText = formData.department;
    emailCell.innerText = formData.email;
    phoneCell.innerText = formData.phone;
    dobCell.innerText = convertDateString(formData.birthdate);

    updateCell.innerHTML = `<a href="#" onclick="showModal('updateModal', ${insertedRowId}, populateUpdateEmployeeFields)">Update</a>`;

    cells = [
        idCell,
        firstNameCell,
        lastNameCell,
        departmentCell,
        emailCell,
        phoneCell,
        dobCell,
        updateCell,
    ];
    cells.forEach((cell) => row.appendChild(cell));
}

function addEmployeeToMap(formData, insertedRowId) {
    addedEmployee = {
        employee_id: insertedRowId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        department: formData.department,
        phone: formData.phone,
        formatted_date_of_birth: convertDateString(formData.birthdate),
    };

    employeeMap.set(addedEmployee.employee_id, addedEmployee);
}
