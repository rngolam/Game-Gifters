const addEmployeeForm = document.getElementById('add-wish-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const gameIDInput = document.getElementById('gameID');
    const employeeIDInput = document.getElementById('employeeID');
    // const employeeFirstNameInput = document.getElementById('employeeFirstName');
    // const employeeLastNameInput = document.getElementById('employeeLastName');
    const dateWishedInput = document.getElementById('dateWished');
    // const fulfilledInput = document.getElementById('fulfilled');

    const formData = {
        gameID: getHiddenID('gameTitles', 'gameID'),
        employeeID: getHiddenID('employeeNames', 'employeeID'),
        dateWished: dateWishedInput.value,
    }

    const formFields = [gameIDInput, employeeIDInput, dateWishedInput]

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open('POST', '/wishes/add-wish', true);
    req.setRequestHeader('Content-type', 'application/json');

    req.onreadystatechange = () => {

        if (req.readyState == 4 && req.status == 200) {
            
            const responseData = JSON.parse(req.response);
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

function addRowToTable (formData, responseData) {

    const wishesTable = document.getElementById('wishes-table-body');
    const row = wishesTable.insertRow(0)
    row.style.backgroundColor = '#c7e5ff';

    const insertedRowId = responseData.insertId;
    
    const padCell = document.createElement('th');
    const deleteCheckboxCell = document.createElement('td');
    const wishIDCell = document.createElement('td');
    const gameIDCell = document.createElement('td');
    const gameTitleCell = document.createElement('td');
    const associatedEmployeeIDCell = document.createElement('td');
    const employeeNameCell = document.createElement('td');
    const dateWishedCell = document.createElement('td');
    const fulfilledCell = document.createElement('td');

    // Fill cells with data
    deleteCheckboxCell.innerHTML = '<input class="form-check-input" type="checkbox">'
    deleteCheckboxCell.scope = 'row';
    wishIDCell.innerText = insertedRowId;
    gameIDCell.innerText = formData.gameID;
    gameTitleCell.innerText = document.getElementById('gameID').value;
    associatedEmployeeIDCell.innerText = formData.employeeID;
    employeeNameCell.innerText =  document.getElementById('employeeID').value
    dateWishedCell.innerText = convertDateString(formData.dateWished);
    fulfilledCell.innerHTML = '<span class="fa fa-dot-circle-o text-danger"></span><span class="ms-1">No</span>'
    
    // if (formData.fulfilled) {
    //     fulfilledCell.innerHTML = '<span class="fa fa-check-circle-o green"></span><span class="ms-1">Yes</span>'
    // } else {
    //     fulfilledCell.innerHTML = '<span class="fa fa-dot-circle-o text-danger"></span><span class="ms-1">No</span>'
    // }

    cells = [padCell, deleteCheckboxCell, wishIDCell, gameIDCell, gameTitleCell, associatedEmployeeIDCell, employeeNameCell, dateWishedCell, fulfilledCell];
    cells.forEach(cell => row.appendChild(cell));
}

function getHiddenID (listID, formID) {

    // Get currently selected datalist option string
    const selectedString = $('#' + formID).val();

    // First retrieves datalist option node in DOM where the displayed label = value, then access
    // the option's hidden data-value attribute
    return $('#' + listID + ' ' + '[value="' + selectedString + '"]').data('value');
}

function clearForm (fields) {
    fields.forEach(field => field.value = '');
}