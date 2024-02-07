import { Router } from 'express';

import usersController from '@/controllers/users.controller';
import authMiddleware from '@/middleware/auth.middleware';
import usersMiddleware from '@/middleware/users.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import usersSchemas from '@/zod/schemas/users.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(usersSchemas.getAllUsersSchema),
    usersController.getAllUsersController
);
router.get(
    '/get-one-by-id',
    zodValidateMiddleware(usersSchemas.getOneByIdUserSchema),
    usersMiddleware.isIdValid,
    usersController.getOneByIdUserController
);
router.get(
    '/get-one-by-username',
    zodValidateMiddleware(usersSchemas.getOneByUsernameUserSchema),
    usersController.getOneByUsernameUserController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(usersSchemas.createUserSchema),
    usersMiddleware.isUsernameExists,
    usersController.createUserController
);
router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(usersSchemas.updateUserSchema),
    usersMiddleware.isExists,
    usersMiddleware.isUsernameExists,
    usersController.updateOneByIdUserController
);
router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(usersSchemas.deleteUserSchema),
    usersMiddleware.isIdValid,
    usersMiddleware.isExists,
    usersController.deleteOneByIdUserController
);

export default router;
