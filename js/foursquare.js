/* Foursquare api */
const CLIENT_ID = "NNJPH2TSHWCDQM5T4KLADPREOKVVZZYA0BWL4FBEOGZ1WKTC";
const CLIENT_SECRET = "HZVBH2XYU5CSDTXEGBV3FEZ2ATUDNI3IJVRDPTBVCOOJD2NP";
const AUTHENTICATION_PARAMETER = "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
const versionDate = "&v=20181229";

// Search for Venues
function searchForVenues(marker) {
    let query = marker.title;
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    let ll = `${lat},${lng}`;
    let url = "https://api.foursquare.com/v2/venues/search" +
        `?ll=${ll}` + 
        `&query=${query}` + AUTHENTICATION_PARAMETER + versionDate;
    return $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: url,
        error: function (error) {
            console.log(error);
            alert(`Unable to complete the Fourqure API request for \"Search for Venues\"! (error:${error})`);
        }
    });
}