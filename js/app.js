function AppViewModel() {
    let self = this;

    this.poiList = ko.observableArray();

    markers.forEach(function (item) {
        self.poiList.push(item);
    });

    this.menuToggle = function () {
        $("#wrapper").toggleClass("toggled");
    }
}

function startKnockout() {
    ko.applyBindings(new AppViewModel());
}