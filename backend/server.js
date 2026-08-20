require("dotenv").config();
const express = require("express");
const cors = require("cors");

const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");

const app = express();

// --- Core middleware ---
app.use(cors());
app.use(express.json()); // parse JSON request bodies
app.use(requestLogger); // Task 3: applied globally, logs every request

// --- Routes ---
app.get("/", (req, res) => {
  res.send("MedCare Plus API is running. Try /api/v1/doctors");
});

app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/appointments", appointmentsRouter);

// --- 404 handler for unknown routes ---
app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// --- Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
