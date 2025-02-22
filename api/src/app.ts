import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";
import adminRoutes from "./routes/admin.route";
import blogRoutes from "./routes/blog.route";
import categoryRoutes from "./routes/category.routes";

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("uploadsDir =>", path.join(__dirname, "uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog API" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);

export default app;