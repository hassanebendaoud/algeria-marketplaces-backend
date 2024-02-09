import { Router } from 'express';

import marketplacesCommentsControllers from '@/controllers/marketplaces.comments.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesCommentsMiddleware from '@/middleware/marketplaces.comments.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesCommentsSchemas from '@/zod/schemas/marketplaces.comments.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesCommentsSchemas.getAllMarketplacesCommentsSchema
    ),
    marketplacesCommentsControllers.getAllMarketplacesCommentsController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesCommentsSchemas.getOneByIdMarketplacesCommentsSchema
    ),
    marketplacesCommentsMiddleware.isIdValid,
    marketplacesCommentsControllers.getOneByIdMarketplaceCommentController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesCommentsSchemas.createMarketplacesCommentsSchema
    ),
    marketplacesCommentsControllers.createMarketplaceCommentController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesCommentsSchemas.updateMarketplacesCommentsSchema
    ),
    marketplacesCommentsMiddleware.isIdValid,
    marketplacesCommentsMiddleware.isExists,
    marketplacesCommentsMiddleware.isOwner,
    marketplacesCommentsControllers.updateOneByIdMarketplaceCommentController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesCommentsSchemas.deleteMarketplacesCommentsSchema
    ),
    marketplacesCommentsMiddleware.isIdValid,
    marketplacesCommentsMiddleware.isExists,
    marketplacesCommentsMiddleware.isOwner,
    marketplacesCommentsControllers.deleteOneByIdMarketplaceCommentController
);

export default router;
