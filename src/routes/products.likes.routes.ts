import { Router } from 'express';

import productsLikesControllers from '@/controllers/products.likes.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsLikesMiddleware from '@/middleware/products.likes.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productsLikesSchemas from '@/zod/schemas/products.likes.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(productsLikesSchemas.getAllProductsLikesSchema),
    productsLikesControllers.getAllProductsLikesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(productsLikesSchemas.getOneByIdProductsLikesSchema),
    productsLikesMiddleware.isIdValid,
    productsLikesControllers.getOneByIdProductLikeController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(productsLikesSchemas.createProductsLikesSchema),
    productsLikesControllers.createProductLikeController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(productsLikesSchemas.updateProductsLikesSchema),
    productsLikesMiddleware.isIdValid,
    productsLikesMiddleware.isExists,
    productsLikesMiddleware.isOwner,
    productsLikesControllers.updateOneByIdProductLikeController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(productsLikesSchemas.deleteProductsLikesSchema),
    productsLikesMiddleware.isIdValid,
    productsLikesMiddleware.isExists,
    productsLikesMiddleware.isOwner,
    productsLikesControllers.deleteOneByIdProductLikeController
);

export default router;
