import express from "express";
import { cost } from "../controllers/costController.js";

const router = express.Router();

router.get("/cost").get((req, res) => cost.getAllCost(req, res));
router.get("/cost").post((req, res) => cost.postCost(req, res));

export default router;