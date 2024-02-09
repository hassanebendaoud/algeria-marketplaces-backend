import { Router } from 'express';

import productsReviewsControllers from '@/controllers/products.reviews.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsReviewsMiddleware from '@/middleware/products.reviews.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productsReviewsSchemas from '@/zod/schemas/products.reviews.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(productsReviewsSchemas.getAllProductsReviewsSchema),
    productsReviewsControllers.getAllProductsReviewsController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        productsReviewsSchemas.getOneByIdProductsReviewsSchema
    ),
    productsReviewsMiddleware.isIdValid,
    productsReviewsControllers.getOneByIdProductReviewController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(productsReviewsSchemas.createProductsReviewsSchema),
    productsReviewsControllers.createProductReviewController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(productsReviewsSchemas.updateProductsReviewsSchema),
    productsReviewsMiddleware.isIdValid,
    productsReviewsMiddleware.isExists,
    productsReviewsMiddleware.isOwner,
    productsReviewsControllers.updateOneByIdProductReviewController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(productsReviewsSchemas.deleteProductsReviewsSchema),
    productsReviewsMiddleware.isIdValid,
    productsReviewsMiddleware.isExists,
    productsReviewsMiddleware.isOwner,
    productsReviewsControllers.deleteOneByIdProductReviewController
);

export default router;
