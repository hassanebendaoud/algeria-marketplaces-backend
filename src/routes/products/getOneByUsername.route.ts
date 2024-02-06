import { Router } from 'express';

import { getOneByUsernameProductController } from '@controllers/products';

const router = Router();

// Route for Get One Product by Username from database
router.get('/', getOneByUsernameProductController);

export default router;
