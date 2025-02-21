import pool from "../config/db";

// Find an admin by email
export const findAdminByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
  return result.rows[0]; // Returns an object if found, otherwise undefined
};

// Create a new admin
export const createAdmin = async (name: string, email: string, hashedPassword: string) => {
  const result = await pool.query(
    "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  return result.rows[0]; // Returns the newly created admin
};
