import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// .env setup (always resolve from this backend folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, ".env") });

app.use(express.json());

// Fail fast instead of hanging requests when Mongo isn't reachable
mongoose.set("bufferCommands", false);

function getCorsOrigins() {
  const raw = process.env.CORS_ORIGINS;
  if (!raw) {
    // In production, default to reflecting the request Origin so deployed
    // frontend (served by this server) can call /api without extra config.
    if (process.env.NODE_ENV === "production") return true;
    return ["http://localhost:5173", "http://127.0.0.1:5173"];
  }
  if (raw.trim() === "*") return "*";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

app.use(
  cors({
    origin: getCorsOrigins(),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Auth", "Authorization"],
  })
);

// .env setup (always resolve from this backend folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, ".env") });

// user Router
app.use("/api/user",userRouter);

// contact Router 
app.use('/api/contact',contactRouter)


// home route
app.get("/", (req, res) => {
  res.json({ message: "This is home route working" });
});

// Always return JSON for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: "Server error" });
});



if (!process.env.MONGO_URI) {
  // eslint-disable-next-line no-console
  console.warn(
    "MONGO_URI is not set. Create backend/.env (copy from backend/.env.example) so the API can connect to MongoDB."
  );
} else {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "NodeJs_Mastery_Course",
      serverSelectionTimeoutMS: 8000,
    })
    .then(() => console.log("MongoDb Connected..!"))
    .catch((err) => console.log(err));
}

if (!process.env.JWT) {
  // eslint-disable-next-line no-console
  console.warn(
    "JWT is not set. Create backend/.env (copy from backend/.env.example) so login can sign tokens."
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));