function AppViewModel() {
    let self = this;

    this.poiList = ko.observableArray();

    markers.forEach(function (item) {
        self.poiList.push(item);
    });

    this.menuToggle = function () {
        $("#wrapper").toggleClass("toggled");
    }

    this.clickedMarker = function(marker) {
        populateInfoWindow(marker);
        zoomToArea(marker);
        $("#wrapper").toggleClass("toggled");
    }

    this.clickedRecenterMap = function(){
        recenterMap();
    }
}

function startKnockout() {
    ko.applyBindings(new AppViewModel());
}