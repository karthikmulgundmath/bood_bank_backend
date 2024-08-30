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
const Request_1 = __importDefault(require("../models/Request")); // Adjust path as necessary
const router = (0, express_1.Router)();
// Create a new request
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, request } = req.body;
    try {
        const newRequest = new Request_1.default({ name, location, request });
        yield newRequest.save();
        res.status(201).json(newRequest);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Read all requests
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield Request_1.default.find();
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Update a request
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, location, request } = req.body;
    try {
        const updatedRequest = yield Request_1.default.findByIdAndUpdate(id, { name, location, request }, { new: true });
        res.status(200).json(updatedRequest);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete a request
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Request_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=requestRouter.js.map