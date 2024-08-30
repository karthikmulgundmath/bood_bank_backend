"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Donor_1 = __importDefault(require("../models/Donor")); // Adjust path as necessary
const router = (0, express_1.Router)();
// Create a new donor
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donorData = req.body;
    try {
        const newDonor = new Donor_1.default(donorData);
        yield newDonor.save();
        res.status(201).json(newDonor);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Read all donors
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donors = yield Donor_1.default.find();
        res.status(200).json(donors);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Update a donor
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const donorData = req.body;
    try {
        const updatedDonor = yield Donor_1.default.findByIdAndUpdate(id, donorData, { new: true });
        res.status(200).json(updatedDonor);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete a donor
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Donor_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=donorRoutes.js.map