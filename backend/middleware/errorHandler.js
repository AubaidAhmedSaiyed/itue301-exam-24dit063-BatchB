// Task 3 requirement: global error handler, must be the LAST middleware in server.js.
// It must return structured JSON instead of leaking the raw stack trace.
// Express recognises this as an error handler because it has 4 parameters (err, req, res, next).
function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
