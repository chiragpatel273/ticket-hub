const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ticket-hub",
    });

    console.log(`MongoDB Connected ✔️`);
    console.log(`Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error ❌");
    console.error(error.message);
    process.exit(1); // Stop server if DB fails
  }
}

module.exports = connectDB;
