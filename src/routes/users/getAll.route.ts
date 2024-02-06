import { Router } from 'express';

import { getAllUsersController } from '@controllers/users';

const router = Router();

// Route for Get All Users from database
router.get('/', getAllUsersController);

export default router;
