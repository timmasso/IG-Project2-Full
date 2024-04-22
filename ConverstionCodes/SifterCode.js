const Papa = require("papaparse");
const fs = require("fs");
const csvFilePath = "Newnewdatafromntsb.csv";
const outputPath = "newnewdata234.csv";

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

const countryColumn = "Country";
const targetCountry = [
  "United States",
]
const damageColumn = "AirCraftDamage";
const targetDamage = [
  "Destroyed",
  "Substantial",
]


const targetAircarriersColumn = ["Operator"] 
const targetAirCarriers = [
"",
]

const targtPhaseOfFlightColumn = ["BroadPhaseofFlight"]
const targtPhaseOfFlight = ["",]




function findRows(csvData, columnName, targetMakes, targetDamage, damageColumn, targetCountry, countryColumn) {
  return csvData.filter((row) => targetMakes.includes(row[columnName]) && targetDamage.includes(row[damageColumn]) && targetCountry.includes(row[countryColumn]) && row["Latitude"] != "" && row["Longitude"] != "");
}

function writeRowsToCSVFile(rows, outputPath) {
  const csvContent = Papa.unparse(rows, { header: true });
  fs.writeFileSync(outputPath, csvContent);
  console.log(`Results exported to ${outputPath}`);
}

analyzeCSV(csvFilePath, makeColumn, targetMakes, outputPath, targetDamage, damageColumn, targetCountry, countryColumn);
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
        targetDamage,
        damageColumn,
        targetCountry,
        countryColumn,
      );
      writeRowsToCSVFile(rowsWithData, outputPath);
    },
  });
}


