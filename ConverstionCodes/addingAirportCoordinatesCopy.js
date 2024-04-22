const fs = require('fs');
const Papa = require('papaparse');


let data = require('./project2geoSouth.js');


if (!data || !data.features) {
    console.error('GeoJSON data is not in the expected format');
    process.exit(1);
}


let csvData = fs.readFileSync('airport-codes-updated.csv', 'utf8');
let records = Papa.parse(csvData, { header: true }).data;
let csvMap = new Map(records.map(row => [row.ident, { Lat: parseFloat(row.Lat), Long: parseFloat(row.Long) }]));
let csvMapName = new Map(records.map(row => [row.name, { Lat: parseFloat(row.Lat), Long: parseFloat(row.Long) }]))


data.features.forEach(feature => {
    let airportId = feature.properties.AirportID;
    let AirportName = feature.properties.AirportName;


    console.log('Processing feature with AirportID:', airportId);

    if (csvMap.has(airportId)) {
        console.log('Found matching record in CSV data');
        feature.properties.AirportLongitude = csvMap.get(airportId).Long;
        feature.properties.AirportLatitude = csvMap.get(airportId).Lat;

    } else if (csvMap.has('K' + airportId)) {
        console.log('Found matching record with K in CSV data');
        feature.properties.AirportLongitude = csvMap.get('K' + airportId).Long;
        feature.properties.AirportLatitude = csvMap.get('K' + airportId).Lat;

    } else if (csvMap.has('P' + airportId)) {
        console.log('Found matching record with P in CSV data');
        feature.properties.AirportLongitude = csvMap.get('P' + airportId).Long;
        feature.properties.AirportLatitude = csvMap.get('P' + airportId).Lat;

    } else if (csvMapName.has(AirportName + ' Airport')) {
        console.log('Found matching record with Airport in CSV data');
        feature.properties.AirportLongitude = csvMapName.get(AirportName + ' Airport').Long;
        feature.properties.AirportLatitude = csvMapName.get(AirportName + ' Airport').Lat;

    }
    else if (feature.properties.AirportName == "") {
        console.log('Empty AirportName, setting AirportLatitude to AccidentLatitude');
        feature.properties.AirportLatitude = feature.properties.AccidentLatitude;
        feature.properties.AirportLongitude = feature.properties.AccidentLongitude;
    }

    else if (feature.properties.AirportID == "") {
        console.log('Empty AirportID, setting AirportLatitude to AccidentLatitude');
        feature.properties.AirportLatitude = feature.properties.AccidentLatitude;
        feature.properties.AirportLongitude = feature.properties.AccidentLongitude;
    }
    else if (feature.properties.AccidentLat == "") {
        console.log('Empty Accident, setting AirportLatitude to AccidentLatitude');
        feature.properties.AccidentLat = feature.properties.AirportLatitude;
    }
    else if (feature.properties.AccidentLong == "") {
        console.log('Empty Accidentlo, setting AirportLatitude to AccidentLatitude');
        feature.properties.AccidentLong = feature.properties.AirportLongitude;

    }
    let distance = haversineDistance(
        feature.properties.Lat,
        feature.properties.Long,
        feature.properties.AirportLatitude,
        feature.properties.AirportLongitude
    );

    feature.properties.Distance = distance;


});




function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
};



fs.writeFileSync('newproject2dataSouth.json', 'let data = ' + JSON.stringify(data, null, 2) + ';');
console.log('Updated data written to New File');

