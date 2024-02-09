import { Router } from 'express';

import marketplacesLikesControllers from '@/controllers/marketplaces.likes.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesLikesMiddleware from '@/middleware/marketplaces.likes.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesLikesSchemas from '@/zod/schemas/marketplaces.likes.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesLikesSchemas.getAllMarketplacesLikesSchema
    ),
    marketplacesLikesControllers.getAllMarketplacesLikesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesLikesSchemas.getOneByIdMarketplacesLikesSchema
    ),
    marketplacesLikesMiddleware.isIdValid,
    marketplacesLikesControllers.getOneByIdMarketplaceLikeController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesLikesSchemas.createMarketplacesLikesSchema
    ),
    marketplacesLikesControllers.createMarketplaceLikeController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesLikesSchemas.updateMarketplacesLikesSchema
    ),
    marketplacesLikesMiddleware.isIdValid,
    marketplacesLikesMiddleware.isExists,
    marketplacesLikesMiddleware.isOwner,
    marketplacesLikesControllers.updateOneByIdMarketplaceLikeController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesLikesSchemas.deleteMarketplacesLikesSchema
    ),
    marketplacesLikesMiddleware.isIdValid,
    marketplacesLikesMiddleware.isExists,
    marketplacesLikesMiddleware.isOwner,
    marketplacesLikesControllers.deleteOneByIdMarketplaceLikeController
);

export default router;
