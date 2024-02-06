import { Router } from 'express';

import { getOneByIdUserController } from '@controllers/users';

const router = Router();

// Route for One User by ID from database
router.get('/', getOneByIdUserController);

export default router;
