import { Router } from 'express';

import { updateOneByIdUserController } from '@controllers/users';

const router = Router();

router.patch('/', updateOneByIdUserController);

export default router;
