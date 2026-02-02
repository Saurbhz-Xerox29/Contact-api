import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config({ path: path.join(__dirname, ".env") });

const app = express();

// ---------- Middleware ----------
app.use(express.json());

// Fail fast if Mongo is unreachable
mongoose.set("bufferCommands", false);

// ---------- CORS ----------
function getCorsOrigins() {
  const raw = process.env.CORS_ORIGINS;

  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      return true; // allow deployed frontend
    }
    return ["http://localhost:5173", "http://127.0.0.1:5173"];
  }

  if (raw.trim() === "*") return true;

  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

app.use(
  cors({
    origin: getCorsOrigins(),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------- API Routes ----------
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

// ---------- Health Check ----------
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// ---------- Production Frontend (optional) ----------
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDistPath));

  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// ---------- 404 Handler ----------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// ---------- MongoDB ----------
if (!process.env.MONGO_URI) {
  console.warn("⚠️  MONGO_URI is not set");
} else {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "NodeJs_Mastery_Course",
      serverSelectionTimeoutMS: 8000,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

// ---------- JWT Check ----------
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET is not set");
}

// ---------- Server ----------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
