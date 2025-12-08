require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
// const User = require("../src/models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "ticket-hub" });

  const email = "admin@cineseat.com";
  const password = "Admin@123";

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists");
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: "Super Admin",
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created successfully!");
  console.log("Email:", email);
  console.log("Password:", password);

  process.exit(0);
}

createAdmin();
