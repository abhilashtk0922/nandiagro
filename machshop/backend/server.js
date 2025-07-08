import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import videoRouter from "./routes/videoRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 3000;

// Verify environment variables
console.log("Checking environment variables...");
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.error(
    "ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables"
  );
  process.exit(1);
}

// Connect to database
console.log("Connecting to database...");
try {
  await connectDB();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

// Connect to cloudinary
console.log("Connecting to cloudinary...");
try {
  await connectCloudinary();
  console.log("Cloudinary connected successfully");
} catch (error) {
  console.error("Failed to connect to cloudinary:", error);
  process.exit(1);
}

// middlewares
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));
  next();
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/videos", videoRouter);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  console.log("404 Not Found:", req.method, req.url);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// Start server
const server = app.listen(port, () => {
  console.log("=".repeat(50));
  console.log(`Server started on PORT: ${port}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
  console.log("Available routes:");
  console.log("- GET    /health");
  console.log("- GET    /api/test");
  console.log("- GET    /api/videos/test");
  console.log("- GET    /api/videos/all");
  console.log("- POST   /api/videos/add");
  console.log("- PUT    /api/videos/update/:id");
  console.log("- DELETE /api/videos/delete/:id");
  console.log("- PUT    /api/videos/toggle/:id");
  console.log("- PUT    /api/videos/reorder");
  console.log("=".repeat(50));
});

// Handle server errors
server.on("error", (error) => {
  console.error("Server error:", error);
  process.exit(1);
});

// Handle process termination
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
