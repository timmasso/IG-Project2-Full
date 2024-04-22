const Papa = require("papaparse");
const fs = require("fs");

const csvFilePath = "./casesCominedSifted6phaseofflight689.csv";
const a = analyzeCSV(csvFilePath);

function analyzeCSV(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const r = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
    });



    var geoJson = {};

    geoJson.type = "FeatureCollection";
    geoJson.name = "CommercialAirCrashes";

    geoJson.features = [];

    for (let i in r.data) {

        var b = { "type": "Feature" };

        b.properties = properties = {
            NtsbNo: r.data[i].NtsbNo,
            EventDate: r.data[i].EventDate,
            Country: r.data[i].Country,
            City: r.data[i].City,
            State: r.data[i].State,
            AccidentLat: parseFloat(r.data[i].Latitude),
            AccidentLong: parseFloat(r.data[i].Longitude),
            AirportName: r.data[i].AirportName,
            AirportID: r.data[i].AirportID,
            Registration: r.data[i].N,
            FatalInjuryCount: r.data[i].FatalInjuryCount,
            SeriousInjuryCount: r.data[i].SeriousInjuryCount,
            MinorInjuryCount: r.data[i].MinorInjuryCount,
            AirCarrier: r.data[i].Operator,
            Make: r.data[i].Make,
            Model: r.data[i].Model,
            NumberOfEngines: r.data[i].NumberOfEngines,
            AirCraftCategory: r.data[i].AirCraftCategory,
            AirCraftDamage: r.data[i].AirCraftDamage,
            ProbableCause: r.data[i].ProbableCause,
            Operator: r.data[i].Operator,
            PhaseOfFlight: r.data[i].BroadPhaseofFlight,

            ObjectId: parseInt(i),
        }


        b.geometry = {
            type: "Point",
            coordinates: [parseFloat(r.data[i].Longitude), parseFloat(r.data[i].Latitude)],
        };

        geoJson.features.push(b);
    }

    return geoJson;
}


const data = JSON.stringify(a);



fs.writeFile("project2geoSouth.json", data, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log("JSON data is saved.");
    }
}); 
