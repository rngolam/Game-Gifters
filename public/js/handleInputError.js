function handleInputError(error, spanID) {
    console.log("There was an error with the input.");

    const span = document.querySelector(`#${spanID}`);
    span.innerText = `There was an error in the form. Please try again.

    Error Code: ${error.code}
    Message: ${error.sqlMessage}`;
}
