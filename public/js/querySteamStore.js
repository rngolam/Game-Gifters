let resultsCount;
let resultsTable;
let resultsTableBody;
let searchQueryInput;

window.addEventListener("load", () => {
    const querySteamStoreForm = document.querySelector(
        "#search-steam-store-form"
    );

    resultsCount = document.querySelector("#results-count");
    resultsTable = document.querySelector("#results-table");
    resultsTableBody = document.querySelector("#steam-search-table-body");

    querySteamStoreForm.addEventListener("submit", function (event) {
        // Prevent form from submitting
        event.preventDefault();

        // Need to use reverse proxy due to CORS policies
        searchQueryInput = document.querySelector("#steam-store-query");
        const searchQuery = searchQueryInput.value;

        // Set up AJAX request
        const req = new XMLHttpRequest();
        req.open("GET", `/games/search?q=${searchQuery}`, true);
        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                const responseData = JSON.parse(req.responseText);
                clearResultsTable();
                populateResultsTable(responseData.items);
            } else if (req.readyState == 4 && req.status != 200) {
                const responseData = JSON.parse(req.responseText);
                handleInputError(responseData, "search-error-message");
            }
        };

        req.send(null);
    });
});

function populateResultsTable(items) {
    resultsCount.style.display = "block";
    document.querySelector(
        "#results-count"
    ).textContent = `${items.length} result(s) found`;

    if (items.length > 0) {
        items.forEach((item) => {
            resultsTable.style.display = "block";

            const row = document.createElement("tr");

            const addButtonCell = document.createElement("td");
            const thumbnailCell = document.createElement("td");
            const appIDCell = document.createElement("td");
            const titleCell = document.createElement("td");
            const priceCell = document.createElement("td");

            let price;
            if (item.price) {
                price = (item.price.final / 100).toFixed(2);
            } else {
                price = (0).toFixed(2);
            }

            // Fill cells with data
            const addButton = document.createElement("button");
            addButton.setAttribute("class", "btn btn-primary mb-3");
            addButton.setAttribute("id", `b${item.id}`);
            addButton.innerText = "+";

            addButton.addEventListener("click", function (event) {
                event.preventDefault();

                appIDInput.value = item.id;
                titleInput.value = item.name;
                priceInput.value = price;

                document
                    .querySelector("#add-game-form")
                    .dispatchEvent(new Event("submit"));
            });

            addButtonCell.appendChild(addButton);

            thumbnailCell.innerHTML = `<img class="thumbnail" src="${item.tiny_image}">`;
            appIDCell.innerText = item.id;
            titleCell.innerText = item.name;
            priceCell.innerText = `$${price}`;

            cells = [
                addButtonCell,
                thumbnailCell,
                appIDCell,
                titleCell,
                priceCell,
            ];
            cells.forEach((cell) => row.appendChild(cell));
            resultsTableBody.appendChild(row);
        });
    }
}

function clearResultsTable() {
    resultsCount.style.display = "none";
    resultsTable.style.display = "none";

    // Clear body of results table
    while (resultsTableBody.firstChild) {
        resultsTableBody.removeChild(resultsTableBody.firstChild);
    }
}
