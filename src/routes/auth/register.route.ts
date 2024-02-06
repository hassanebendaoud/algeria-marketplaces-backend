import express from 'express';

import registerSchema from '@/zod/schemas/auth/register.schema';
import register from '@controllers/auth/register.controller';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

const router = express.Router();

router.post('/', zodValidateMiddleware(registerSchema), register);

export default router;
