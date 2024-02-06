import express from 'express';

import loginSchema from '@/zod/schemas/auth/login.schema';
import login from '@controllers/auth/login.controller';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

const router = express.Router();

router.post("/", zodValidateMiddleware(loginSchema), login);

export default router;
