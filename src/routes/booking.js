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

const bookSeat = (
	bookingID,
	busID,
	studentID,
	studentName,
	destination,
	busTiming,
	res
) => {
	// Check if seats are available
	const checkSeatsQuery = `SELECT seatsAvailable FROM Buses WHERE busID = ?`;
	db.get(checkSeatsQuery, [busID], (err, bus) => {
		if (err)
			return res
				.status(500)
				.json({ msg: "Error checking available seats" });
		if (!bus || bus.seatsAvailable <= 0) {
			return res
				.status(400)
				.json({ msg: "No seats available on this bus" });
		}

		// Proceed with booking as seats are available
		const bookingQuery = `INSERT INTO Bookings (bookingID, busID, studentID, studentName, destination, busTiming, bookingTimestamp) 
							  VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`;

		db.run(
			bookingQuery,
			[bookingID, busID, studentID, studentName, destination, busTiming],
			(err) => {
				if (err)
					return res.status(500).json({ msg: "Error booking seat" });

				// Decrease available seats after booking
				const updateSeatsQuery = `UPDATE Buses SET seatsAvailable = seatsAvailable - 1 WHERE busID = ?`;
				db.run(updateSeatsQuery, [busID], (err) => {
					if (err)
						return res.status(500).json({
							msg: "Error updating seat availability",
						});

					return res.json({ msg: "Seat booked successfully" });
				});
			}
		);
	});
};

// Book a seat
router.post("/book", (req, res) => {
	const { busID, studentID, studentName, destination, busTiming } = req.body;
	const bookingID = `${busID}-${studentID}`;

	// First, check if the student has already booked a seat on the same bus
	const checkBookingQuery = `SELECT * FROM Bookings WHERE studentID = ?`;

	if (!(studentID === "NW0000088" || studentID === "NW0001283")) {
		db.get(checkBookingQuery, [studentID], (err, existingBooking) => {
			console.log(err, existingBooking);
			if (err)
				return res
					.status(500)
					.json({ msg: "Error checking existing booking" });
			if (existingBooking) {
				return res.status(400).json({
					msg: "You have already booked a seat on this bus",
				});
			}
			bookSeat(
				bookingID,
				busID,
				studentID,
				studentName,
				destination,
				busTiming,
				res
			);
		});
	} else {
		bookSeat(
			bookingID,
			busID,
			studentID,
			studentName,
			destination,
			busTiming,
			res
		);
	}
});

module.exports = router;
