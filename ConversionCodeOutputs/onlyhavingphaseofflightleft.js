const fs = require('fs');
const Papa = require('papaparse');

let csvData = fs.readFileSync('casesCominedSifted6phasesofflight.csv', 'utf8');
let records = Papa.parse(csvData, { header: true }).data;

//https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely 
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


let sumsOfOperator = new Map();


for (let i in records) {
    let currentOperator = records[i].Operator.toLowerCase().substring(0, 20)

    operatorKeys = Array.from(sumsOfOperator.keys())

    mostSimilar = "";
    mostSimilarDistance = 0;

    if (operatorKeys.length > 0) {


        for (let k in operatorKeys) {
            let currentDistance = similarity(currentOperator, operatorKeys[k]);
            if (currentDistance > mostSimilarDistance) {
                mostSimilar = operatorKeys[k];
                mostSimilarDistance = currentDistance;
            }
        }
        if (mostSimilarDistance == 0) {
            mostSimilar = currentOperator;
        }
    }
    else {
        mostSimilar = currentOperator;
    }
    console.log(currentOperator, mostSimilar, mostSimilarDistance);

    if (mostSimilarDistance < .7) {
        sumsOfOperator.set(currentOperator)
    }

    else {
        let currentRowValues = records[i].BroadPhaseofFlight

        let thisOperatorSums = sumsOfOperator.get(mostSimilar)
        let newOperatorSums = []

        for (let j in thisOperatorSums) {
            newOperatorSums[j] = Number(thisOperatorSums[j]) + Number(currentRowValues[j])
        }
        sumsOfOperator.set(mostSimilar, newOperatorSums)

    }
}

console.log(sumsOfOperator)


const outputPath = "casesCominedSiftedAirliners4.csv";
function writeRowsToCSVFile(rows, outputPath) {
    const csvContent = Papa.unparse(rows, { header: true });
    fs.writeFileSync(outputPath, csvContent);
    console.log(`Results exported to ${outputPath}`);
}
operatorKeys = Array.from(sumsOfOperator.keys())

let results = []

for (let i in operatorKeys){
    results[i] = [operatorKeys[i],sumsOfOperator.get(operatorKeys[i])].flat()

} 

writeRowsToCSVFile(results, outputPath);



