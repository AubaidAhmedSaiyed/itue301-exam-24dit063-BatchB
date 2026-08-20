// Task 3 requirement: log every incoming request as [METHOD] [PATH] [TIMESTAMP]
// This is applied globally in server.js with app.use(requestLogger)
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl} [${timestamp}]`);
  next(); // hand control to the next middleware/route handler
}

module.exports = requestLogger;
