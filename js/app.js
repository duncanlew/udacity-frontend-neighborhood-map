function AppViewModel() {
    let self = this;
    this.closedSidebar = ko.observable(true); // Check the closed state of sidebar
    this.filterWord = ko.observable("");
    this.poiList = ko.observableArray();
    ko.utils.arrayPushAll(this.poiList(), markers);

    this.filteredPOIList = ko.computed(function () {
        // Filters which poi are displayed in the list and as a marker on the map
        let filter = self.filterWord().toLowerCase();
        if (!filter) {
            ko.utils.arrayForEach(self.poiList(), function (poi) {
                poi.setMap(map);
            });
            return self.poiList();
        } else {
            return ko.utils.arrayFilter(self.poiList(), function (poi) {
                if (poi.title.toLowerCase().includes(filter)) {
                    poi.setMap(map);
                    return poi;
                } else {
                    poi.setMap(null);
                }
            });
        }
    });

    this.executeMapBoundsFitting = ko.computed(function () {
        // Only fit map to markers if there are markers in view
        if (self.filteredPOIList().length > 0) {
            fitMapToMarkers();
        }

        // If there is only one marker in view, open its infowindow
        if (self.filteredPOIList().length === 1) {
            self.openMarkerInfoWindow(self.filteredPOIList()[0]);
        }
    });

    this.openMarkerInfoWindow = function (marker) {
        populateInfoWindow(marker);
        zoomToArea(marker);
        bounceMarker(marker);
    };

    this.menuToggle = function () {
        // Open or close the sidebar based on the state of the closedSidebar
        ko.utils.toggleDomNodeCssClass($("#wrapper")[0], "toggled", self.closedSidebar());

        setMapCorrectWidth(self.closedSidebar());

        // Toggle the boolean value
        this.closedSidebar(!this.closedSidebar());
    };

    this.clickedMarker = function (marker) {
        if ($(window).width() < 768) {
            self.menuToggle();
        }
        self.openMarkerInfoWindow(marker);
    };

    this.clickedRecenterMap = function () {
        recenterMap();
    };
}

function startKnockout() {
    ko.applyBindings(new AppViewModel());
}