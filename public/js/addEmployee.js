const addEmployeeForm = document.querySelector("#add-employee-form");

addEmployeeForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const firstNameInput = document.querySelector("#first-name");
    const lastNameInput = document.querySelector("#last-name");
    const emailInput = document.querySelector("#email");
    const departmentInput = document.querySelector("#department");
    const phoneInput = document.querySelector("#phone");
    const birthdateInput = document.querySelector("#birthdate");

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
            closeModal("add-modal");
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});

function addRowToTable(formData, insertedRowId) {
    const employeeTable = document.querySelector("#employees-table-body");
    const row = employeeTable.insertRow(0);
    row.style.backgroundColor = "#c7e5ff";

    const deleteCheckboxCell = document.createElement("td");
    const updateCell = document.createElement("td");
    const idCell = document.createElement("td");
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const departmentCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const dobCell = document.createElement("td");

    // Fill cells with data
    deleteCheckboxCell.innerHTML = `<input class="form-check-input" type="checkbox" name="delete-row" value="${insertedRowId}">`;
    deleteCheckboxCell.scope = "row";
    updateCell.innerHTML = `<a class="update" href="#" onclick="showModal('update-modal', ${insertedRowId}, populateUpdateEmployeeFields)">&#128221;</a>`;
    idCell.innerText = insertedRowId;
    firstNameCell.innerText = formData.firstName;
    lastNameCell.innerText = formData.lastName;
    departmentCell.innerText = formData.department;
    emailCell.innerText = formData.email;
    phoneCell.innerText = formData.phone;
    dobCell.innerText = convertDateString(formData.birthdate);

    cells = [
        deleteCheckboxCell,
        updateCell,
        idCell,
        firstNameCell,
        lastNameCell,
        departmentCell,
        emailCell,
        phoneCell,
        dobCell,
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
