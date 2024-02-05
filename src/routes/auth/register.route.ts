import express from "express";
import register from "../../controllers/auth/register.controller";
import zodValidateMiddleware from "../../middleware/zod-validate.middle";
import registerSchema from "../../zod/schema/register.schema";

const router = express.Router();

router.post("/", zodValidateMiddleware(registerSchema), register);

export default router;
