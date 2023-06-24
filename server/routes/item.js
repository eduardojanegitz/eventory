import express from "express";
import { postItem } from "../controllers/itemController.js";

const router = express.Router();

router.route("/item").get((req, res) => postItem.getAll(req, res));
router.route("/item").post((req, res) => postItem.create(req, res));
router.route("/item/count").get((req, res) => postItem.countDoc(req, res));
router.route("/item/count-value").get((req, res) => postItem.countValue(req, res));
router.route("/item/:tag").get((req, res) => postItem.getOne(req, res));

export default router;
