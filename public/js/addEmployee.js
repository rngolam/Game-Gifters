let addEmployeeForm = document.getElementById('add-employee-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let emailInput = document.getElementById('email');
    let departmentInput = document.getElementById('department');
    let phoneInput = document.getElementById('phone');
    let birthdateInput = document.getElementById('birthdate');

    let formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        department: departmentInput.value,
        phone: phoneInput.value,
        birthdate: birthdateInput.value
    }

    let formFields = [firstNameInput, lastNameInput, emailInput, departmentInput, phoneInput, birthdateInput]

    // Set up AJAX request
    let req = new XMLHttpRequest();
    req.open('POST', '/employees/add-employee', true);
    req.setRequestHeader('Content-type', 'application/json');

    req.onreadystatechange = () => {

        if (req.readyState == 4 && req.status == 200) {
            
            let responseData = JSON.parse(req.response);
            addRowToTable(formData, responseData);
            clearForm(formFields);
            close1();
        
        }
        
        else if (req.readyState == 4 && req.status != 200) {
            console.log('There was an error with the input.');
        }
    }

    req.send(JSON.stringify(formData));

});

addRowToTable = (formData, responseData) => {

    let employeeTable = document.getElementById('employees-table-body');
    let insertedRowId = responseData.insertId;
    
    let row = document.createElement('tr');
    let padCell = document.createElement('td');
    let updateCell = document.createElement('td');
    let idCell = document.createElement('td');
    let firstNameCell = document.createElement('td');
    let lastNameCell = document.createElement('td');
    let departmentCell = document.createElement('td');
    let emailCell = document.createElement('td');
    let phoneCell = document.createElement('td');
    let dobCell = document.createElement('td');

    // Fill cells with data
    updateCell.innerHTML = '<a href="#" onclick="updateEntry()">Update</a>';
    idCell.innerText = insertedRowId;
    firstNameCell.innerText = formData.firstName;
    lastNameCell.innerText = formData.lastName;
    departmentCell.innerText = formData.department;
    emailCell.innerText = formData.email;
    phoneCell.innerText = formData.phone;
    dobCell.innerText = formData.birthdate;

    cells = [padCell, updateCell, idCell, firstNameCell, lastNameCell, departmentCell, emailCell, phoneCell, dobCell];
    cells.forEach(cell => row.appendChild(cell));

    employeeTable.appendChild(row);

}

clearForm = (fields) => {
    fields.forEach(field => field.value = '');
}