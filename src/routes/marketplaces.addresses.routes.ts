import { Router } from 'express';

import marketplacesAddressesControllers from '@/controllers/marketplaces.addresses.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesAddressesMiddleware from '@/middleware/marketplaces.addresses.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesAddressesSchemas from '@/zod/schemas/marketplaces.addresses.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesAddressesSchemas.getAllMarketplacesAddressesSchema
    ),
    marketplacesAddressesControllers.getAllMarketplacesAddressesController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesAddressesSchemas.getOneByIdMarketplacesAddressesSchema
    ),
    marketplacesAddressesMiddleware.isIdValid,
    marketplacesAddressesControllers.getOneByIdMarketplaceAddressController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesAddressesSchemas.createMarketplacesAddressesSchema
    ),
    marketplacesAddressesControllers.createMarketplaceAddressController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesAddressesSchemas.updateMarketplacesAddressesSchema
    ),
    marketplacesAddressesMiddleware.isIdValid,
    marketplacesAddressesMiddleware.isExists,
    marketplacesAddressesMiddleware.isOwner,
    marketplacesAddressesControllers.updateOneByIdMarketplaceAddressController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesAddressesSchemas.deleteMarketplacesAddressesSchema
    ),
    marketplacesAddressesMiddleware.isIdValid,
    marketplacesAddressesMiddleware.isExists,
    marketplacesAddressesMiddleware.isOwner,
    marketplacesAddressesControllers.deleteOneByIdMarketplaceAddressController
);

export default router;
