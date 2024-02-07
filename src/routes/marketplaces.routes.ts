import { Router } from 'express';

import authMiddleware from '@/middleware/auth.middleware';
import marketplacesMiddleware from '@/middleware/marketplaces.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesSchemas from '@/zod/schemas/marketplaces.schemas';
import marketplacesControllers from '@controllers/marketplaces.controller';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(marketplacesSchemas.getAllMarketplacesSchema),
    marketplacesControllers.getAllMarketplacesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(marketplacesSchemas.getOneByIdMarketplacesSchema),
    marketplacesMiddleware.isIdValid,
    marketplacesControllers.getOneByIdMarketplaceController
);

router.get('/');

router.get(
    '/get-one-by-username',
    zodValidateMiddleware(
        marketplacesSchemas.getOneByUsernameMarketplacesSchema
    ),
    marketplacesControllers.getOneByUsernameMarketplaceController
);

router.get(
    '/get-one-by-slug',
    zodValidateMiddleware(marketplacesSchemas.getOneBySlugMarketplacesSchema),
    marketplacesControllers.getOneBySlugMarketplaceController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(marketplacesSchemas.createMarketplacesSchema),
    marketplacesMiddleware.isUsernameExists,
    // marketplacesMiddleware.isSlugExists,
    marketplacesControllers.createMarketplaceController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(marketplacesSchemas.updateMarketplacesSchema),
    marketplacesMiddleware.isExists,
    marketplacesMiddleware.isUsernameExists,
    // marketplacesMiddleware.isSlugExists,
    marketplacesMiddleware.isOwner,
    marketplacesControllers.updateOneByIdMarketplaceController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(marketplacesSchemas.deleteMarketplacesSchema),
    marketplacesMiddleware.isIdValid,
    marketplacesMiddleware.isExists,
    marketplacesMiddleware.isOwner,
    marketplacesControllers.deleteOneByIdMarketplaceController
);

export default router;
