const express = require("express");
const router = express.Router();
const { appointments } = require("../data/doctors");

// GET /api/v1/appointments -> return all appointments
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
});

// POST /api/v1/appointments -> create a new appointment
router.post("/", (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, reason } = req.body;

    // Basic validation — wrapped so a thrown error goes to the global error handler
    if (!patientName || !doctorName || !date || !timeSlot) {
      const err = new Error(
        "patientName, doctorName, date and timeSlot are required"
      );
      err.statusCode = 400;
      throw err;
    }

    const newAppointment = {
      id: `a${appointments.length + 1}`,
      patientName,
      doctorName,
      date,
      timeSlot,
      status: "pending", // default status per spec
      reason: reason || "",
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      data: newAppointment,
    });
  } catch (err) {
    next(err); // forward to global error-handling middleware
  }
});

module.exports = router;
