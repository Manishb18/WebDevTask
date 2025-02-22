import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import blogRoutes from "./routes/blog.route";
import categoryRoutes from "./routes/category.routes";

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("uploadsDir =>", path.join(__dirname, "uploads"));



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
