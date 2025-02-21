import pool from "../config/db";

export class CategoryModel {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await pool.query(query);
      console.log("Category table created successfully");
    } catch (err) {
      console.error("Error creating category table", err);
    }
  }
}

// Initialize the categories table
CategoryModel.createTable();