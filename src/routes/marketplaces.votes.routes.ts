import { Router } from 'express';

import marketplacesVotesControllers from '@/controllers/marketplaces.votes.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesVotesMiddleware from '@/middleware/marketplaces.votes.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesVotesSchemas from '@/zod/schemas/marketplaces.votes.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesVotesSchemas.getAllMarketplacesVotesSchema
    ),
    marketplacesVotesControllers.getAllMarketplacesVotesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesVotesSchemas.getOneByIdMarketplacesVotesSchema
    ),
    marketplacesVotesMiddleware.isIdValid,
    marketplacesVotesControllers.getOneByIdMarketplaceVoteController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesVotesSchemas.createMarketplacesVotesSchema
    ),
    marketplacesVotesControllers.createMarketplaceVoteController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesVotesSchemas.updateMarketplacesVotesSchema
    ),
    marketplacesVotesMiddleware.isIdValid,
    marketplacesVotesMiddleware.isExists,
    marketplacesVotesMiddleware.isOwner,
    marketplacesVotesControllers.updateOneByIdMarketplaceVoteController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesVotesSchemas.deleteMarketplacesVotesSchema
    ),
    marketplacesVotesMiddleware.isIdValid,
    marketplacesVotesMiddleware.isExists,
    marketplacesVotesMiddleware.isOwner,
    marketplacesVotesControllers.deleteOneByIdMarketplaceVoteController
);

export default router;
