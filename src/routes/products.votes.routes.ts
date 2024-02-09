import { Router } from 'express';

import productsVotesControllers from '@/controllers/products.votes.controller';
import authMiddleware from '@/middleware/auth.middleware';
import productsVotesMiddleware from '@/middleware/products.votes.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import productsVotesSchemas from '@/zod/schemas/products.votes.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(productsVotesSchemas.getAllProductsVotesSchema),
    productsVotesControllers.getAllProductsVotesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(productsVotesSchemas.getOneByIdProductsVotesSchema),
    productsVotesMiddleware.isIdValid,
    productsVotesControllers.getOneByIdProductVoteController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(productsVotesSchemas.createProductsVotesSchema),
    productsVotesControllers.createProductVoteController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(productsVotesSchemas.updateProductsVotesSchema),
    productsVotesMiddleware.isIdValid,
    productsVotesMiddleware.isExists,
    productsVotesMiddleware.isOwner,
    productsVotesControllers.updateOneByIdProductVoteController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(productsVotesSchemas.deleteProductsVotesSchema),
    productsVotesMiddleware.isIdValid,
    productsVotesMiddleware.isExists,
    productsVotesMiddleware.isOwner,
    productsVotesControllers.deleteOneByIdProductVoteController
);

export default router;
