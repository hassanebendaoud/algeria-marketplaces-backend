import { Router } from 'express';

import { createUserController } from '@controllers/users';

const router = Router();

router.post('/', createUserController);

export default router;
