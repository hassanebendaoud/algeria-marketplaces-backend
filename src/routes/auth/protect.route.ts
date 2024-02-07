import express from "express";
import protect from "../../controllers/auth/protect.controller";

const router = express.Router();

router.get("/", protect);

export default router;
