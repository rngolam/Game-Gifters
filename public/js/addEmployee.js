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

    let data = {
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
            console.log('Success!');
        
        }
        
        else if (req.readyState == 4 && req.status != 200) {
            console.log('There was an error with the input.');
        }
    }

    req.send(JSON.stringify(data));

});