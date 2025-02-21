import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
  if (!token) { res.status(401).json({ message: "Access denied. No token provided." }); return};

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).admin = decoded; // Attach admin info to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default adminAuthMiddleware;