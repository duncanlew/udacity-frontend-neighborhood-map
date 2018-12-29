let map;

function initMap() {
    let headingHeight = $("#heading").outerHeight(true);
    let windowHeight = $(window).outerHeight(true);
    let mapsHeight = windowHeight - headingHeight;
    $("#map").height(mapsHeight);
    map = new google.maps.Map($('#map')[0], {
        center: {
            lat: 52.0762472,
            lng: 4.2877023
        },
        zoom: 13,
        styles: styles
    });
}