import { Router } from 'express';

import usersMiddleware from '@/middleware/users';
import authMiddleware from '@middleware/auth/auth.middleware';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

import {
    createUserSchema, deleteUserSchema, getAllUsersSchema, getOneByIdUserSchema,
    getOneBySlugUserSchema, getOneByUsernameUserSchema, updateUserSchema
} from '../../zod/schemas/users';
import createUserRouter from './create.route';
import deleteUserRouter from './delete.route';
import getAllUsersRouter from './getAll.route';
import getOneByIdUserRouter from './getOneById.route';
import getOneBySlugUserRouter from './getOneBySlug.route';
import getOneByUsernameUserRouter from './getOneByUsername.route';
import updateUserRouter from './update.route';

const router = Router();

router.use(
    '/get-all',
    zodValidateMiddleware(getAllUsersSchema),
    getAllUsersRouter
);
router.use(
    '/get-one-by-id',
    zodValidateMiddleware(getOneByIdUserSchema),
    usersMiddleware.isIdValid,
    getOneByIdUserRouter
);
router.use(
    '/get-one-by-username',
    zodValidateMiddleware(getOneByUsernameUserSchema),
    getOneByUsernameUserRouter
);
router.use(
    '/get-one-by-slug',
    zodValidateMiddleware(getOneBySlugUserSchema),
    getOneBySlugUserRouter
);

router.use(
    '/create',
    authMiddleware,
    zodValidateMiddleware(createUserSchema),
    usersMiddleware.isUsernameExists,
    createUserRouter
);
router.use(
    '/update',
    authMiddleware,
    zodValidateMiddleware(updateUserSchema),
    usersMiddleware.isExists,
    usersMiddleware.isUsernameExists,
    updateUserRouter
);
router.use(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(deleteUserSchema),
    usersMiddleware.isIdValid,
    usersMiddleware.isExists,
    deleteUserRouter
);

export default router;
