const updateEmployeeForm = document.querySelector("#update-employee-form");
const updateFirstNameInput = document.querySelector("#update-first-name");
const updateLastNameInput = document.querySelector("#update-last-name");
const updateEmailInput = document.querySelector("#update-email");
const updateDepartmentInput = document.querySelector("#update-department");
const updatePhoneInput = document.querySelector("#update-phone");
const updateBirthdateInput = document.querySelector("#update-birthdate");
const employeeMap = new Map();
let employeeToUpdate;

if (employeeInfo) {
    employeeInfo.forEach((employee) =>
        employeeMap.set(employee.employee_id, employee)
    );
}

function populateUpdateEmployeeFields(id) {
    employeeToUpdate = employeeMap.get(id);

    updateFirstNameInput.value = employeeToUpdate.first_name;
    updateLastNameInput.value = employeeToUpdate.last_name;
    updateEmailInput.value = employeeToUpdate.email;
    updateDepartmentInput.value = employeeToUpdate.department;
    updatePhoneInput.value = employeeToUpdate.phone;
    console.log(
        convertFormFriendlyDateString(employeeToUpdate.formatted_date_of_birth)
    );
    updateBirthdateInput.value = convertFormFriendlyDateString(
        employeeToUpdate.formatted_date_of_birth
    );
}

updateEmployeeForm.addEventListener("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get values from form fields

    formData = {
        employeeID: employeeToUpdate.employee_id,
        firstName: updateFirstNameInput.value,
        lastName: updateLastNameInput.value,
        email: updateEmailInput.value,
        department: updateDepartmentInput.value,
        phone: updatePhoneInput.value,
        birthdate: updateBirthdateInput.value,
    };

    // Set up AJAX request
    const req = new XMLHttpRequest();
    req.open("POST", "/employees/update-employee", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("X-HTTP-Method-Override", "PUT");

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const responseData = JSON.parse(req.response);
            window.location.reload();
        } else if (req.readyState == 4 && req.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    req.send(JSON.stringify(formData));
});
