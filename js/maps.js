let map;
let infoWindow;
let markers = [];
let startingLocation = {
    title: "The Hague",
    position: {
        lat: 52.0762472,
        lng: 4.2877023
    },
    zoom: 13
};


function initMap() {
    // Calculate size of map to fit viewport
    setMapCorrectHeight();

    // Creation of map object
    map = new google.maps.Map($("#map")[0], {
        center: startingLocation.position,
        zoom: startingLocation.zoom,
        styles: styles
    });

    // Create markers for the map
    infoWindow = new google.maps.InfoWindow();
    createMarkers();

    google.maps.event.addListenerOnce(map, "idle", function () {
        // Start Knockout after Google Maps has been loaded
        startKnockout();
    });

    // listen for the window resize event & trigger Google Maps to update too
    $(window).resize(function () {
        setMapCorrectHeight();
        setMapCorrectWidth();
    });
}

function setMapCorrectHeight() {
    let headingHeight = $("#heading").outerHeight(true);
    let windowHeight = $(window).outerHeight(true);
    let mapsHeight = windowHeight - headingHeight;
    $("#map").height(mapsHeight);
    google.maps.event.trigger(map, "resize");
}

function setMapCorrectWidth(isSidebarClosed) {
    if ($(window).width() >= 768) {
        let sidebarWidth = parseInt($(":root").css("--width-sidebar"));
        let windowWidth = $(window).outerWidth(true);
        let mapWidth = isSidebarClosed ? (windowWidth - sidebarWidth) : "100%";
        $("#map").width(mapWidth);
        google.maps.event.trigger(map, "resize");
    }

}

function createMarkers() {
    for (let i = 0; i < locations.length; i++) {
        let position = locations[i].position;
        let title = locations[i].title;

        let marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
        });
        getAddress(marker);

        marker.addListener('click', function () {
            populateInfoWindow(this);
            bounceMarker(this);
        });
        markers.push(marker);
    }
}

function populateInfoWindow(marker) {
    let contentString = `<div class="info-window">
    <div class="text-location">
    <h1>${marker.title}</h1>  
    <p>${marker.address}</p>
    <p>${marker.zipCode}</p>
    <p>${marker.country}</p>
    <p class="footer">Address from Fourquare</p>
    </div>
    </div>`;
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);

        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        });
    }
}

function zoomToArea(marker) {
    map.panTo(marker.position);
    map.setZoom(15);
}

function recenterMap() {
    map.panTo(startingLocation.position);
    map.setZoom(startingLocation.zoom);
}

function fitMapToMarkers() {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].getMap()) {
            bounds.extend(markers[i].position);
        }
    }

    // Don't zoom in too far on only one marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
    }
    map.fitBounds(bounds);
}

function bounceMarker(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 1000);
}

function getAddress(marker) {
    // Default values for properties
    marker.address = "Address is not available";
    marker.zipCode = "Zipcode is not available";
    marker.country = "Country is not available";
    searchForVenues(marker).then(function (result) {
        if (result.response.venues[0].location.formattedAddress) marker.address = result.response.venues[0].location.formattedAddress[0];
        if (result.response.venues[0].location.formattedAddress) marker.zipCode = result.response.venues[0].location.formattedAddress[1];
        if (result.response.venues[0].location.formattedAddress) marker.country = result.response.venues[0].location.formattedAddress[2];
    });
}

function failedInitMaps() {
    alert("Unable to load Google Maps!");
}