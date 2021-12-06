function handleInputError(error, spanID) {
    if (spanID !== "search-error-message") {
        console.log("There was an error with the input.");

        const span = document.querySelector(`#${spanID}`);
        span.innerText = `There was an error in the form. Please try again.

        Error Code: ${error.code}
        Message: ${error.sqlMessage}`;
    } else {
        console.log("Error querying the Steam Store. Please try again later.");
        
        document.querySelector("#search-error-message").innerText =
            "Error querying the Steam Store. Please try again later.";
    }
}
