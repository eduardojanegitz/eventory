import express from "express";
import item from "./item.js";
import user from "./user.js";
import movement from "./movement.js";
import inventory from "./inventory.js";
import cost from "./cost.js";

const router = express.Router();

router.use("/", item);
router.use("/", user);
router.use("/", movement);
router.use("/", inventory);
router.use("/", cost);

export default router;
