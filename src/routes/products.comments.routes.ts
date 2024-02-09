import { Router } from 'express';

import productsCommentsControllers from '@/controllers/products.comments.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsCommentsMiddleware from '@/middleware/products.comments.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productsCommentsSchemas from '@/zod/schemas/products.comments.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(productsCommentsSchemas.getAllProductsCommentsSchema),
    productsCommentsControllers.getAllProductsCommentsController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        productsCommentsSchemas.getOneByIdProductsCommentsSchema
    ),
    productsCommentsMiddleware.isIdValid,
    productsCommentsControllers.getOneByIdProductCommentController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(productsCommentsSchemas.createProductsCommentsSchema),
    productsCommentsControllers.createProductCommentController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(productsCommentsSchemas.updateProductsCommentsSchema),
    productsCommentsMiddleware.isIdValid,
    productsCommentsMiddleware.isExists,
    productsCommentsMiddleware.isOwner,
    productsCommentsControllers.updateOneByIdProductCommentController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(productsCommentsSchemas.deleteProductsCommentsSchema),
    productsCommentsMiddleware.isIdValid,
    productsCommentsMiddleware.isExists,
    productsCommentsMiddleware.isOwner,
    productsCommentsControllers.deleteOneByIdProductCommentController
);

export default router;
