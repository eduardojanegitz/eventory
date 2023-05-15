import express from "express";
import { getProducts, getCustomers, getTransactions } from "../controllers/client.js";

const router = express.Router();

router.get("/itens", getProducts);
router.get("/usuarios", getCustomers);
router.get("/inventarios", getTransactions);

export default router;
