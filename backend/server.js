import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Needed for ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);


const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) =>
  res.sendFile(path.join(frontendPath, "index.html"))
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
