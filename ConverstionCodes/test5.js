const fs = require('fs');
const Papa = require('papaparse');

let csvData = fs.readFileSync('casesCominedSifted6phaseofflight.csv', 'utf8');
let records = Papa.parse(csvData, { header: true }).data;

const counts = {};
const phases = new Set();

// Create a template object with all phases of flight as keys
records.forEach((row) => {
  phases.add(row.BroadPhaseofFlight);
});
const template = Array.from(phases).reduce((obj, phase) => {
  obj[phase] = 0;
  return obj;
}, {});

records.forEach((row) => {
  const operator = row.Operator;
  const phase = row.BroadPhaseofFlight;

  if (!counts[operator]) {
    counts[operator] = {
      Operator: operator,
      ...template,
    };
  }

  counts[operator][phase]++;
});

const data = Object.values(counts);
const csvOutput = Papa.unparse(data);

fs.writeFileSync('casesCominedSifted6phaseofflight_counts5.csv', csvOutput);