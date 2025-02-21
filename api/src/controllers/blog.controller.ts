import { Request, Response } from "express";
import pool from "../config/db";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT blogs.*, categories.name AS category_name 
      FROM blogs 
      JOIN categories ON blogs.category_id = categories.id
    `;

    let countQuery = `SELECT COUNT(*) AS total FROM blogs JOIN categories ON blogs.category_id = categories.id`;

    let values: string[] = [];

    if (search) {
      query += ` 
        WHERE blogs.title ILIKE $1 
        OR categories.name ILIKE $1
        ORDER BY blogs.created_at DESC;
      `;

      countQuery += ` 
        WHERE blogs.title ILIKE $1 
        OR categories.name ILIKE $1;
      `;

      values = [`%${search}%`]; // Adding wildcard (%) for partial matching
    } else {
      query += ` ORDER BY blogs.created_at DESC;`;
    }

    const result = await pool.query(query, values);
    const countResult = await pool.query(countQuery, values);
    const totalCount = parseInt(countResult.rows[0].total, 10);

    res.status(200).json({
      total: totalCount,
      blogs: result.rows
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};


// Create a new blog (Admin Only)
export const createBlog = async (req: Request, res: Response) => {
  const { title, sections, category_id } = req.body;
  const adminId = (req as any).admin.id; // Extract adminId from JWT middleware

  if (!title || !sections || !category_id) {
     res.status(400).json({ message: "Title, sections, and category_id are required" });
     return
  }

  try {
    // Check if the category exists
    const categoryCheckQuery = "SELECT id FROM categories WHERE id = $1;";
    const categoryResult = await pool.query(categoryCheckQuery, [category_id]);

    if (categoryResult.rows.length === 0) {
       res.status(400).json({ message: "Invalid category_id. Category does not exist." });
       return
    }

    // Insert the blog
    const query = `
      INSERT INTO blogs (title, sections, category_id, author_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [title, JSON.stringify(sections), category_id, adminId];
    const result = await pool.query(query, values);

    res.status(201).json({ message: "Blog created successfully", blog: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// Update a blog (Admin Only)
export const updateBlog = async (req: Request, res: Response) => {
  const { title, sections, category_id } = req.body;
  const { id } = req.params;
  const adminId = (req as any).admin.id;

  try {
    const query = `
      UPDATE blogs 
      SET title = COALESCE($1, title), 
          sections = COALESCE($2, sections),
          category_id = COALESCE($3, category_id),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND author_id = $5 
      RETURNING *;
    `;
    const values = [title, sections ? JSON.stringify(sections) : null, category_id, id, adminId];
    const result = await pool.query(query, values);

    if (!result.rows.length) {
      res.status(404).json({ message: "Blog not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Blog updated successfully", blog: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// Delete a blog (Admin Only)
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminId = (req as any).admin.id;

  try {
    const query = "DELETE FROM blogs WHERE id = $1 AND author_id = $2 RETURNING *;";
    const result = await pool.query(query, [id, adminId]);

    if (!result.rows.length) {
      res.status(404).json({ message: "Blog not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};