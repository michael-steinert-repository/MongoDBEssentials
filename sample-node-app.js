const MongoClient = require('mongodb').MongoClient;

const username = "michael";
const cluster = "cluster0";
const database = "student";
const password = "xxx";
const db = "student"
const collections = {
  student: "student",
}

const uri = `mongodb+srv://${username}:${password}@${cluster}.1la3j.mongodb.net/${database}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  
async function main() {
  try {
    await client.connect();
    console.log("Connected to Database");
    const collection = client.db(db).collection(collections.student);
    const cursor = await collection.find();
    await cursor.forEach(document => {
		console.log(document);
	});
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

main();