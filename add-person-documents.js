// To run using MongoDB shell
// load("/Users/phleven/git/CBP/add-person-documents.js")
db = connect('mongodb://localhost/example');
db.personEncounters.insertMany( [ 
		{
			     "enc": {
			            "encDt": "2023-10-01T10:00:00Z"
			        },
			        "fname": "John",
			        "lname": "Doe",
			        "ssn": "123-45-6789",
			        "encType": "routine",
			        "encAttr": [
			            {"key": "officerId", "value": "O123"},
			            {"key": "stationId", "value": "S456"},
			            {"key": "comments", "value": "TSA PreCheck"}
			        ],
					"personAttr": [
					    {"key": "weight", "value": "170 lbs"},
						{"key": "height", "value": "6\" 0\'"},
						{"key": "eyeColor", "value": "brown"},
						{"key": "hairColor", "value": "brown"},
						{"key": "gender", "value": "male"},
						{"key": "ethnicity", "value": "caucasian"},
						{"key": "country", "value": "US"}
					]
			    },
			    {
			        "enc": {
			            "encDt": "2023-10-01T10:00:00Z",
			            "licNum": "ABC1234",
			            "location": "New York"
			        },
			        "fname": "John",
			        "lname": "Doe",
			        "ssn": "123-45-6789",
			        "encType": "flight",
			        "encAttr": [
			            {"key": "carrierCd", "value": "AFL"},
			            {"key": "docNum", "value": "P1234567"},
			            {"key": "flightNum", "value": "AF123"},
			            {"key": "portCd", "value": "JFK"},
			            {"key": "seatNum", "value": "12A"}
			        ],
					"personAttr": [
					    {"key": "weight", "value": "170 lbs"},
						{"key": "height", "value": "6\" 0\'"},
						{"key": "eyeColor", "value": "brown"},
						{"key": "hairColor", "value": "brown"},
						{"key": "gender", "value": "male"},
						{"key": "ethnicity", "value": "caucasian"},
						{"key": "country", "value": "US"}
					]
			    }
			])