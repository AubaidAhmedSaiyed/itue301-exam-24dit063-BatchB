const express = require("express");
const router = express.Router();
const { doctors } = require("../data/doctors");

// GET /api/v1/doctors -> return all doctors
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors,
  });
});

module.exports = router;
