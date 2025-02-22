import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAdminByEmail, createAdmin } from "../models/admin.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Admin Registration
export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
       res.status(400).json({ message: "Admin already exists" });
       return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await createAdmin(name, email, hashedPassword);

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const admin = await findAdminByEmail(email);
    if (!admin) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
       res.status(400).json({ message: "Invalid credentials" });
       return;
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: "5h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
