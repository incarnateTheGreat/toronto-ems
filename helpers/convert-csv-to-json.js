// Converts CSV to JSON.
(() => {
    const csvToJson = require('convert-csv-to-json');
    const fileInputName = '../data/firestationLocations.csv';
    const fileOutputName = '../data/firestationLocations.json';
    csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName, fileOutputName);
})();