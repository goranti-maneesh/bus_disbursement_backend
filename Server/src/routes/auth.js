const express = require("express");
const bcrypt = require("bcryptjs"); // Assuming passwords are hashed
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // SQLite database connection
const router = express.Router();

// Login API with JWT Token
router.post("/login", (req, res) => {
	const { studentID, password } = req.body; // Take student ID and password from request body

	// Query the database to find the student by studentID
	const query = `SELECT * FROM Users WHERE studentID = ?`;

	db.get(query, [studentID], async (err, user) => {
		console.log(user, err, query, studentID);
		if (err || !user)
			return res
				.status(400)
				.json({ msg: "Invalid student ID or password" });

		// Verify the password (if needed)
		console.log(
			user,
			studentID,
			password,
			user.password == password,
			user.password === password
		);
		// const isMatch = await bcrypt.compare(`${password}`, user.password);
		const isMatch = user.password === password;

		console.log(isMatch);
		if (!isMatch)
			return res.status(400).json({ msg: "Invalid credentials" });

		// Create a JWT token payload (the student's ID and any other relevant info)
		const payload = {
			user: {
				id: user.id,
				studentID: user.studentID,
				name: user.name,
			},
		};

		// Generate a JWT token
		const token = jwt.sign(payload, "JWT_token", { expiresIn: "1h" });

		// Send the token as a response
		res.json({
			token,
			user: {
				id: user.id,
				studentID: user.studentID,
				name: user.name,
				destination: user.destination,
			},
		});
	});
});

module.exports = router;
