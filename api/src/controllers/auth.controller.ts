import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../models/user.model";
import { User } from "../types/user.types";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) {
      res.status(400).json({ message: "User already exists" });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered", user });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
