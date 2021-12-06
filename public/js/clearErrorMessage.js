function clearErrorMessage() {
    const spans = document.querySelectorAll(".error");
    spans.forEach(function(span) {
        span.innerText = "";
    });
}