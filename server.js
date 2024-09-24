const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const app = express();
console.log(connectDB);
// connectDB();

app.use(express.json());
app.use(cors());

app.use("/api", require("./src/routes/booking"));
app.use("/api", require("./src/routes/auth"));
app.use("/api", require("./src/routes/addData"))

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
