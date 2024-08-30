"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const requestRouter_1 = __importDefault(require("./routes/requestRouter"));
const donorRoutes_1 = __importDefault(require("./routes/donorRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB connection
const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/blood_bank_management";
mongoose_1.default
    .connect(dbUrl)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/requests", authMiddleware_1.default, requestRouter_1.default); // Protect routes with authentication
app.use("/api/donors", authMiddleware_1.default, donorRoutes_1.default); // Protect routes with authentication
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map