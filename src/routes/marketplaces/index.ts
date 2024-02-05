import { Router } from 'express';

import authMiddleware from '../../middleware/auth.middleware';
import zodValidateMiddleware from '../../middleware/zodValidate.middleware';
import {
  createMarketplaceSchema,
  deleteMarketplaceSchema,
  getAllMarketplacesSchema,
  getOneByIdMarketplaceSchema,
  getOneBySlugMarketplaceSchema,
  getOneByUsernameMarketplaceSchema,
  updateMarketplaceSchema,
} from '../../zod/schema/marketplaces';
import createMarketplaceRouter from './create.route';
import deleteMarketplaceRouter from './delete.route';
import getAllMarketplacesRouter from './getAll.route';
import getOneByIdMarketplaceRouter from './getOneById.route';
import getOneBySlugMarketplaceRouter from './getOneBySlug.route';
import getOneByUsernameMarketplaceRouter from './getOneByUsername.route';
import updateMarketplaceRouter from './update.route';

const router = Router();

router.use(
  "/get-all",
  zodValidateMiddleware(getAllMarketplacesSchema),
  getAllMarketplacesRouter
);
router.use(
  "/get-one-by-id",
  zodValidateMiddleware(getOneByIdMarketplaceSchema),
  getOneByIdMarketplaceRouter
);
router.use(
  "/get-one-by-username",
  zodValidateMiddleware(getOneByUsernameMarketplaceSchema),
  getOneByUsernameMarketplaceRouter
);
router.use(
  "/get-one-by-slug",
  zodValidateMiddleware(getOneBySlugMarketplaceSchema),
  getOneBySlugMarketplaceRouter
);

router.use(
  "/create",
  authMiddleware,
  zodValidateMiddleware(createMarketplaceSchema),
  createMarketplaceRouter
);
router.use(
  "/update",
  authMiddleware,
  zodValidateMiddleware(updateMarketplaceSchema),
  updateMarketplaceRouter
);
router.use(
  "/delete",
  authMiddleware,
  zodValidateMiddleware(deleteMarketplaceSchema),
  deleteMarketplaceRouter
);

export default router;
