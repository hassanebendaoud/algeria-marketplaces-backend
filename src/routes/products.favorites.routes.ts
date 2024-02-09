import { Router } from 'express';

import productsFavoritesControllers from '@/controllers/products.favorites.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsFavoritesMiddleware from '@/middleware/products.favorites.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productsFavoritesSchemas from '@/zod/schemas/products.favorites.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        productsFavoritesSchemas.getAllProductsFavoritesSchema
    ),
    productsFavoritesControllers.getAllProductsFavoritesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        productsFavoritesSchemas.getOneByIdProductsFavoritesSchema
    ),
    productsFavoritesMiddleware.isIdValid,
    productsFavoritesControllers.getOneByIdProductFavoriteController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        productsFavoritesSchemas.createProductsFavoritesSchema
    ),
    productsFavoritesControllers.createProductFavoriteController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        productsFavoritesSchemas.updateProductsFavoritesSchema
    ),
    productsFavoritesMiddleware.isIdValid,
    productsFavoritesMiddleware.isExists,
    productsFavoritesMiddleware.isOwner,
    productsFavoritesControllers.updateOneByIdProductFavoriteController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        productsFavoritesSchemas.deleteProductsFavoritesSchema
    ),
    productsFavoritesMiddleware.isIdValid,
    productsFavoritesMiddleware.isExists,
    productsFavoritesMiddleware.isOwner,
    productsFavoritesControllers.deleteOneByIdProductFavoriteController
);

export default router;
