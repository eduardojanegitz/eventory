import express from "express";
import {getTags } from "../controllers/tags.js";

const router = express.Router();

router.get("/tags", getTags);

export default router;