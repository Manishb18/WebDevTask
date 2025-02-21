import pool from "../config/db";
import { User } from "../types/user.types";

export const createUser = async (user: User) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.name, user.email, user.password]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
