const Papa = require("papaparse");
const fs = require("fs");
const csvFilePath = "casescombined.csv";
const outputPath = "casesCominedSifted5.csv";

const targetAircarriersColumn = ["Operator"];

if ("targetAirCarriersColumn" !== ""){

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
*/

function findRows(csvData, columnName, targetMakes, targetAircarriersColumn) {
  return csvData.filter((row) => targetMakes.includes(row[columnName]) && row["Latitude"] != "" && row["Longitude"] != "" );
}

function writeRowsToCSVFile(rows, outputPath) {
  const csvContent = Papa.unparse(rows, { header: true });
  fs.writeFileSync(outputPath, csvContent);
  console.log(`Results exported to ${outputPath}`);
}

analyzeCSV(csvFilePath, makeColumn, targetMakes, outputPath, targetAircarriersColumn);
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
      );
      writeRowsToCSVFile(rowsWithData, outputPath);
    },
  });
}
}

