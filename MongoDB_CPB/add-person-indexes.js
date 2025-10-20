// To run using MongoDB shell
// load("/MongoDB Scripts/CBP/add-person-indexes.js")
db = connect('mongodb://localhost/example');
db.personEncounters.createIndex({ lname: 1, "encounter.encounterDt": 1 });
db.personEncounters.createIndex({ lname: 1, "encounterAttributes.key": 1, "encounterAttributes.value": 1, "encounter.encounterDt": 1 });