import express from "express";
import { movement } from "../controllers/movementController.js";

const router = express.Router();


router.route("/movement").post((req, res) => movement.create(req, res));
router.route("/movement").get((req, res) => movement.getAll(req, res));


export default router;
