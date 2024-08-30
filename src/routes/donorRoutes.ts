import { Router } from "express";
import { Request, Response } from "express";
import DonorModel from "../models/Donor";
import authenticateToken from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/", async (req: Request, res: Response) => {
    const donorData = req.body;
    try {
        const newDonor = new DonorModel(donorData);
        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const donors = await DonorModel.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const donorData = req.body;
    try {
        const updatedDonor = await DonorModel.findByIdAndUpdate(
            id,
            donorData,
            { new: true }
        );
        res.status(200).json(updatedDonor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await DonorModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
