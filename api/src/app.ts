import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;