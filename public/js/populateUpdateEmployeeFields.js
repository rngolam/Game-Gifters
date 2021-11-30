const employeeMap = new Map();

if (employeeInfo) {
    employeeInfo.forEach(employee => employeeMap.set(employee.employee_id, employee));
}

const updateEmployeeForm = document.querySelector('#update-employee-form');

function populateEmployeeFields(id) {

    const employee = employeeMap.get(id);

    const updateFirstNameInput = document.querySelector('#update-first-name');
    const updateLastNameInput = document.querySelector('#update-last-name');
    const updateEmailInput = document.querySelector('#update-email');
    const updateDepartmentInput = document.querySelector('#update-department');
    const updatePhoneInput = document.querySelector('#update-phone');
    const updateBirthdateInput = document.querySelector('#update-birthdate');

    updateFirstNameInput.value = employee.first_name;
    updateLastNameInput.value = employee.last_name;
    updateEmailInput.value = employee.email;
    updateDepartmentInput.value = employee.department;
    updatePhoneInput.value = employee.phone;
    console.log(convertFormFriendlyDateString(employee.formatted_date_of_birth));
    updateBirthdateInput.value = convertFormFriendlyDateString(employee.formatted_date_of_birth);
}