import { Router } from 'express';

import { getOneByIdProductController } from '@controllers/products';

const router = Router();

// Route for One Product by ID from database
router.get('/', getOneByIdProductController);

export default router;
