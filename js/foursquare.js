/* Foursquare api */
let clientID = "NNJPH2TSHWCDQM5T4KLADPREOKVVZZYA0BWL4FBEOGZ1WKTC";
let clientSecret = "JXX45EHZNRK31OPUBOHVTW4HDFNTESIJJ5LLTIHBWQ3IHCMY";
let authenticationParameter = "&client_id=" + clientID + "&client_secret=" + clientSecret;
let versionDate = "&v=20181229"

searchForVenues().then(function (result) {
    console.log(result);
    let venueID = result.response.venues[0].id;
    getVenueDetails(venueID);
});

// Search for Venues
function searchForVenues() {
    let url = "https://api.foursquare.com/v2/venues/search" +
        "?ll=52.0892494,4.2798414" +
        "&query=Omniversum" + authenticationParameter + versionDate;
    return $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: url,
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(`Unable to complete the Fourqure API request for \"Search for Venues\"! (error:${xhr.responseJSON.meta.errorType})`);
        }
    });
}

// Get Details of Venue
function getVenueDetails(venueID) {
    let url = "https://api.foursquare.com/v2/venues/" + venueID + "?" +
        authenticationParameter + versionDate;
    return $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: url,
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(`Unable to complete the Fourqure API request for \"Details of Venue\"! (error:${xhr.responseJSON.meta.errorType})`)
        }
    })
}