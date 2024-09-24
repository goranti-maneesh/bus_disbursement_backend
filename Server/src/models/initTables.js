const db = require("../config/db");

// const initTables = () => {
// 	// Create Users table
// 	db.run(
// 		`CREATE TABLE Users (
//       studentID TEXT UNIQUE,
//       password TEXT,
//       name TEXT,
//       destination TEXT
//     )`
// 	);

// 	// Create Bookings table
// 	db.run(
// 		`CREATE TABLE Bookings (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       bookingID TEXT,
//       busID TEXT,
//       studentID TEXT,
//       studentName TEXT,
//       destination TEXT,
//       busTiming TEXT,
//       bookingTimestamp TEXT
//     )`
// 	);

// 	// Create Buses table
// 	db.run(
// 		`CREATE TABLE Buses (
//       busID TEXT UNIQUE,
//       destination TEXT,
//       timing TEXT,
//       seatsAvailable INTEGER
//     )`
// 	);
// };

// initTables();

const addUsers = () => {
	console.log("Users");
	db.run(
		`INSERT INTO
  Users (studentID, password, name, destination)
VALUES
  ("N24H01B0311", "*$wkhVJe", "Suraj AC", "Nxtgen"),
  ("N24H01B0312", "&n=c2LG=", "kolanu shiva rama krishna reddy", "Nxtgen"),
  ("N24H01B0313", "b$SvQh=x", "V Geetha Shyam Varma", "Serinity"),
  ("N24H01B0314", "q4FX=wcM", "V Geetha Ram Varma", "Serinity"),
  ("N24H01B0315", "3rFyd9N=", "Ch.Laxmi", "Serinity"),
  ("N24H01B0316", "%yuzghD9", "somineni siva sathwik", "Serinity"),
  ("N24H01B0317", "Wnk!yfLE", "Harshavardhan Pamu", "Nxtgen"),
  ("N24H01B0318", "2rU8r!D*", "ch.Siri Chandana", "Nxtgen"),
  ("N24H01B0319", "12345678", "Maneesh Reddy", "Serinity");`
	);

	addUsers();
};

module.exports = addUsers;
