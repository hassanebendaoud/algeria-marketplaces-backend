import { Router } from 'express';

import { getOneBySlugProductController } from '@controllers/products';

const router = Router();

// Route for Get One Product by Slug from database
router.get('/', getOneBySlugProductController);

export default router;
