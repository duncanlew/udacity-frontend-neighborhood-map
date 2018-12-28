let map;

function initMap() {
    let headingHeight = $("#heading").outerHeight(true);
    let windowHeight = $(window).outerHeight(true);
    let mapsHeight = windowHeight - headingHeight;
    $("#map").height(mapsHeight);
    map = new google.maps.Map($('#map')[0], {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}