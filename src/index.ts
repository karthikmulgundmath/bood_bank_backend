import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import requestRoutes from "./routes/requestRouter";
import donorRoutes from "./routes/donorRoutes";
import authRoutes from "./routes/authRoutes";
import authenticateToken from "./middleware/authMiddleware";

config();

const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB connection
const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/blood_bank_management";

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

// Apply authentication middleware to specific routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", authenticateToken, requestRoutes);
app.use("/api/donors", authenticateToken, donorRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
