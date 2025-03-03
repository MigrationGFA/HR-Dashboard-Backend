require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/dbConnect.js");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/config/cors.js");
const authRoutes = require("./src/routes/authRoutes.js");
const profileRoutes = require("./src/routes/profileRoutes.js");
const PORT = process.env.PORT || 9090;

connectDB();
app.use(express.json());

app.use(cors(corsOptions));

app.use("/api/v1", authRoutes);
app.use("/api/v1", profileRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});