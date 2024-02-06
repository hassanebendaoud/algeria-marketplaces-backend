import { Router } from 'express';

import { getOneByUsernameUserController } from '@controllers/users';

const router = Router();

// Route for Get One User by Username from database
router.get('/', getOneByUsernameUserController);

export default router;
