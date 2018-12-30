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
            lat: 52.06503762916279,
            lng: 4.299366977145978
        }
    },
    {
        title: 'Madurodam',
        position: {
            lat: 52.09908797895354,
            lng: 4.298863363483052
        }
    },
    {
        title: 'Mauritshuis',
        position: {
            lat: 52.080303656366404,
            lng: 4.314457251614486
        }
    },
    {
        title: 'Peace Palace',
        position: {
            lat: 52.08611889900742,
            lng: 4.295209836563272
        }
    },
    {
        title: 'Binnenhof',
        position: {
            lat: 52.079457031469644,
            lng: 4.312365524934367
        }
    },
    {
        title: 'Escher in het Paleis',
        position: {
            lat: 52.083381407262536,
            lng: 4.314079464728019
        }
    },
    {
        title: 'Gemeentemuseum Den Haag',
        position: {
            lat: 52.08928982328055,
            lng: 4.280290603637695
        }
    },
    {
        title: 'Noordeinde Palace',
        position: {
            lat: 52.080764,
            lng: 4.307623
        }
    },
    {
        title: 'De Pier',
        position: {
            lat: 52.117825003805194,
            lng: 4.279882607795804
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

        if (i === 0) {
            console.log(marker.title);
            searchForVenues().then(function (result) {
                console.log(result);
                let venueID = result.response.venues[0].id;
                getVenueDetails(venueID).then(function (result) {
                    console.log(result);
                    let name = result.response.venue.name;
                    let phone = result.response.venue.contact.formattedPhone;
                    let address = result.response.venue.location.formattedAddress[0];
                    let zipCode = result.response.venue.location.formattedAddress[1];
                    let country = result.response.venue.location.formattedAddress[2];
                    let url = result.response.venue.url;

                    marker.nameHTML = `<p>${name}</p>`;
                    marker.phoneHTML = `<p>${phone}</p>`;
                    marker.addressHTML = `<p>${address}</p>`;
                    marker.zipCodeHTML = `<p>${zipCode}</p>`;
                    marker.countryHTML = `<p>${country}</p>`;
                    marker.urlHTML = `<p>${url}</p>`;
                });
            });
        }


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
        infoWindow.setContent(`<div class="info-window"><h1>${marker.title}</h1>${marker.phoneHTML}</div>`);
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