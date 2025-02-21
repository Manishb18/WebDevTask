import { Request, Response } from "express";
import pool from "../config/db";

// Fetch all categories (Public)
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM categories ORDER BY created_at DESC;";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Create a new category (Admin Only)
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
     res.status(400).json({ message: "Category name is required" });
     return
  }

  try {
    const query = "INSERT INTO categories (name) VALUES ($1) RETURNING *;";
    const result = await pool.query(query, [name]);

    res.status(201).json({ message: "Category created successfully", category: result.rows[0] });
  } catch (error: any) {
    if (error.code === "23505") {
       res.status(400).json({ message: "Category name must be unique" });
       return
    }
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Update a category (Admin Only)
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
     res.status(400).json({ message: "Category name is required" });
     return
  }

  try {
    const query = "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *;";
    const result = await pool.query(query, [name, id]);

    if (!result.rows.length) {
       res.status(404).json({ message: "Category not found" });
       return
    }

    res.status(200).json({ message: "Category updated successfully", category: result.rows[0] });
  } catch (error: any) {
    if (error.code === "23505") {
       res.status(400).json({ message: "Category name must be unique" });
       return
    }
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete a category (Admin Only)
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM categories WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);

    if (!result.rows.length) {
       res.status(404).json({ message: "Category not found" });
       return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
