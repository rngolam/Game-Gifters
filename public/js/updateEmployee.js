const employeeMap = new Map();
let updateFirstNameInput;
let updateLastNameInput;
let updateEmailInput;
let updateDepartmentInput;
let updatePhoneInput;
let updateBirthdateInput;
let employeeToUpdate;

window.addEventListener("load", () => {

    if (employeeInfo) {
        employeeInfo.forEach((employee) =>
            employeeMap.set(employee.employee_id, employee)
        );
    }    

    const updateEmployeeForm = document.querySelector("#update-employee-form");
    updateFirstNameInput = document.querySelector("#update-first-name");
    updateLastNameInput = document.querySelector("#update-last-name");
    updateEmailInput = document.querySelector("#update-email");
    updateDepartmentInput = document.querySelector("#update-department");
    updatePhoneInput = document.querySelector("#update-phone");
    updateBirthdateInput = document.querySelector("#update-birthdate");

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
        req.open("POST", "/employees/", true);
        req.setRequestHeader("Content-type", "application/json");
        req.setRequestHeader("X-HTTP-Method-Override", "PUT");

        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                const responseData = JSON.parse(req.response);
                window.location.reload();
            } else if (req.readyState == 4 && req.status != 200) {
                const responseData = JSON.parse(req.response);
                handleInputError(responseData, "update-error-message");
            }
        };

        req.send(JSON.stringify(formData));
    });
});

function populateUpdateEmployeeFields(id) {
    employeeToUpdate = employeeMap.get(id);

    updateFirstNameInput.value = employeeToUpdate.first_name;
    updateLastNameInput.value = employeeToUpdate.last_name;
    updateEmailInput.value = employeeToUpdate.email;
    updateDepartmentInput.value = employeeToUpdate.department;
    updatePhoneInput.value = employeeToUpdate.phone;
    updateBirthdateInput.value = convertFormFriendlyDateString(
        employeeToUpdate.formatted_date_of_birth
    );
}
