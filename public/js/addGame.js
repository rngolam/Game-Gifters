let addEmployeeForm = document.getElementById('add-game-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    let appIDInput = document.getElementById('appID');
    let titleInput = document.getElementById('title');
    let priceInput = document.getElementById('price');

    let formData = {
        appID: appIDInput.value,
        title: titleInput.value,
        price: priceInput.value,
    }

    let formFields = [appIDInput, titleInput, priceInput]

    // Set up AJAX request
    let req = new XMLHttpRequest();
    req.open('POST', '/games/add-game', true);
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

    let gamesTable = document.getElementById('games-table-body');
    
    let row = document.createElement('tr');
    let padCell = document.createElement('td');
    let updateCell = document.createElement('td');
    let idCell = document.createElement('td');
    let titleCell = document.createElement('td');
    let priceCell = document.createElement('td');

    // Fill cells with data
    updateCell.innerHTML = '<a href="#" onclick="updateEntry()">Update</a>';
    idCell.innerText = formData.appID;
    titleCell.innerText = formData.title;
    priceCell.innerText = '$' + formData.price;

    cells = [padCell, updateCell, idCell, titleCell, priceCell];
    cells.forEach(cell => row.appendChild(cell));

    gamesTable.appendChild(row);

}

clearForm = (fields) => {
    fields.forEach(field => field.value = '');
}