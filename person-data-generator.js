// node "/Users/phleven/git/CBP/person-data-generator.js"

// Import libraries
const { faker } = require("@faker-js/faker");
const { MongoClient } = require('mongodb');

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

// carriers
const carriers = ['ACBL', 'ACLU', 'BLZU', 'CHIW', 'DYLT', 'FCOM', '', '', '', '', '', '', '', '', ''];

// Port of Entry
const ports = [
	'ABE', 
	'ABQ', 
	'BEA', 
	'BEE', 
	'BOS', 
	'BUF', 
	'DAL', 
	'FAR', 
	'HAR', 
	'HOB', 
	'LOU', 
	'LVG', 
	'NYC', 
	'OMA', 
	'OKC'
];

// Generate a random date
function generateRandomDate(startDate, endDate) {
	const start = new Date(startDate).getTime();
	const end = new Date(endDate).getTime();
	const randomTime = new Date(start + Math.random() * (end - start));
	return randomTime.toISOString(); // Returns the date in ISO format
}

// Generate a random SSN
function generateFakeSSN() {
	const part1 = Math.floor(100 + Math.random() * 900);    // 3 digits
	const part2 = Math.floor(10 + Math.random() * 90);      // 2 digits
	const part3 = Math.floor(1000 + Math.random() * 9000);  // 4 digits
	return `${part1}-${part2}-${part3}`;
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


async function insertData() {

	const uri = 'mongodb://localhost:27017';
	const client = new MongoClient(uri);

	try {

		await client.connect();

		const database = client.db('example');
		const collection = database.collection('personEncounters');

		for (let i = 0; i < 5000; i++) {

			const personEncounterData = [
				{
					"enc": {
						"encDt": generateRandomDate("2015-10-01T10:00:00Z", "2025-12-31T23:59:59Z")
					},
					"fname": faker.person.firstName(),
					"lname": faker.person.lastName(),
					"ssn": generateFakeSSN(),
					"encType": faker.helpers.arrayElement(cpbEncounters),
					"encAttr": [
						{ "key": "officerId", "value": faker.string.alphanumeric(10) },
						{ "key": "stationId", "value": faker.string.alphanumeric(5) },
						{ "key": "comments", "value": faker.helpers.arrayElement(cpbChecks) }
					],
					"personAttr": [
						{ "key": "weight", "value": generateRandomWeight() },
						{ "key": "height", "value": cmToFeetInches(generateRandomHeight()) },
						{ "key": "eyeColor", "value": faker.helpers.arrayElement(eyeColors) },
						{ "key": "hairColor", "value": faker.helpers.arrayElement(hairColors) },
						{ "key": "gender", "value": faker.person.sex() },
						{ "key": "ethnicity", "value": faker.helpers.arrayElement(ethnicities) },
						{ "key": "country", "value": getRandomCountry() },
						{ "key": "birthDate", "value": faker.date.birthdate({ mode: 'age', min: 18, max: 75 }) }
					]
				}

			];

			const result = await collection.insertMany(personEncounterData);

			const personEncounterData2 = [
				{
					"enc": {
						"encDt": generateRandomDate("2015-10-01T10:00:00Z", "2025-12-31T23:59:59Z")
					},
					"fname": faker.person.firstName(),
					"lname": faker.person.lastName(),
					"ssn": generateFakeSSN(),
					"encType": faker.helpers.arrayElement(cpbEncounters),
					"encAttr": [
						{"key": "carrierCd", "value": faker.helpers.arrayElement(carriers)},
						{"key": "docNum", "value": faker.string.alphanumeric(10)},
						{"key": "flightNum", "value": faker.string.alphanumeric(5)},
						{"key": "portCd", "value": faker.helpers.arrayElement(ports)},
						{"key": "seatNum", "value": faker.string.alphanumeric(3)}
					],
					"personAttr": [
						{ "key": "weight", "value": generateRandomWeight() },
						{ "key": "height", "value": cmToFeetInches(generateRandomHeight()) },
						{ "key": "eyeColor", "value": faker.helpers.arrayElement(eyeColors) },
						{ "key": "hairColor", "value": faker.helpers.arrayElement(hairColors) },
						{ "key": "gender", "value": faker.person.sex() },
						{ "key": "ethnicity", "value": faker.helpers.arrayElement(ethnicities) },
						{ "key": "country", "value": getRandomCountry() },
						{ "key": "birthDate", "value": faker.date.birthdate({ mode: 'age', min: 18, max: 75 }) }
					]
				}

			];

			const result2 = await collection.insertMany(personEncounterData2);

		}

		const count = await collection.countDocuments();
		console.log(`Total documents: ${count}`);

	} catch (error) {
		console.error('Error inserting documents:', error);
	} finally {
		await client.close();
	}

}

insertData();
