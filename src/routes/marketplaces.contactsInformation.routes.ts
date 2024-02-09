import { Router } from 'express';

import marketplacesContactsInformationControllers from '@/controllers/marketplaces.contactsInformation.controller';
import authMiddleware from '@/middleware/auth.middleware';
import marketplacesContactsInformationMiddleware from '@/middleware/marketplaces.contactsInformation.middleware';
import zodValidateMiddleware from '@/middleware/zodValidate.middleware';
import marketplacesContactsInformationSchemas from '@/zod/schemas/marketplaces.contactsInformation.schemas';

const router = Router();

router.get(
    '/get-all',
    zodValidateMiddleware(
        marketplacesContactsInformationSchemas.getAllMarketplacesContactsInformationSchema
    ),
    marketplacesContactsInformationControllers.getAllMarketplacesContactsInformationController
);

router.get(
    '/get-one-by-id',
    zodValidateMiddleware(
        marketplacesContactsInformationSchemas.getOneByIdMarketplacesContactsInformationSchema
    ),
    marketplacesContactsInformationMiddleware.isIdValid,
    marketplacesContactsInformationControllers.getOneByIdMarketplaceContactInformationController
);

router.post(
    '/create',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesContactsInformationSchemas.createMarketplacesContactsInformationSchema
    ),
    marketplacesContactsInformationControllers.createMarketplaceContactInformationController
);

router.patch(
    '/update',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesContactsInformationSchemas.updateMarketplacesContactsInformationSchema
    ),
    marketplacesContactsInformationMiddleware.isIdValid,
    marketplacesContactsInformationMiddleware.isExists,
    marketplacesContactsInformationMiddleware.isOwner,
    marketplacesContactsInformationControllers.updateOneByIdMarketplaceContactInformationController
);

router.delete(
    '/delete',
    authMiddleware,
    zodValidateMiddleware(
        marketplacesContactsInformationSchemas.deleteMarketplacesContactsInformationSchema
    ),
    marketplacesContactsInformationMiddleware.isIdValid,
    marketplacesContactsInformationMiddleware.isExists,
    marketplacesContactsInformationMiddleware.isOwner,
    marketplacesContactsInformationControllers.deleteOneByIdMarketplaceContactInformationController
);

export default router;
