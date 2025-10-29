// node "/Users/phleven/git/CBP/display_vechicleEncounter_aggregation.js"

const { MongoClient } = require("mongodb");

async function main() {
	const uri = "mongodb://localhost:27017";
	const client = new MongoClient(uri);

	try {

		await client.connect();

		const database = client.db("example");
		const collection = database.collection("vechicleEncounters");

		// Parameters
		const maxRows = 100;
		const country = "Canada"
		const gender = "female";

		const aggregationPipeline = [
			{
				"$match": {
					$and: [
						{
							$and: [
								{ "personAttr.key": { "$eq": "country" } },
								{ "personAttr.value": { "$eq": country } }
							]
						},
						{
							$and: [
								{ "personAttr.key": { "$eq": "gender" } },
								{ "personAttr.value": { "$eq": gender } }
							]
						},
						{
							$and: [
								{ "encType": { $in: ["CET Hold", "Manifest Hold"] } }
							]
						}
					]
				}
			},
			{
				$unwind: { path: "$personAttr" }
			},
			{
				$project: { _id: 1, "encAttr": 0 }
			},
			{
				$limit: maxRows
			}
		];

		const results = await collection.aggregate(aggregationPipeline).toArray();
		console.log("Aggregation results:", results);

	} catch (error) {
		console.error('Error querying documents:', error);
	} finally {
		await client.close();
	}
}

main();