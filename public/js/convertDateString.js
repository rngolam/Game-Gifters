// Expects date string in YYYY-MM-DD format
function convertDateString(dateString) {

    if (!dateString) {
        return;
    }

    const splitDate = dateString.split('-');
    
    const year = parseInt(splitDate[0])
    const month = parseInt(splitDate[1])
    const day = parseInt(splitDate[2])

    return month + '/' + day + '/' + year;
}

function convertFormFriendlyDateString(dateStringFromServer) {

    if (!dateStringFromServer) {
        return;
    }

    const splitDate = dateStringFromServer.split('/');
    const month = splitDate[0].padStart(2, '0');
    const day = splitDate[1].padStart(2, '0');
    const year = splitDate[2].padStart(4, '0');

    return year + '-' + month + '-' + day;
}