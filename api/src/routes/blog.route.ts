import express from "express";
import upload from "../config/multer.config";
import adminAuthMiddleware from "../middlewares/auth.middleware";
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blog.controller";

const router = express.Router();

// Public route
router.get("/", getAllBlogs);

// Admin protected routes
router.post("/", adminAuthMiddleware, upload.single("image"), createBlog);
router.put("/:id", adminAuthMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", adminAuthMiddleware, deleteBlog);

export default router;