import { Router } from 'express';

import marketplacesReviewsControllers from '@/controllers/marketplaces.reviews.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesReviewsMiddleware from '@/middleware/marketplaces.reviews.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesReviewsSchemas from '@/zod/schemas/marketplaces.reviews.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesReviewsSchemas.getAllMarketplacesReviewsSchema
    ),
    marketplacesReviewsControllers.getAllMarketplacesReviewsController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesReviewsSchemas.getOneByIdMarketplacesReviewsSchema
    ),
    marketplacesReviewsMiddleware.isIdValid,
    marketplacesReviewsControllers.getOneByIdMarketplaceReviewController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesReviewsSchemas.createMarketplacesReviewsSchema
    ),
    marketplacesReviewsControllers.createMarketplaceReviewController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesReviewsSchemas.updateMarketplacesReviewsSchema
    ),
    marketplacesReviewsMiddleware.isIdValid,
    marketplacesReviewsMiddleware.isExists,
    marketplacesReviewsMiddleware.isOwner,
    marketplacesReviewsControllers.updateOneByIdMarketplaceReviewController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesReviewsSchemas.deleteMarketplacesReviewsSchema
    ),
    marketplacesReviewsMiddleware.isIdValid,
    marketplacesReviewsMiddleware.isExists,
    marketplacesReviewsMiddleware.isOwner,
    marketplacesReviewsControllers.deleteOneByIdMarketplaceReviewController
);

export default router;
