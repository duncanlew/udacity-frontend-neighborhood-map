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
}
let locations = [{
        title: 'De Haagse Markt',
        position: {
            lat: 52.0720782,
            lng: 4.3081515
        }
    },
    {
        title: 'Madurodam',
        position: {
            lat: 52.0994757,
            lng: 4.2947364
        }
    },
    {
        title: 'Mauritshuis',
        position: {
            lat: 52.0804205,
            lng: 4.3121073
        }
    },
    {
        title: 'Peace Palace',
        position: {
            lat: 52.0865911,
            lng: 4.2934081
        }
    },
    {
        title: 'Binnenhof',
        position: {
            lat: 52.0795985,
            lng: 4.311079
        }
    },
    {
        title: 'Escher in the Palace',
        position: {
            lat: 52.0834332,
            lng: 4.3121293
        }
    },
    {
        title: 'Gemeentemuseum Den Haag',
        position: {
            lat: 52.0899131,
            lng: 4.2784606
        }
    },
    {
        title: 'Noordeinde Palace',
        position: {
            lat: 52.0808948,
            lng: 4.3042638
        }
    },
    {
        title: 'De Pier',
        position: {
            lat: 52.1169819,
            lng: 4.2774163
        }
    },
    {
        title: 'Omniversum',
        position: {
            lat: 52.08937727145052,
            lng: 4.281729695781964
        }
    },
];


function initMap() {
    // Calculate size of map to fit viewport
    setMapCorrectHeight();

    // Creation of map object
    map = new google.maps.Map($('#map')[0], {
        center: startingLocation.position,
        zoom: startingLocation.zoom,
        styles: styles
    });

    // Create markers for the map
    infoWindow = new google.maps.InfoWindow();
    createMarkers()

    google.maps.event.addListenerOnce(map, 'idle', function () {
        // Start Knockout after Google Maps has been loaded
        startKnockout();
    });
}

function setMapCorrectHeight() {
    let headingHeight = $("#heading").outerHeight(true);
    let windowHeight = $(window).outerHeight(true);
    let mapsHeight = windowHeight - headingHeight;
    $("#map").height(mapsHeight);
}

function createMarkers() {
    for (let i = 0; i < locations.length; i++) {
        let position = locations[i].position;
        let title = locations[i].title;

        let marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
        })
        marker.addListener('click', function () {
            populateInfoWindow(this);
            bounceMarker(this);
        });
        markers.push(marker);
    }
}

function populateInfoWindow(marker) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent(`<div class="info-window"><h1>${marker.title}</h1></div>`);
        infoWindow.open(map, marker);

        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        })
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