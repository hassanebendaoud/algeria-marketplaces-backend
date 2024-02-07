import { Router } from 'express';

import productsControllers from '@/controllers/products';
import productsMiddleware from '@/middleware/products';
import productSchemas from '@/zod/schemas/products';
import authMiddleware from '@middleware/auth/auth.middleware';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

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
