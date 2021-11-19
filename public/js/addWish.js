let addEmployeeForm = document.getElementById('add-wish-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    let gameIDInput = document.getElementById('gameID');
    let employeeFirstNameInput = document.getElementById('employeeFirstName');
    let employeeLastNameInput = document.getElementById('employeeLastName');
    let dateWishedInput = document.getElementById('dateWished');
    let fulfilledInput = document.getElementById('fulfilled');

    let formData = {
        gameID: gameIDInput.value,
        employeeFirstName: employeeFirstNameInput.value,
        employeeLastName: employeeLastNameInput.value,
        dateWished: dateWishedInput.value,
        fulfilled: fulfilledInput.checked
    }

    let formFields = [gameIDInput, employeeFirstNameInput, employeeLastNameInput, dateWishedInput, fulfilledInput]

    // Set up AJAX request
    let req = new XMLHttpRequest();
    req.open('POST', '/wishes/add-wish', true);
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

    let wishesTable = document.getElementById('wishes-table-body');
    let insertedRowId = responseData.insertId;
    
    let row = document.createElement('tr');
    let padCell = document.createElement('th');
    let deleteCheckboxCell = document.createElement('td');
    let wishIDCell = document.createElement('td');
    let gameIDCell = document.createElement('td');
    let gameTitleCell = document.createElement('td');
    let associatedEmployeeIDCell = document.createElement('td');
    let employeeNameCell = document.createElement('td');
    let dateWishedCell = document.createElement('td');
    let fulfilledCell = document.createElement('td');

    // Fill cells with data
    deleteCheckboxCell.innerHTML = '<input class="form-check-input" type="checkbox">'
    deleteCheckboxCell.scope = 'row';
    wishIDCell.innerText = insertedRowId;
    gameIDCell.innerText = formData.gameID;
    gameTitleCell.innerText = 'TODO';
    associatedEmployeeIDCell.innerText = 'TODO';
    employeeNameCell.innerText = formData.employeeFirstName + ' ' + formData.employeeLastName;
    dateWishedCell.innerText = formData.dateWished;
    
    if (formData.fulfilled) {
        fulfilledCell.innerHTML = '<span class="fa fa-check-circle-o green"></span><span class="ms-1">Yes</span>'
    } else {
        fulfilledCell.innerHTML = '<span class="fa fa-dot-circle-o text-danger"></span><span class="ms-1">No</span>'
    }

    cells = [padCell, deleteCheckboxCell, wishIDCell, gameIDCell, gameTitleCell, associatedEmployeeIDCell, employeeNameCell, dateWishedCell, fulfilledCell];
    cells.forEach(cell => row.appendChild(cell));

    wishesTable.appendChild(row);

}

clearForm = (fields) => {
    fields.forEach(field => field.value = '');
}