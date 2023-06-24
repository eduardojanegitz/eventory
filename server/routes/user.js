import express from "express";
import { users } from "../controllers/userController.js";

const router = express.Router();

router.route("/user").get((req, res) => users.getAll(req, res));
// USUÁRIO SETADO PARA APARECER O NOME
// router.route("/user/:id").get((req, res) => users.getById(req, res));
router.route("/user").post((req, res) => users.create(req, res));

export default router;
