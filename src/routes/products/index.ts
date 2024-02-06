import { Router } from 'express';

import productsMiddleware from '@/middleware/products';
import authMiddleware from '@middleware/auth/auth.middleware';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

import {
    createProductSchema, deleteProductSchema, getAllProductsSchema, getOneByIdProductSchema,
    getOneBySlugProductSchema, getOneByUsernameProductSchema, updateProductSchema
} from '../../zod/schemas/products';
import createProductRouter from './create.route';
import deleteProductRouter from './delete.route';
import getAllProductsRouter from './getAll.route';
import getOneByIdProductRouter from './getOneById.route';
import getOneBySlugProductRouter from './getOneBySlug.route';
import getOneByUsernameProductRouter from './getOneByUsername.route';
import updateProductRouter from './update.route';

const router = Router();

router.use(
    '/get-all',
    zodValidateMiddleware(getAllProductsSchema),
    getAllProductsRouter
);
router.use(
    '/get-one-by-id',
    zodValidateMiddleware(getOneByIdProductSchema),
    productsMiddleware.isIdValid,
    getOneByIdProductRouter
);
router.use(
    '/get-one-by-username',
    zodValidateMiddleware(getOneByUsernameProductSchema),
    getOneByUsernameProductRouter
);
router.use(
    '/get-one-by-slug',
    zodValidateMiddleware(getOneBySlugProductSchema),
    getOneBySlugProductRouter
);

router.use(
    '/create',
    authMiddleware,
    zodValidateMiddleware(createProductSchema),
    // productsMiddleware.isSlugExists,
    createProductRouter
);
router.use(
    '/update',
    authMiddleware,
    zodValidateMiddleware(updateProductSchema),
    productsMiddleware.isExists,
    // productsMiddleware.isSlugExists,
    productsMiddleware.isOwner,
    updateProductRouter
);
router.use(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(deleteProductSchema),
    productsMiddleware.isIdValid,
    productsMiddleware.isExists,
    productsMiddleware.isOwner,
    deleteProductRouter
);

export default router;
