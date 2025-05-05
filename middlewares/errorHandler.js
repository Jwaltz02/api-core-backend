function errorHandler(err, req, res, next) {
  console.error(err.stack); // Optional: log for debugging

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
