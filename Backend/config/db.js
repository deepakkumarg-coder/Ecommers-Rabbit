const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB IS CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("MONGODB CONNECTION FAILED", err);
    process.exit(1)
  }
};
module.exports = connectDB;
