import { Router } from 'express';

import productsControllers from '@/controllers/products.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsMiddleware from '@/middleware/products.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productSchemas from '@/zod/schemas/products.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(productSchemas.getAllProductsSchema),
    productsControllers.getAllProductsController
);
router.get(
    '/get-one-by-id',
    zodValidateMiddleware(productSchemas.getOneByIdProductSchema),
    productsMiddleware.isIdValid,
    productsControllers.getOneByIdProductController
);

router.get(
    '/get-one-by-slug',
    zodValidateMiddleware(productSchemas.getOneBySlugProductSchema),
    productsControllers.getOneBySlugProductController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(productSchemas.createProductSchema),
    // productsMiddleware.isSlugExists,
    productsControllers.createProductController
);
router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(productSchemas.updateProductSchema),
    productsMiddleware.isExists,
    // productsMiddleware.isSlugExists,
    productsMiddleware.isOwner,
    productsControllers.updateOneByIdProductController
);
router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(productSchemas.deleteProductSchema),
    productsMiddleware.isIdValid,
    productsMiddleware.isExists,
    productsMiddleware.isOwner,
    productsControllers.deleteOneByIdProductController
);

export default router;
