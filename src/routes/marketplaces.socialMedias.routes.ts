import { Router } from 'express';

import marketplacesSocialMediasControllers from '@/controllers/marketplaces.socialMedias.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesSocialMediasMiddleware from '@/middleware/marketplaces.socialMedias.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesSocialMediasSchemas from '@/zod/schemas/marketplaces.socialMedias.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesSocialMediasSchemas.getAllMarketplacesSocialMediasSchema
    ),
    marketplacesSocialMediasControllers.getAllMarketplacesSocialMediasController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesSocialMediasSchemas.getOneByIdMarketplacesSocialMediasSchema
    ),
    marketplacesSocialMediasMiddleware.isIdValid,
    marketplacesSocialMediasControllers.getOneByIdMarketplaceSocialMediaController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesSocialMediasSchemas.createMarketplacesSocialMediasSchema
    ),
    marketplacesSocialMediasControllers.createMarketplaceSocialMediaController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesSocialMediasSchemas.updateMarketplacesSocialMediasSchema
    ),
    marketplacesSocialMediasMiddleware.isIdValid,
    marketplacesSocialMediasMiddleware.isExists,
    marketplacesSocialMediasMiddleware.isOwner,
    marketplacesSocialMediasControllers.updateOneByIdMarketplaceSocialMediaController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesSocialMediasSchemas.deleteMarketplacesSocialMediasSchema
    ),
    marketplacesSocialMediasMiddleware.isIdValid,
    marketplacesSocialMediasMiddleware.isExists,
    marketplacesSocialMediasMiddleware.isOwner,
    marketplacesSocialMediasControllers.deleteOneByIdMarketplaceSocialMediaController
);

export default router;
