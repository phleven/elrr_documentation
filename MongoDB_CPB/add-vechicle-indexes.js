// To run using MongoDB shell
// load("/Users/phleven/git/CBP/add-vechicle-indexes.js")
db = connect('mongodb://localhost/example');
db.vechileEncounters.createIndex({ licPlate: 1, "enc.encDt": 1 });
db.vechileEncounters.createIndex({ licPlate: 1, "encAttr.key": 1, "encAttr.value": 1, "enc.enDt": 1 });
db.vechileEncounters.createIndex({ licPlate: 1, "personAttr.key": 1, "personAttr.value": 1, "enc.encDt": 1 });