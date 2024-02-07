import { Router } from 'express';

import authController from '@/controllers/auth.controller';
import authMiddleware from '@/middleware/auth.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import authSchemas from '@/zod/schemas/auth.schemas';

const router = Router();

router.post(
    '/login',
    zodValidateMiddleware(authSchemas.loginSchema),
    authController.loginController
);
router.post(
    '/register',
    zodValidateMiddleware(authSchemas.registerSchema),
    authController.registerController
);
router.get('/', authMiddleware, authController.protectController);

export default router;
