import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import videoRouter from "./routes/videoRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verify environment variables
console.log("Checking environment variables...");
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables");
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

// Connect to Cloudinary
console.log("Connecting to cloudinary...");
try {
  await connectCloudinary();
  console.log("Cloudinary connected successfully");
} catch (error) {
  console.error("Failed to connect to cloudinary:", error);
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// ✅ Root welcome route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the NandiAgro Backend API!");
});

// ✅ Optional: prevent favicon 404
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/videos", videoRouter);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working" });
});

// Error handling
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
  console.log("- GET    /");
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

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
