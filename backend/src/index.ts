import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
import myHotelsRoutes from "./routes/myhotels.route";

import logger from "./middlewares/logger.middleware";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(logger);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/myhotels", myHotelsRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the "dist" directory
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  // For any route that doesn't match a static file, serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
