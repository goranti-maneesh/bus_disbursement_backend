const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Add users data
router.post("/users", (req, res) => {
	const data = req.body;
	console.log(data);

	query = `INSERT INTO USERS (studentID, password, name, destination)
    VALUES (?, ?, ?, ?)`;

	try {
		data.users.forEach((eachData) => {
			db.run(query, [
				eachData.studentID,
				eachData.password,
				eachData.name,
				eachData.destination,
			]);
		});

		res.json({ msg: "Added users successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ msg: "Error occurred while adding users" });
	}
});

// Add buses data
router.post("/add_buses", (req, res) => {
	const data = req.body;
	console.log(data, req.body);

	query = `INSERT INTO Buses (busID, destination, timing, seatsAvailable)
    VALUES (?, ?, ?, ?)`;

	try {
		data.forEach((eachData) => {
			db.run(query, [
				eachData.busID,
				eachData.destination,
				eachData.timing,
				eachData.seatsAvailable,
			]);
		});

		res.json({ msg: "Added Buses Data successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ msg: "Error occurred while adding buses data" });
	}
});

module.exports = router;
