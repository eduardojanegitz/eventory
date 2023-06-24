import express from "express";
import { getItems, getNewItems } from "../controllers/items.js";

const router = express.Router();

router.get("/items", getItems);
router.get("/newitems", getNewItems);

export default router;
