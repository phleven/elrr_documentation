// To run using MongoDB shell
// load("/MongoDB Scripts/CBP/add-vechicle-documents.js")

db = connect('mongodb://localhost/example');
db.vechileEncounters.insertMany( [ 
		{
            "encounter": {
                "encounterDt": "2025-10-01T10:00:00Z",
                "location": "New York"
            },
            "licensePlate": "ABC12345",
            "encounterType": "traffic stop",
            "encounterAttributes": [
                {"key": "officerId", "value": "O1234"},
                {"key": "state", "value": "NY"},
                {"key": "vehicleMake", "value": "Toyota"},
                {"key": "vehicleModel", "value": "Camry"},
                {"key": "vehicleYear", "value": "2019"},
                {"key": "vehicleType", "value": "sedan"},
                {"key": "color", "value": "white"},
                {"key": "fname", "value": "Sam"},
                {"key": "lname", "value": "Kay"}
            ]
        },
		{
	            "encounter": {
	                "encounterDt": "2024-10-01T10:00:00Z",
	                "location": "Boston"
	            },
	            "licensePlate": "ABC12346",
	            "encounterType": "traffic stop",
	            "encounterAttributes": [
	                {"key": "officerId", "value": "O1236"},
	                {"key": "state", "value": "MA"},
	                {"key": "vehicleMake", "value": "Toyota"},
	                {"key": "vehicleModel", "value": "Corolla"},
	                {"key": "vehicleYear", "value": "2021"},
	                {"key": "vehicleType", "value": "sedan"},
	                {"key": "color", "value": "red"},
	                {"key": "fname", "value": "Mary"},
	                {"key": "lname", "value": "Smith"}
	            ]
	        },
			{
			        "encounter": {
			            "encounterDt": "2019-10-01T10:00:00Z",
			            "location": "Newark"
			        },
			        "licensePlate": "ABC12347",
			        "encounterType": "traffic stop",
			        "encounterAttributes": [
			            {"key": "officerId", "value": "O1236"},
			            {"key": "state", "value": "NJ"},
			            {"key": "vehicleMake", "value": "Kia"},
			            {"key": "vehicleModel", "value": "OPtima"},
			            {"key": "vehicleYear", "value": "2021"},
			            {"key": "vehicleType", "value": "sedan"},
			            {"key": "color", "value": "red"},
			            {"key": "fname", "value": "Mark"},
			            {"key": "lname", "value": "Fanell"}
			        ]
			    }
			
		])