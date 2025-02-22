import { Request, Response } from "express";
import pool from "../config/db";

// Fetch all blogs with category names
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { search, category_id } = req.query;

    let query = `
      SELECT blogs.*, categories.name AS category_name 
      FROM blogs 
      JOIN categories ON blogs.category_id = categories.id
    `;

    let countQuery = `SELECT COUNT(*) AS total FROM blogs JOIN categories ON blogs.category_id = categories.id`;

    let conditions: string[] = [];
    let values: any[] = [];

    if (category_id) {
      conditions.push(`blogs.category_id = $${values.length + 1}`);
      values.push(category_id);
    }

    if (search) {
      conditions.push(
        `(blogs.title ILIKE $${values.length + 1} OR categories.name ILIKE $${
          values.length + 1
        })`
      );
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
      countQuery += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` ORDER BY blogs.created_at DESC;`;

    const result = await pool.query(query, values);
    const countResult = await pool.query(countQuery, values);
    const totalCount = parseInt(countResult.rows[0].total, 10);

    res.status(200).json({
      total: totalCount,
      blogs: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Create a new blog (Admin Only) with multiple image support
export const createBlog = async (req: Request, res: Response) => {
  const { title, sections, description, category_id } = req.body;
  const adminId = (req as any).admin.id;

  console.log("req.body =>", req.body);
  console.log("req.files =>", req.files);

  if (!title || !sections || !category_id) {
    res
      .status(400)
      .json({ message: "Title, sections, and category_id are required" });
    return;
  }

  try {
    const categoryCheckQuery = "SELECT id FROM categories WHERE id = $1;";
    const categoryResult = await pool.query(categoryCheckQuery, [category_id]);

    if (categoryResult.rows.length === 0) {
      res
        .status(400)
        .json({ message: "Invalid category_id. Category does not exist." });
      return;
    }

    let parsedSections = JSON.parse(sections);

    // Handle images
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Append banner image if uploaded
    let bannerImageUrl = null;
    if (files?.bannerImage) {
      bannerImageUrl = `/uploads/${files.bannerImage[0].filename}`;
    }

    // Append section images
    if (files?.sectionImages) {
      files.sectionImages.forEach((file) => {
        parsedSections.push({
          type: "image",
          url: `/uploads/${file.filename}`,
        });
      });
    }

    const query = `
      INSERT INTO blogs (title, sections, category_id, author_id, bannerImage, description) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;
    const values = [
      title,
      JSON.stringify(parsedSections),
      category_id,
      adminId,
      bannerImageUrl,
      description,
    ];
    const result = await pool.query(query, values);

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { title, description, sections, category_id, bannerImage } = req.body;
  const { id } = req.params;
  const adminId = (req as any).admin.id;

  try {
    // Fetch existing blog data
    const fetchQuery = `SELECT sections, bannerImage, description FROM blogs WHERE id = $1 AND author_id = $2`;
    const fetchResult = await pool.query(fetchQuery, [id, adminId]);

    if (fetchResult.rows.length === 0) {
      res.status(404).json({ message: "Blog not found or unauthorized" });
      return;
    }

    let existingSections = fetchResult.rows[0].sections || [];
    let parsedSections =
      typeof sections === "string"
        ? JSON.parse(sections)
        : sections || existingSections;

    // Handle file uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Determine banner image value
    let bannerImageUrl = fetchResult.rows[0].banner_image; // Default to existing image
    if (files?.bannerImage?.[0]) {
      bannerImageUrl = `/uploads/${files.bannerImage[0].filename}`; // New upload
    } else if (bannerImage === "null" || bannerImage === "") {
      bannerImageUrl = null; // Explicitly remove banner image if sent as empty/null
    }

    // Handle section images
    if (files?.sectionImages) {
      files.sectionImages.forEach((file, index) => {
        const imageSection = {
          type: "image",
          url: `/uploads/${file.filename}`,
        };

        // Replace an existing image section if present, otherwise push
        if (parsedSections[index]?.type === "image") {
          parsedSections[index] = imageSection;
        } else {
          parsedSections.push(imageSection);
        }
      });
    }

    // Update database
    const updateQuery = `
      UPDATE blogs 
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description),
          sections = COALESCE($3, sections),
          category_id = COALESCE($4, category_id),
          bannerImage = COALESCE($5, bannerImage),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 AND author_id = $7 
      RETURNING *;
    `;
    const updateValues = [
      title,
      description || fetchResult.rows[0].description, // Keep existing description if not updated
      JSON.stringify(parsedSections),
      category_id,
      bannerImageUrl,
      id,
      adminId,
    ];
    const updateResult = await pool.query(updateQuery, updateValues);

    if (!updateResult.rows.length) {
      res.status(404).json({ message: "Blog not found or unauthorized" });
      return;
    }

    res
      .status(200)
      .json({
        message: "Blog updated successfully",
        blog: updateResult.rows[0],
      });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// Delete a blog (Admin Only)
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminId = (req as any).admin.id;
  console.log("id : ", id);

  try {
    const query = "DELETE FROM blogs WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);

    if (!result.rows.length) {
      res.status(404).json({ message: "Blog not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
