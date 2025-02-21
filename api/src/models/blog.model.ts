import pool from "../config/db";

export class BlogModel {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        sections JSONB NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        author_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await pool.query(query);
      console.log("Blog table created successfully");
    } catch (err) {
      console.error("Error creating blog table", err);
    }
  }
}

export default BlogModel;