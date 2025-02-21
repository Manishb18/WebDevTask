import express from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import  adminAuthMiddleware  from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", adminAuthMiddleware, createCategory);
router.put("/:id", adminAuthMiddleware, updateCategory);
router.delete("/:id", adminAuthMiddleware, deleteCategory);

export default router;
