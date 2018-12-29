let map;
let markers = [];
let locations = [{
        title: 'De Haagse Markt',
        location: {
            lat: 52.0720782,
            lng: 4.3081515
        }
    },
    {
        title: 'Madurodam',
        location: {
            lat: 52.0994757,
            lng: 4.2947364
        }
    },
    {
        title: 'Mauritshuis',
        location: {
            lat: 52.0804205,
            lng: 4.3121073
        }
    },
    {
        title: 'Peace Palace',
        location: {
            lat: 52.0865911,
            lng: 4.2934081
        }
    },
];


function initMap() {
    // Calculate size of map to fit viewport
    let headingHeight = $("#heading").outerHeight(true);
    let windowHeight = $(window).outerHeight(true);
    let mapsHeight = windowHeight - headingHeight;
    $("#map").height(mapsHeight);

    // Creation of map object
    map = new google.maps.Map($('#map')[0], {
        center: {
            lat: 52.0762472,
            lng: 4.2877023
        },
        zoom: 13,
        styles: styles
    });

    // Markers
    for (let i = 0; i < locations.length; i++) {
        let position = locations[i].location;
        let title = locations[i].title;

        let marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        })
        marker.setMap(map);
        markers.push(marker);

    }
}