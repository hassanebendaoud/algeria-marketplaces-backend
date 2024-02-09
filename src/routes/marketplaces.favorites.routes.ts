import { Router } from 'express';

import marketplacesFavoritesControllers from '@/controllers/marketplaces.favorites.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesFavoritesMiddleware from '@/middleware/marketplaces.favorites.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesFavoritesSchemas from '@/zod/schemas/marketplaces.favorites.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesFavoritesSchemas.getAllMarketplacesFavoritesSchema
    ),
    marketplacesFavoritesControllers.getAllMarketplacesFavoritesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesFavoritesSchemas.getOneByIdMarketplacesFavoritesSchema
    ),
    marketplacesFavoritesMiddleware.isIdValid,
    marketplacesFavoritesControllers.getOneByIdMarketplaceFavoriteController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesFavoritesSchemas.createMarketplacesFavoritesSchema
    ),
    marketplacesFavoritesControllers.createMarketplaceFavoriteController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesFavoritesSchemas.updateMarketplacesFavoritesSchema
    ),
    marketplacesFavoritesMiddleware.isIdValid,
    marketplacesFavoritesMiddleware.isExists,
    marketplacesFavoritesMiddleware.isOwner,
    marketplacesFavoritesControllers.updateOneByIdMarketplaceFavoriteController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesFavoritesSchemas.deleteMarketplacesFavoritesSchema
    ),
    marketplacesFavoritesMiddleware.isIdValid,
    marketplacesFavoritesMiddleware.isExists,
    marketplacesFavoritesMiddleware.isOwner,
    marketplacesFavoritesControllers.deleteOneByIdMarketplaceFavoriteController
);

export default router;
