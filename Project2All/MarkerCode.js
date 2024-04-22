// Description: This file contains the code to create the map and markers for the data visualization.
var map = L.map('map').setView([37.8, -96], 4);
var map2 = L.map('map2').setView([37.8, -96], 4);
var map3 = L.map('map3').setView([37.8, -96], 4);
var map4 = L.map('map4').setView([37.8, -96], 4);


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map3);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map4);


let crashIcon = L.icon({
    iconUrl: "Assets/airplane.png",
    iconSize: [30, 30],
});

let towerIcon = L.icon({
    iconUrl: "Assets/tower.png",
    iconSize: [30, 30],
});

L.geoJson(commercialAirCrashes, {
    pointToLayer: function (feature, latlng) {
        if (feature.geometry.coordinates[0] !== 0) {
            console.log(feature.geometry.coordinates[0]);
            let marker = L.marker(latlng, { icon: crashIcon });
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "NtsbNo: " +
                feature.properties.NtsbNo +
                "<br/>" +
                "Make: " +
                feature.properties.Make +
                "<br/>" +
                "Model: " +
                feature.properties.Model +
                "<br/>" +
                "Dead: " +
                feature.properties.FatalInjuryCount +
                "<br/>" +
                "Serious: " +
                feature.properties.SeriousInjuryCount +
                "<br/>" +
                "Minor: " +
                feature.properties.MinorInjuryCount +
                "<br/>" +
                "ProbableCause: " +
                feature.properties.ProbableCause
            );
            return marker;
        } else {
            return null;
        }
    },
}).addTo(map);

L.geoJSON(commercialAirCrashes, {
    onEachFeature: function (feature, layer) {
        if (
            typeof feature.properties.AirportLatitude !== "undefined" &&
            feature.geometry.coordinates[0] !== 0
        ) {
            let marker = L.marker(
                [
                    feature.properties.AirportLatitude,
                    feature.properties.AirportLongitude,
                ],
                { icon: towerIcon }
            );
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "Airport:Name: " +
                feature.properties.AirportName +
                "<br/>" +
                "Corresponding Accident: " +
                feature.properties.NtsbNo,


            );
            marker.addTo(map);
            var polyline = L.polyline(
                [
                    [
                        feature.properties.AirportLatitude,
                        feature.properties.AirportLongitude,
                    ],
                    feature.geometry.coordinates.reverse(),
                ],
                { color: "red" }
            ).addTo(map);
        } else {
            return null;
        }
    },
});

L.geoJson(deltaAirCrashes, {
    pointToLayer: function (feature, latlng) {
        if (feature.geometry.coordinates[0] !== 0) {
            console.log(feature.geometry.coordinates[0]);
            let marker = L.marker(latlng, { icon: crashIcon });
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "NtsbNo: " +
                feature.properties.NtsbNo +
                "<br/>" +
                "Make: " +
                feature.properties.Make +
                "<br/>" +
                "Model: " +
                feature.properties.Model +
                "<br/>" +
                "Dead: " +
                feature.properties.FatalInjuryCount +
                "<br/>" +
                "Serious: " +
                feature.properties.SeriousInjuryCount +
                "<br/>" +
                "Minor: " +
                feature.properties.MinorInjuryCount +
                "<br/>" +
                "ProbableCause: " +
                feature.properties.ProbableCause
            );
            return marker;
        } else {
            return null;
        }
    },
}).addTo(map2);

L.geoJSON(deltaAirCrashes, {
    onEachFeature: function (feature, layer) {
        if (
            typeof feature.properties.AirportLatitude !== "undefined" &&
            feature.geometry.coordinates[0] !== 0
        ) {
            let marker = L.marker(
                [
                    feature.properties.AirportLatitude,
                    feature.properties.AirportLongitude,
                ],
                { icon: towerIcon }
            );
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "Airport:Name: " +
                feature.properties.AirportName +
                "<br/>" +
                "Corresponding Accident: " +
                feature.properties.NtsbNo,


            );
            marker.addTo(map2);
            var polyline = L.polyline(
                [
                    [
                        feature.properties.AirportLatitude,
                        feature.properties.AirportLongitude,
                    ],
                    feature.geometry.coordinates.reverse(),
                ],
                { color: "red" }
            ).addTo(map2);
        } else {
            return null;
        }
    },
});

