import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Real Routes
app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://viraatshrivastava0700:plBk7hXLGUiQNr7f@memories.jnpjvfe.mongodb.net/memories?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

startServer();
