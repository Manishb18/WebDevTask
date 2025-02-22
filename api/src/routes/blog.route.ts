import express from "express";
import upload from "../config/multer.config";
import adminAuthMiddleware from "../middlewares/auth.middleware";
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blog.controller";

const router = express.Router();

// Public route - Fetch all blogs
router.get("/", getAllBlogs);

// Admin protected routes
router.post("/", adminAuthMiddleware, upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "sectionImages", maxCount: 10 }]), createBlog);
router.put("/:id", adminAuthMiddleware, upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "sectionImages", maxCount: 10 }]), updateBlog);
router.delete("/:id", adminAuthMiddleware, deleteBlog);

export default router;