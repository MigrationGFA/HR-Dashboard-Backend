require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/dbConnect.js");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/config/cors.js");
const PORT = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: false }));

connectDB();

app.use(cors(corsOptions));

// build in middleware for json
app.use(express.json({ limit: "10mb" }));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});