// To run using MongoDB shell
// load("/Users/phleven/git/CBP/add-person-indexes.js")
db = connect('mongodb://localhost/example');
db.personEncounters.createIndex({ lname: 1, "enc.encDt": 1 });
db.personEncounters.createIndex({ lname: 1, "encAttr.key": 1, "encAttr.value": 1, "enc.encDt": 1 });
db.personEncounters.createIndex({ lname: 1, "personAttr.key": 1, "personAttr.value": 1, "enc.encDt": 1 });