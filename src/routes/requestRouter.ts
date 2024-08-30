import { Router } from "express";
import { Request, Response } from "express";
import RequestModel from "../models/Request";
import authenticateToken from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);


router.post("/", async (req: Request, res: Response) => {
    const { name, location, request } = req.body;
    try {
        const newRequest = new RequestModel({ name, location, request });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const requests = await RequestModel.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, location, request } = req.body;
    try {
        const updatedRequest = await RequestModel.findByIdAndUpdate(
            id,
            { name, location, request },
            { new: true }
        );
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await RequestModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
