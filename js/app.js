function AppViewModel() {
    let self = this;
    this.closedSidebar = ko.observable(true); // Check the closed state of sidebar
    this.filterWord = ko.observable("");
    this.poiList = ko.observableArray();
    ko.utils.arrayPushAll(this.poiList(), markers);

    this.filteredPOIList = ko.computed(function () {
        let filter = self.filterWord().toLowerCase();
        if (!filter) {
            return self.poiList();
        } else {
            return ko.utils.arrayFilter(self.poiList(), function (poi) {
                if (poi.title.toLowerCase().includes(filter)) {
                    return poi;
                }
            });
        }
    });

    this.menuToggle = function () {
        ko.utils.toggleDomNodeCssClass($("#wrapper")[0], "toggled", self.closedSidebar());
        // Toggle the boolean value
        this.closedSidebar(!this.closedSidebar());
    }

    this.clickedMarker = function (marker) {
        populateInfoWindow(marker);
        zoomToArea(marker);
        self.menuToggle();
    }

    this.clickedResetFilter = function() {
        this.filterWord("");
    }

    this.clickedRecenterMap = function () {
        recenterMap();
    }

    this.clickedGo = function () {
        self.filterWord($("#filter-word").val());
    }
}

function startKnockout() {
    ko.applyBindings(new AppViewModel());
}