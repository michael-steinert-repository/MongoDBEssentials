# MongoDB
* MongoDB is a general purpose, document-based, distributed Database

## Collections
* MongoDB stores Documents (Rows) in Collections (Tables)

## Documents
* Documents are similar to JSON Objects
* MongoDB stores Data Records as BSON Documents
* BSON is a binary Representation of JSON Documents

![Data Types in MongoDB](https://user-images.githubusercontent.com/29623199/120857880-3fb24480-c582-11eb-9b20-9b798982b913.JPG)

```javascript
student = {
	"firstName": "Michael",
	"lastName": "Steinert",
	"gender": "M",
	"isActiveStudent": true,
	"favouriteSubjects" : [
		"maths",
		"english"
	],
	"totalSpentInBooks": 0.00
}

students = [
	{
		"firstName": "Michael",
		"lastName": "Steinert",
		"gender": "M",
		"isActiveStudent": true,
		"favouriteSubjects" : [
			"maths",
			"english"
		],
		"totalSpentInBooks": 42.00
	},
	{
		"firstName": "Marie",
		"lastName": "Schmidt",
		"gender": "F",
		"isActiveStudent": true,
		"favouriteSubjects" : [
			"maths",
			"english"
		],
		"totalSpentInBooks": 0.00
	}
]
```

# MongoExpress
* MongoExpress is a GUI Client written in Node.JS to interact with the MongoDB

## MongoDB and MongoExpress Architecure
![mongodb-architecture](https://user-images.githubusercontent.com/29623199/120383348-0e890880-c325-11eb-8fc5-db465beee42c.JPG)

## Docker Compose Commands
| Command | Description |
| --- | --- |
| docker compose -f docker-compose.yaml up | Creating initial Cotainers and Network from docker-compose.yaml |
| docker compose up | Creating initial Cotainers and Network |
| docker compose up -d | Creating initial Cotainers and Network and detaching the Processes from Terminal |
| docker compose down | Removing the Cotainers and Network |
| docker compose stop | Stopping the Cotainers and Network (current State is saved) |
| docker compose start | Starting current Cotainers and Network (current State is started) |
| docker ps | Showing all Containers in Docker |
| docker exec -it ContainerID bash | Exectiong the Command bash in the Container with ID ContainerID |

## MongoDB Commands
| Command | Description |
| --- | --- |
| mongo mongodb://localhost:27017 -u rootuser -p rootpass | Connecting to MongoDB using MongoShell (with Credentials from docker-compose.yaml) |

## Embedded Data Model
* In MongoDB is is possible to embed related Data in a single Document
* These Schema is known as Denormalized Model
* Embedded Data Model gives a better Performance for Read Operations

![MongoDB embedded data model](https://user-images.githubusercontent.com/29623199/120899288-3df28a80-c62f-11eb-8de1-6ca405870dac.JPG)

* Embedded Data are in a Relationship within a Document
```javascript
/* One-to-One Relationship */
student = {
	"firstName": "Michael",
	"lastName": "Steinert",
	"gender": "M",
	"isActiveStudent": true,
	"favouriteSubjects" : [
		"maths",
		"english"
	],
	"totalSpentInBooks": 0.00,
	"address": {
		"country": "Germany",
		"city": "Froendenberg"
	}
}

/* One-to-Many Relationship */
student = {
	"firstName": "Michael",
	"lastName": "Steinert",
	"gender": "M",
	"isActiveStudent": true,
	"favouriteSubjects" : [
		"maths",
		"english"
	],
	"totalSpentInBooks": 0.00,
	"address": [
		{
			"country": "Germany",
			"city": "Froendenberg"
		},
		{
			"country": "Germany",
			"city": "Dortmund"
		},
	]	
}
```

## Normalized Data Model
* Normalized Data Models describe Realtionshsips using References between Documents
* Normalized Data Model are used for large hierarchical Data Sets

![mongodb normalized data models](https://user-images.githubusercontent.com/29623199/120899316-69757500-c62f-11eb-994a-b1f973005bb7.JPG)

```javascript
student = {
	"_id": "<ObjectId>",
	"firstName": "Michael",
	"lastName": "Steinert",
	"gender": "M",
	"isActiveStudent": true,
	"favouriteSubjects" : [
		"maths",
		"english"
	],
	"totalSpentInBooks": 0.00,
}

address = {
	"student_id": "<ObjectId>",
		"country": "Germany",
		"city": "Froendenberg"
}
```

## MongoDB Validation
* The Validation triggers when a new Document is inserted into the Collcation
```javascript
db.createCollection("student_with_validation", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "firstName", "lastName", "isStudentActive", "totalSpentInBooks", "gender"
            ],
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                lastName: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                isStudentActive: {
                    bsonType: "bool",
                    description: "must be a bool and is required"
                },
                gender: {
                    enum: ["M", "F"],
                    description: "can only be one of the enum values and is required",
                },
                favouriteSubjects: {
                    bsonType: "array",
                    description: "favourite subject is not required",
                },
                totalSpentInBooks: {
                    bsonType: "double",
                    description: "must be a double if the field exists",
                },
            },
        },
    }
});
```

## MongoDB Indexes
* Indexes allows to speed up the Queries on the Database
| Command | Description |
| --- | --- |
| db.student.getIndexes(); | Getting all Indexes from the current Collection |
| db.student.createIndex({firstName: 1}); | Creating an ascending Index for the Attrbiute firstName on the current Collcetion |
| db.student.dropIndex({firstName: 1}); | Deleting Index for the Attrbiute firstName on the current Collcetion |

### MongoDB find()
* The find() Method returns a Cursor which can be for Example iterated and printed the Documents
```javascript
var cursor = db.student.find()
cursror.next()
cursror.hasNext()
```
* The forEach() Method applies for each Document in the Cursor a JavaScript Function
```javascript
db.student.find().forEach(function(student) {
	print("First Name:" + student.firstName)
});
```

![mongodb find method](https://user-images.githubusercontent.com/29623199/120891077-dfb1b180-c606-11eb-88fe-1cf9e044967d.JPG)

## MongoDB Query Selectors
![MongoDB Query Seelctors](https://user-images.githubusercontent.com/29623199/120891086-e9d3b000-c606-11eb-8298-5b62ef655efd.JPG)

## MongoShell Commands
* MongoShell is an interactive JavaScript Interface to MongoDB
* It used to run Commands against the Database

| Command | Description |
| --- | --- |
| show dbs; | Showing all Databases in MongoDB |
| use student_db; | Creating or Switching to a Database student if it exists |
| db.help(); | Showing all available Methods for current connected Database |
| db.getName(); | Showing the Name of the current connected Database |
| db.dropDatabase(); | Deleting the current connected Database |
| db.createCollection("student"); | Creating a Collection student |
| show collections | Shows all Collection of current connected Database |
| db.student.drop() | Deletes the Collection of current connected Database |
| insert | |
| db.student.insert(student); | Creating a Collection student with an existing JavaScript Object |
| db.student.insertMany(students); | Creating a Collection student with many existing JavaScript Objects |
| find | |
| db.student.find() | Searchs all Documents in the Collection of current connected Database |
| db.student.find().limit(3).skip(1); | Searchs all Documents in the Collection and skips the first Document and shows in Total three Documents |
| db.student.find().sort({firstName: 1}); | Searchs all Documents in the Collection and sort in ascending Ordner |
| db.student.find({firstName: 'Michael', {firstName: 0, lastName: 1}}).pretty(); | Searchs all Documents with firstName as Query and displays Lastname (and excludes Firstname) of Results |
| db.student.find({totalSpentInBooks: {$gt: 12}}, {lastName: 1}).pretty(); | Searchs all Documents where totalSpentInBooks is greater than ($gt) 12 and displays their Lastname |
| db.student.find({favouriteSubjects: {$all: ["maths"]}}, {}).count(); | Counts all Documents where favouriteSubjects is "maths" and displays the Number |
| update | |
| db.student.update({_id: ObjectId("60bb64fd9e82a72a313df8cc")}, {$set: {firstName: 'Michael'}}); | Update the Document with the ObjectId |
| db.student.update({_id: ObjectId("60bb64fd9e82a72a313df8cc")}, {$unset: {firstName: 1}}); | Set to Default the Attribute firstName in the Document with ObjectId |
| db.student.update({_id: ObjectId("60bb64fd9e82a72a313df8cc")}, {$inc: {totalSpentInBooks: 101}}); | Increment (42+101) the Attribut totalSpentInBooks in the Document with ObjectId |
| db.student.update({_id: ObjectId("60bb64fd9e82a72a313df8cc")}, {$pull: {favouriteSubjects: 'maths'}}); | Pull out the Value 'maths' from Attribute favouriteSubjects in the Document with ObjectId |
| db.student.update({_id: ObjectId("60bb64fd9e82a72a313df8cc")}, {$push: {favouriteSubjects: 'maths'}}); | Push the Value 'maths' into Attribute favouriteSubjects in the Document with ObjectId |
| delete | |
| db.student.deleteOne({_id: ObjectId("60bb64fd9e82a72a313df8cc")}); | Deletes the Document with ObjectId |
| db.student.deleteMany({gender: 'M')}); | Deletes all Documents with Attrbiute gender 'M' |

# NodeJS Application
| Command | Description |
| --- | --- |
| npm install mongodb | Installing MongoDB Dependency |
| node sample-node-app.js | Running Sample Node App |
| docker run --rm -it -w /app -v "%cd%":/app node:lts-alpine3.13 /bin/sh | Optional: Running Node in Container. The Argument '-v "%cd%":/app' mount all Files from the current Directory into the Working Directory '/app' in the Container which includes NodeJS |