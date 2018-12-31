/* Foursquare api */
let clientID = "NNJPH2TSHWCDQM5T4KLADPREOKVVZZYA0BWL4FBEOGZ1WKTC";
let clientSecret = "HZVBH2XYU5CSDTXEGBV3FEZ2ATUDNI3IJVRDPTBVCOOJD2NP";
let authenticationParameter = "&client_id=" + clientID + "&client_secret=" + clientSecret;
let versionDate = "&v=20181229"

// Search for Venues
function searchForVenues(marker) {
    let query = marker.title;
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    let ll = `${lat},${lng}`;
    let url = "https://api.foursquare.com/v2/venues/search" +
        `?ll=${ll}` + 
        `&query=${query}` + authenticationParameter + versionDate;
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
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(`Unable to complete the Fourqure API request for \"Details of Venue\"! (error:${xhr.responseJSON.meta.errorType})`)
        }
    })
}

// Get Photo of Venue
function getVenuePhoto(venueID) {
    let url = "https://api.foursquare.com/v2/venues/" + venueID + "/photos?" +
        authenticationParameter + versionDate;
    return $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: url,
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(`Unable to complete the Fourqure API request for \"Photos of Venue\"! (error:${xhr.responseJSON.meta.errorType})`)
        }
    })
}