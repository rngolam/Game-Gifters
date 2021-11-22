const addGiftForm = document.getElementById('add-gift-form');

addGiftForm.addEventListener('submit', function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields
    const wishIDInput = document.getElementById('wishID');
    const senderIDInput = document.getElementById('senderID');
    const dateSentInput = document.getElementById('dateSent');

    const formData = {
        wishID: wishIDInput.value,
        senderID: senderIDInput.value,
        dateSent: dateSentInput.value,
    }

    const formFields = [wishIDInput, senderIDInput, dateSentInput]

    // SsenderAX request
    const req = new XMLHttpRequest();
    req.open('POST', '/gifts/add-gift', true);
    req.setRequestHeader('Content-type', 'application/json');

    console.log(formData);

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

    const giftsTable = document.getElementById('gifts-table-body');
    const row = giftsTable.insertRow(0)
    row.style.backgroundColor = '#c7e5ff';

    const insertedRowId = responseData.insertId;
    
    const giftIDCell = document.createElement('td');
    const wishIDCell = document.createElement('td');
    const gameTitleCell = document.createElement('td');
    const senderIDCell = document.createElement('td');
    const senderNameCell = document.createElement('td');
    const recipientNameCell = document.createElement('td');
    const dateSentCell = document.createElement('td');

    // Fill cells with data
    giftIDCell.innerText = insertedRowId;
    wishIDCell.innerText = formData.wishID;
    gameTitleCell.innerText = 'TODO';
    senderIDCell.innerText = formData.senderID;
    senderNameCell.innerText = 'TODO';
    recipientNameCell.innerText = 'TODO';
    dateSentCell.innerText = convertDateString(formData.dateSent);

    cells = [giftIDCell, wishIDCell, gameTitleCell, senderIDCell, senderNameCell, recipientNameCell, dateSentCell];
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