import { Router } from 'express';

import authMiddleware from '../../middleware/auth.middleware';
import loginRoute from './login.route';
import protectRoute from './protect.route';
import registerRoute from './register.route';

const router = Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/protect", authMiddleware, protectRoute);

export default router;
