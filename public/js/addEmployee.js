let addEmployeeForm = document.getElementById('add-employee-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    let firstNameValue = document.getElementById('firstName').value;
    let lastNameValue = document.getElementById('lastName').value;
    let emailValue = document.getElementById('email').value;
    let departmentValue = document.getElementById('department').value;
    let phoneValue = document.getElementById('phone').value;
    let birthdateValue = document.getElementById('birthdate').value;

    let formData = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        department: departmentValue,
        phone: phoneValue,
        birthdate: birthdateValue
    }

    // Set up AJAX request
    let req = new XMLHttpRequest();
    req.open('POST', '/employees/add-employee', true);
    req.setRequestHeader('Content-type', 'application/json');

    req.onreadystatechange = () => {

        if (req.readyState == 4 && req.status == 200) {
            
            let responseData = JSON.parse(req.response);
            addRowToTable(formData, responseData);
            close1();
        
        }
        
        else if (req.readyState == 4 && req.status != 200) {
            console.log('There was an error with the input.');
        }
    }

    req.send(JSON.stringify(formData));

});

addRowToTable = (formData, responseData) => {

    let employeeTable = document.getElementById('employee-table-body');
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