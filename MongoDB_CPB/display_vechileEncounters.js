db = connect('mongodb://localhost/bookstore');

printjson(db.vechicleEncounters.find({}));