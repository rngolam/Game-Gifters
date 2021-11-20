const addEmployeeForm = document.getElementById('add-game-form');

addEmployeeForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const appIDInput = document.getElementById('appID');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');

    const formData = {
        appID: appIDInput.value,
        title: titleInput.value,
        price: priceInput.value,
    }

    const formFields = [appIDInput, titleInput, priceInput]

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open('POST', '/games/add-game', true);
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

addRowToTable = (formData, responseData) => {

    const gamesTable = document.getElementById('games-table-body');
    
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const titleCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const updateCell = document.createElement('td');

    // Fill cells with data
    idCell.innerText = formData.appID;
    titleCell.innerText = formData.title;
    priceCell.innerText = '$' + formData.price;
    updateCell.innerHTML = '<a href="#" onclick="updateEntry()">Update</a>';

    cells = [idCell, titleCell, priceCell, updateCell];
    cells.forEach(cell => row.appendChild(cell));

    gamesTable.appendChild(row);

}

clearForm = (fields) => {
    fields.forEach(field => field.value = '');
}