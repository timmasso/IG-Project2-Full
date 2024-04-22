const Papa = require("papaparse");
const fs = require("fs");
const csvFilePath = "casescombined.csv";
const outputPath = "casesCominedSifted6phaseofflight689.csv";

const targetAircarriersColumn = ["Operator"];
const targetAircarriers = [
    "SOUTHWEST AIRLINES CO",
    "Southwest Airlines",
]

/*
if ("targetAirCarriersColumn" !== "") {
*/
    const makeColumn = "Make";

    const targetMakes = [
        "AIRBUS",
        "BOEING",
        "EMBRAER",
        "Boeing",
        "LOCKHEED",
        "DOUGLAS",
        "MCDONNELL",
        "BOMBARDIER INC",
    ];

    /*
    const countryColumn = "Country";
    const targetCountry = [
      "United States",
    ]
    */



    const targetPhaseOfFlightColumn = ["BroadPhaseofFlight"]
    const targetPhaseOfFlight = [
        "Initial Climb",
        "Landing",
        "Approach",
        "Enroute",
        "Takeoff",
        "Taxi",
        "Standing",
        "Maneuvering",
        "Pushback",

    ]


    function findRows(csvData, columnName, targetMakes, targetAircarriersColumn, targetAircarriers, targetPhaseOfFlightColumn, targetPhaseOfFlight) {
        return csvData.filter((row) => targetMakes.includes(row[columnName]) && targetAircarriers.includes(row[targetAircarriersColumn]) && row["Latitude"] != "" && row["Longitude"] != "" && targetPhaseOfFlight.includes(row[targetPhaseOfFlightColumn]));
    }

    function writeRowsToCSVFile(rows, outputPath) {
        const csvContent = Papa.unparse(rows, { header: true });
        fs.writeFileSync(outputPath, csvContent);
        console.log(`Results exported to ${outputPath}`);
    }

    analyzeCSV(csvFilePath, makeColumn, targetMakes, outputPath, targetAircarriersColumn, targetAircarriers, targetPhaseOfFlightColumn, targetPhaseOfFlight);
    function analyzeCSV(filePath, makeColumn, targetMakes, outputPath) {
        const fileContent = fs.readFileSync(filePath, "utf8");

        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsWithData = findRows(
                    results.data,
                    makeColumn,
                    targetMakes,
                    targetAircarriersColumn,
                    targetAircarriers,
                    targetPhaseOfFlightColumn,
                    targetPhaseOfFlight
                );
                writeRowsToCSVFile(rowsWithData, outputPath);
            },
        });
    }

