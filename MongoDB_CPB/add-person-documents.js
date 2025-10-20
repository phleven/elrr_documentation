db = connect('mongodb://localhost/example');
db.personEncounters.insertMany( [ 
		{
			     "encounter": {
			            "encounterDt": "2023-10-01T10:00:00Z"
			        },
			        "fname": "John",
			        "lname": "Doe",
			        "ssn": "123-45-6789",
			        "encounterType": "routine",
			        "encounterAttributes": [
			            {"key": "officerId", "value": "O123"},
			            {"key": "stationId", "value": "S456"},
			            {"key": "comments", "value": "TSA PreCheck"},
			            {"key": "riskCategory", "value": "low"}
			        ]
			    },
			    {
			        "encounter": {
			            "encounterDt": "2023-10-01T10:00:00Z",
			            "licNum": "ABC1234",
			            "location": "New York"
			        },
			        "fname": "John",
			        "lname": "Doe",
			        "ssn": "123-45-6789",
			        "encounterType": "flight",
			        "encounterAttributes": [
			            {"key": "carrierCd", "value": "AFL"},
			            {"key": "docNum", "value": "P1234567"},
			            {"key": "flightNum", "value": "AF123"},
			            {"key": "portCd", "value": "JFK"},
			            {"key": "seatNum", "value": "12A"}
			        ]

			    }
			])