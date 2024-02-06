import { Router } from 'express';

import authMiddleware from '@middleware/auth/auth.middleware';
import loginRoute from '@routes/auth/login.route';
import protectRoute from '@routes/auth/protect.route';
import registerRoute from '@routes/auth/register.route';

const router = Router();

router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/protect', authMiddleware, protectRoute);

export default router;
