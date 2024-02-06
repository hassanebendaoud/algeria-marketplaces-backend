import { Router } from 'express';

import { createProductController } from '@controllers/products';

const router = Router();

router.post('/', createProductController);

export default router;
