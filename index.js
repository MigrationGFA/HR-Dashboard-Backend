require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/dbConnect.js");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/config/cors.js");
const authRoutes = require("./src/routes/authRoutes.js");
const profileRoutes = require("./src/routes/profileRoutes.js");
const leaveRoutes = require("./src/routes/leaveRoutes.js");
const taskRoutes = require("./src/routes/taskRoutes")
const anonymousSuggestionRoutes = require("./src/routes/anonymous.js")
const PORT = process.env.PORT || 9090;

connectDB();
app.use(express.json());

app.use(cors(corsOptions));

app.use("/api/v1", authRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", leaveRoutes);
app.use("/api/v1", taskRoutes)
app.use("/api/v1", anonymousSuggestionRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});