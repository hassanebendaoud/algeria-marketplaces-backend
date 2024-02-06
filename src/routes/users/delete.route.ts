import { Router } from 'express';

import { deleteOneByIdUserController } from '@controllers/users';

const router = Router();

router.delete('/', deleteOneByIdUserController);

export default router;
