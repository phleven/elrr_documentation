db = connect('mongodb://localhost/example');

printjson(db.personEncounters.find({}));