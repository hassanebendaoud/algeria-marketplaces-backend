import { Router } from 'express';

import { updateOneByIdProductController } from '@controllers/products';

const router = Router();

router.patch('/', updateOneByIdProductController);

export default router;
