import express from "express";
import login from "../../controllers/auth/login.controller";
import zodValidateMiddleware from "../../middleware/zod-validate.middle";
import loginSchema from "../../zod/schema/login.schema";

const router = express.Router();

router.post("/", zodValidateMiddleware(loginSchema), login);

export default router;
