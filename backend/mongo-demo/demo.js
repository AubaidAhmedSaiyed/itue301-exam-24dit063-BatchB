// Task 5: "Create at least one MongoDB operation that demonstrates that the
// schema is working" + "Demonstrate at least one validation failure."
//
// Run this file directly (after setting MONGO_URI in .env):
//   node mongo-demo/demo.js
//
// It is intentionally separate from server.js so you can run it on demand
// during the viva to show both a successful write and a validation error.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// Turns a raw Mongoose error into a short, human-readable message
// instead of exposing the raw error object/stack to whoever reads the output.
function formatMongooseError(err) {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return `Validation failed: ${messages.join(", ")}`;
  }
  if (err.code === 11000) {
    return "Duplicate value: this email already exists";
  }
  return "Something went wrong while saving to the database";
}

async function run() {
  await connectDB();

  // ---------- 1. VALID operation: proves the schema works ----------
  try {
    const doctor = await Doctor.create({
      name: "Dr. Aditi Sharma",
      email: "aditi.sharma@medcareplus.com",
      specialisation: "Cardiology",
    });

    const patient = await Patient.create({
      name: "Rahul Verma",
      email: `rahul.verma.${Date.now()}@example.com`, // unique each run
      phone: "9876543210",
      bloodGroup: "B+",
      age: 29,
    });

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      date: "2026-08-25",
      timeSlot: "10:00 AM",
      reason: "Routine chest pain checkup",
      // status omitted on purpose -> should default to "pending"
    });

    console.log("VALID OPERATION SUCCEEDED:");
    console.log(appointment);
  } catch (err) {
    console.log("Unexpected error on the valid operation:", formatMongooseError(err));
  }

  // ---------- 2. INVALID operation: demonstrates validation failure ----------
  try {
    await Patient.create({
      name: "Invalid Patient",
      email: `invalid.${Date.now()}@example.com`,
      bloodGroup: "Z+", // not in the allowed enum -> should throw
      age: 40,
    });
  } catch (err) {
    console.log("EXPECTED VALIDATION FAILURE CAUGHT:");
    console.log(formatMongooseError(err)); // meaningful message, not the raw error
  }

  await mongoose.disconnect();
  process.exit(0);
}

run();
