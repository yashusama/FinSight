const dns = require("dns");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Validate required environment variables
const requiredEnvVariables = [
  "MONGO_URI",
  "JWT_SECRET",
  "FRONTEND_URL",
];

const missingEnvVariables =
  requiredEnvVariables.filter(
    (variable) =>
      !process.env[variable]?.trim()
  );

if (missingEnvVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVariables.join(", ")}`
  );

  process.exit(1);
}

// Optional custom DNS configuration
if (process.env.USE_CUSTOM_DNS === "true") {
  dns.setServers([
    "8.8.8.8",
    "1.1.1.1",
  ]);

  console.log(
    "Custom DNS servers enabled"
  );
}

// Import database connection
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Build allowed frontend origins from FRONTEND_URL
// Example:
// FRONTEND_URL=http://localhost:5173,http://localhost:4173
const allowedOrigins = process.env.FRONTEND_URL
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without a browser origin,
    // such as Postman or server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Allow approved frontend origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Reject unknown origins
    return callback(
      new Error(
        `Origin ${origin} not allowed by CORS`
      )
    );
  },
};

app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Health / Test Route
app.get("/", (req, res) => {
  res.send(
    "FinSight Backend Running..."
  );
});

// Port
const PORT = process.env.PORT || 5000;

// Start server only after database connection succeeds
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
}

startServer();