L.geoJson(unitedAirCrashes, {
    pointToLayer: function (feature, latlng) {
        if (feature.geometry.coordinates[0] !== 0) {
            console.log(feature.geometry.coordinates[0]);
            let marker = L.marker(latlng, { icon: crashIcon });
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "NtsbNo: " +
                feature.properties.NtsbNo +
                "<br/>" +
                "Make: " +
                feature.properties.Make +
                "<br/>" +
                "Model: " +
                feature.properties.Model +
                "<br/>" +
                "Dead: " +
                feature.properties.FatalInjuryCount +
                "<br/>" +
                "Serious: " +
                feature.properties.SeriousInjuryCount +
                "<br/>" +
                "Minor: " +
                feature.properties.MinorInjuryCount +
                "<br/>" +
                "ProbableCause: " +
                feature.properties.ProbableCause
            );
            return marker;
        } else {
            return null;
        }
    },
}).addTo(map3);

L.geoJSON(unitedAirCrashes, {
    onEachFeature: function (feature, layer) {
        if (
            typeof feature.properties.AirportLatitude !== "undefined" &&
            feature.geometry.coordinates[0] !== 0
        ) {
            let marker = L.marker(
                [
                    feature.properties.AirportLatitude,
                    feature.properties.AirportLongitude,
                ],
                { icon: towerIcon }
            );
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "Airport:Name: " +
                feature.properties.AirportName +
                "<br/>" +
                "Corresponding Accident: " +
                feature.properties.NtsbNo,


            );
            marker.addTo(map3);
            var polyline = L.polyline(
                [
                    [
                        feature.properties.AirportLatitude,
                        feature.properties.AirportLongitude,
                    ],
                    feature.geometry.coordinates.reverse(),
                ],
                { color: "red" }
            ).addTo(map3);
        } else {
            return null;
        }
    },
});

L.geoJson(southAirCrashes, {
    pointToLayer: function (feature, latlng) {
        if (feature.geometry.coordinates[0] !== 0) {
            console.log(feature.geometry.coordinates[0]);
            let marker = L.marker(latlng, { icon: crashIcon });
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "NtsbNo: " +
                feature.properties.NtsbNo +
                "<br/>" +
                "Make: " +
                feature.properties.Make +
                "<br/>" +
                "Model: " +
                feature.properties.Model +
                "<br/>" +
                "Dead: " +
                feature.properties.FatalInjuryCount +
                "<br/>" +
                "Serious: " +
                feature.properties.SeriousInjuryCount +
                "<br/>" +
                "Minor: " +
                feature.properties.MinorInjuryCount +
                "<br/>" +
                "ProbableCause: " +
                feature.properties.ProbableCause
            );
            return marker;
        } else {
            return null;
        }
    },
}).addTo(map4);

L.geoJSON(southAirCrashes, {
    onEachFeature: function (feature, layer) {
        if (
            typeof feature.properties.AirportLatitude !== "undefined" &&
            feature.geometry.coordinates[0] !== 0
        ) {
            let marker = L.marker(
                [
                    feature.properties.AirportLatitude,
                    feature.properties.AirportLongitude,
                ],
                { icon: towerIcon }
            );
            marker.bindPopup(
                "Date: " +
                feature.properties.EventDate +
                "<br/>" +
                "Airport:Name: " +
                feature.properties.AirportName +
                "<br/>" +
                "Corresponding Accident: " +
                feature.properties.NtsbNo,


            );
            marker.addTo(map4);
            var polyline = L.polyline(
                [
                    [
                        feature.properties.AirportLatitude,
                        feature.properties.AirportLongitude,
                    ],
                    feature.geometry.coordinates.reverse(),
                ],
                { color: "red" }
            ).addTo(map4);
        } else {
            return null;
        }
    },
});



let legend = L.control({ position: "topright" });

legend.onAdd = function (map) {
    let div = L.DomUtil.create("div", "legend");
    div.style.backgroundColor = "white";
    div.style.padding = "10px";
    div.innerHTML = "Number of Aircraft Damage Incidents Since 1982: " + dataFinal.features.length;
    return div;
};

legend.addTo(map);

legend.onAdd = function (map2) {
    let div = L.DomUtil.create("div", "legend");
    div.style.backgroundColor = "white";
    div.style.padding = "10px";
    div.innerHTML = "Number of Aircraft Damage Incidents Since 1982: " + dataFinal.features.length;
    return div;
};

legend.addTo(map2);

