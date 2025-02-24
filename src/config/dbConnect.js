const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/remsana");
    await mongoose.connect(process.env.DATA_BASE_MONGODB);

    console.log("Mongodb database connected sucessfully");
  } catch (error) {
    console.log("error connecting to Mongodb server", error.message);
  }
};

module.exports = { connectDB };
