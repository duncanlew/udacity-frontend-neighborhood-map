/* Foursquare api */
let clientID = "NNJPH2TSHWCDQM5T4KLADPREOKVVZZYA0BWL4FBEOGZ1WKTC";
let clientSecret = "JXX45EHZNRK31OPUBOHVTW4HDFNTESIJJ5LLTIHBWQ3IHCMY";

let url = "https://api.foursquare.com/v2/venues/" +
    "search?ll=40.7484,-73.9857" +
    "&client_id=" + clientID +
    "&client_secret=" + clientSecret +
    "&v=20181229";

$.ajax({
    type: "GET",
    dataType: "json",
    cache: false,
    url: url,
    success: function (result) {
        console.log(result);
    },
    error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        alert("Unable to complete the Fourqure API request. Please check log!")
    }
})