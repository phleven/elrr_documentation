// node "/Users/phleven/git/CBP/vechicle-data-generator.js"

// Import libraries
const {faker} = require("@faker-js/faker");
const {MongoClient} = require('mongodb');

// CBP encounters
const cpbEncounters = ['Title 8 Apprehensions', 'Title 8 Inadmissables', 'Title 42 Expulsions', 'routine'];

// CBP checks
const cpbChecks = [
	'X-Ray Exam', 
	'Tail Gate Exam', 
	'Intensive Exam', 
	'Manifest Hold', 
	'CET Hold', 
	'PGA/Commercial Enforcement Hold', 
	'Statistical Validation Hold'
];

// Hair colors
const hairColors = ['Black', 'Brown', 'Blonde', 'Red', 'Grey', 'White', 'Auburn', 'Chestnut'];

// Eye colors
const eyeColors = ['Hazel', 'Grey', 'Green', 'Brown', 'Blue'];

// Vechicle colors
const vechicleColors = ['White', 'Grey', 'Green', 'Brown', 'Blue', 'Red', 'Silver', 'Maroon'];

// Ethnicities
const ethnicities = [
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'White',
  'Native American',
  'Pacific Islander',
  'Mixed',
  'Other'
];

// Vehicle makes and models
const vehicleData = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  Ford: ["F-150", "Escape", "Explorer", "Mustang"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Kia: ["Optima", "Sorento", "Forte", "Stinger"],
  Hyundai: ["Sonota", "Tucon", "Santa Fe", "Stargazer"]
};

// generate a random vehicle make
function generateRandomMake() {
  const makes = Object.keys(vehicleData);
  return randomMake = makes[Math.floor(Math.random() * makes.length)];
}

// Generate vechicle model from make
function generateModel(randonMake) {
  const models = vehicleData[randomMake];
  return randomModel = models[Math.floor(Math.random() * models.length)];
}

// Generate license plate
function generateLicensePlate() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const randomNumbers = Array.from({ length: 4 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');

  return `${randomLetters}-${randomNumbers}`;
}

// Generate a random date
function generateRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = new Date(start + Math.random() * (end - start));
  return randomTime.toISOString(); // Returns the date in ISO format
}

// Generate a random height in centimeters
function generateRandomHeight(minHeight = 140, maxHeight = 200) {
  return (Math.random() * (maxHeight - minHeight) + minHeight).toFixed(2);
}

// Convert cm to feet and inches
function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet} ft ${inches} in`;
}

// Generate a random human weight in pounds
function generateRandomWeight() {
    const minWeight = 80;  // Minimum realistic weight in pounds
    const maxWeight = 400; // Maximum realistic weight in pounds
    const randomWeight = Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight + " lbs";
    return randomWeight;
}

// Generate a random country
function getRandomCountry() {
  const countries = ['United States', 'Canada', 'Mexico', 'Panama', 'Costa Rica'];
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

async function insertTimeSeriesData() {
	
	const uri = 'mongodb://localhost:27017';
	const client = new MongoClient(uri);

	try {
		
		await client.connect();
		
		const database = client.db('example'); // Replace with your database name
		const collection = database.collection('vechicleEncounters');

		for (let i = 0; i < 5000; i++) {
			
			const randomMake = generateRandomMake();
			const model = generateModel(randomMake);
				
			const timeSeriesData = [
				{
				    "enc": {
				        "encDt": generateRandomDate("2015-10-01T10:00:00Z", "2025-12-31T23:59:59Z"),
				        "loc": faker.location.city()
				    },
				    "licPlate": generateLicensePlate(),
				    "encType": faker.helpers.arrayElement(cpbChecks),
				    "encAttr": [
				        {"key": "officerId", "value": faker.string.alphanumeric(10)},
				        {"key": "state", "value": faker.location.state()},
				        {"key": "vechMake", "value": randomMake},
				        {"key": "vechModel", "value": model},
				        {"key": "vechYr", "value": faker.date.birthdate({ min: 1900, max: 2025, mode: 'year' }).getFullYear()},
				        {"key": "vechType", "value": faker.vehicle.type()},
				        {"key": "color", "value": faker.helpers.arrayElement(vechicleColors)}
				      ],
					"personAttr": [
				        {"key": "fname", "value": faker.person.firstName()},
						{"key": "lname", "value": faker.person.lastName()},
						{"key": "weight", "value": generateRandomWeight()},
						{"key": "height", "value": cmToFeetInches(generateRandomHeight())},
						{"key": "eyeColor", "value": faker.helpers.arrayElement(eyeColors)},
						{"key": "hairColor", "value": faker.helpers.arrayElement(hairColors)},
						{"key": "gender", "value": faker.person.sex()},
						{"key": "ethnicity", "value": faker.helpers.arrayElement(ethnicities)},
						{"key": "country", "value": getRandomCountry()}
					]
				}
	
			];
	
			const result = await collection.insertMany(timeSeriesData);
		}
		
		const count = await collection.countDocuments();
		console.log(`Total documents: ${count}`);
					
	} catch (error) {
		console.error('Error inserting documents:', error);
	} finally {
		await client.close();
	}
	
}

insertTimeSeriesData();
