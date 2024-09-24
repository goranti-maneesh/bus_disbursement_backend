const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Fetch available buses
router.get("/buses", (req, res) => {
	const destination = req.query.destination;
	console.log(destination);
	const query = `SELECT * FROM Buses WHERE destination = '${destination}'`;
	console.log(query);

	db.all(query, (err, rows) => {
		console.log(err, rows);
		if (err) return res.status(500).json({ msg: "Error fetching buses" });
		res.json(rows);
	});
});

// Book a seat
router.post("/book", (req, res) => {
	const { busID, studentID, studentName, destination, busTiming } = req.body;
	const bookingID = `${busID}-${studentID}`;

	const query = `INSERT INTO Bookings (bookingID, busID, studentID, studentName, destination, busTiming, bookingTimestamp) 
                VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`;

	db.run(
		query,
		[bookingID, busID, studentID, studentName, destination, busTiming],
		(err) => {
			if (err) return res.status(500).json({ msg: "Error booking seat" });
			res.json({ msg: "Seat booked successfully" });
		}
	);
});

module.exports = router;
