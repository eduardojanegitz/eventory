import express from "express";
import { inventory } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/inventory").get((req, res) => inventory.getAllInventory(req, res));
router.route("/inventory").post((req, res) => inventory.create(req, res));

export default router;