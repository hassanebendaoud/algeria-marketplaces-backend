import { Router } from 'express';

import { getAllProductsController } from '@controllers/products';

const router = Router();

// Route for Get All Products from database
router.get('/', getAllProductsController);

export default router;
