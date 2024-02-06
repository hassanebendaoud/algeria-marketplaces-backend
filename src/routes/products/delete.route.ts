import { Router } from 'express';

import { deleteOneByIdProductController } from '@controllers/products';

const router = Router();

router.delete('/', deleteOneByIdProductController);

export default router;
