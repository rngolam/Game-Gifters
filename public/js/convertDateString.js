// Expects date string in YYYY-MM-DD format
convertDateString = (dateString) => {

    if (!dateString) {
        return;
    }

    const splitDate = dateString.split('-');
    
    let year = parseInt(splitDate[0])
    let month = parseInt(splitDate[1])
    let day = parseInt(splitDate[2])

    return month + '/' + day + '/' + year
}