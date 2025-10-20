// To run using MongoDB shell
// load("/MongoDB Scripts/CBP/add-vechicle-indexes.js")
db = connect('mongodb://localhost/example');
db.vechileEncounters.createIndex({ licensePlate: 1, "encounter.encounterDt": 1 });
db.vechileEncounters.createIndex({ licensePlate: 1, "encounterAttributes.key": 1, "encounterAttributes.value": 1, "encounter.encounterDt": 1 });