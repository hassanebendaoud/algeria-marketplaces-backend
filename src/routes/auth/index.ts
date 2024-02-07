import { Router } from 'express';

import loginSchema from '@/zod/schemas/auth/login.schema';
import registerSchema from '@/zod/schemas/auth/register.schema';
import login from '@controllers/auth/login.controller';
import protect from '@controllers/auth/protect.controller';
import register from '@controllers/auth/register.controller';
import authMiddleware from '@middleware/auth/auth.middleware';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

const router = Router();

router.post('/login', zodValidateMiddleware(loginSchema), login);
router.post('/register', zodValidateMiddleware(registerSchema), register);
router.get('/', authMiddleware, protect);

export default router;
