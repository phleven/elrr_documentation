// To run using MongoDB shell
// load("/Users/phleven/git/CBP/add-vechicle-documents.js")
db = connect('mongodb://localhost/example');
db.vechileEncounters.insertMany( [ 
		{
            "enc": {
                "encDt": "2025-10-01T10:00:00Z",
                "loc": "New York"
            },
            "licPlate": "ABC12345",
            "encType": "traffic stop",
            "encAttr": [
                {"key": "officerId", "value": "O1234"},
                {"key": "state", "value": "NY"},
                {"key": "vechMake", "value": "Toyota"},
                {"key": "vechModel", "value": "Camry"},
                {"key": "vechYr", "value": "2019"},
                {"key": "vechType", "value": "sedan"},
                {"key": "color", "value": "white"}
              ],
			"personAttr": [
  	            {"key": "fname", "value": "Sam"},
				{"key": "lname", "value": "Kay"},
				{"key": "weight", "value": "150 lbs"},
				{"key": "height", "value": "5\" 9.50\'"},
				{"key": "eyeColor", "value": "blue"},
				{"key": "hairColor", "value": "blonde"},
				{"key": "gender", "value": "male"},
				{"key": "ethnicity", "value": "caucasian"},
				{"key": "country", "value": "US"}
			]
        },
		{
            "enc": {
                "encDt": "2024-10-01T10:00:00Z",
                "loc": "Boston"
            },
            "licPlate": "ABC12346",
            "encType": "traffic stop",
            "encAttr": [
                {"key": "officerId", "value": "O1236"},
                {"key": "state", "value": "MA"},
                {"key": "vechMake", "value": "Toyota"},
                {"key": "vechModel", "value": "Corolla"},
                {"key": "vechYr", "value": "2021"},
                {"key": "vechType", "value": "sedan"},
                {"key": "color", "value": "red"}
            ],
			"personAttr": [
			    {"key": "fname", "value": "Mary"},
				{"key": "lname", "value": "Smith"},
				{"key": "weight", "value": "122 lbs"},
				{"key": "height", "value": "5\" 5\'"},
				{"key": "eyeColor", "value": "brown"},
				{"key": "hairColor", "value": "brown"},
				{"key": "gender", "value": "female"},
				{"key": "ethnicity", "value": "caucasian"},
				{"key": "country", "value": "US"}
			]
        },
		{
		        "enc": {
		            "encDt": "2019-10-01T10:00:00Z",
		            "loc": "Newark"
		        },
		        "licPlate": "ABC12347",
		        "encType": "traffic stop",
		        "encAttr": [
		            {"key": "officerId", "value": "O1236"},
		            {"key": "state", "value": "NJ"},
		            {"key": "vechMake", "value": "Kia"},
		            {"key": "vechModel", "value": "OPtima"},
		            {"key": "vechYr", "value": "2021"},
		            {"key": "vechType", "value": "sedan"},
		            {"key": "color", "value": "grey"}
		        ],
				"personAttr": [
				    {"key": "fname", "value": "Mark"},
					{"key": "lname", "value": "Fanell"},
					{"key": "weight", "value": "200 lbs"},
					{"key": "height", "value": "6\" 2\'"},
					{"key": "eyeColor", "value": "brown"},
					{"key": "hairColor", "value": "grey"},
					{"key": "gender", "value": "male"},
					{"key": "ethnicity", "value": "caucasian"},
					{"key": "country", "value": "US"}
				]
		    }
		])