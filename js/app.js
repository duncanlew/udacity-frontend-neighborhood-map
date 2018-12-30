function AppViewModel() {
    let self = this;
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
        $("#wrapper").toggleClass("toggled");
    }

    this.clickedMarker = function (marker) {
        populateInfoWindow(marker);
        zoomToArea(marker);
        $("#wrapper").toggleClass("toggled");
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