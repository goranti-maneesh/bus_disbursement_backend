const express = require("express");
const connectDB = require("../config/db");
const cors = require("cors");

const app = express();
console.log(connectDB);
// connectDB();

app.use(express.json());
app.use(cors());

app.use("/api", require("../routes/booking"));
app.use("/api", require("../routes/auth"));
app.use("/api", require("../routes/addData"))

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
