const express = require("express");
const app = express();
const connectDB = require("./config/db"); // adjust path if needed
const cors = require("cors");
const bodyParser = require("body-parser");
const newsletterRoute = require("./routes/newsletterRoutes");
const blogRoute = require("./routes/blog");
const contactRoute = require("./routes/contact");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");

const authRoutes = require("./routes/authenticationRoutes");
const roleRoutes = require("./routes/roleRoutes");
const { runTests } = require("./tests/test-basic-DataSetup"); // Adjust the path if different

const leaveRequestRoutes = require("./routes/leaveRequestRoutes"); // Import leaveRequestRoutes

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const leavesRoutes = require("./routes/leaves");

// Use CORS middleware to allow requests from your frontend
app.use(
  cors({
    origin: [
      process.env.WOUESSI_FRONTEND_URL,
      "https://dev.wouessi.com/en",
      "https://dev.wouessi.com",
      "https://www.wouessi.com/en",
      "https://www.wouessi.com",
      "https://www.wouessi.ca/en/",
      "https://www.wouessi.ca",
      "http://localhost:3000",
    ], // Dynamically set the allowed CORS origin
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Add the newsletter route
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);

//new
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoutes);

// Employee Routes
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/leaves", leavesRoutes);

const dbName = "wouessi_ems";

connectDB()
  .then(async () => {
    console.log(`✅ Successfully connected to the database: ${dbName}`);

    // Run test data setup at startup
    await runTests();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit the process if the connection fails
  });

// Define your routes
app.get("/", (req, res) => {
  res.send("Welcome to Wouessi Back Office");
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
