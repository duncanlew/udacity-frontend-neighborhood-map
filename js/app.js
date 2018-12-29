function AppViewModel() {
    let self = this;

    this.poiList = ko.observableArray();

    console.log(Array.isArray(markers));
    markers.forEach(function (item) {
        console.log(item);
        self.poiList.push(item);
    });
}

function startKnockout() {
    ko.applyBindings(new AppViewModel());
}