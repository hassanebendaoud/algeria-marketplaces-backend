import { Router } from 'express';

import { getOneBySlugUserController } from '@controllers/users';

const router = Router();

// Route for Get One User by Slug from database
router.get('/', getOneBySlugUserController);

export default router;
