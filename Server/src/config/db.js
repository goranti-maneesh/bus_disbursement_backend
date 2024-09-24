const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Error opening SQLite database:", err.message);
	} else {
		console.log("Connected to SQLite database on port 3001.");
	}
});

module.exports = db;
