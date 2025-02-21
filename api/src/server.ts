import app from "./app";
import dotenv from "dotenv";
import pool from "./config/db";
import { BlogModel } from "./models/blog.model";
import { CategoryModel } from "./models/category.model";

dotenv.config();

const PORT = process.env.PORT || 5000;

const initializeDatabase = async () => {
  try {
    await BlogModel.createTable();
    await CategoryModel.createTable();
    console.log("Database tables initialized");
  } catch (error) {
    console.error("Error initializing database tables:", error);
  }
};

// Start server after DB initialization
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});