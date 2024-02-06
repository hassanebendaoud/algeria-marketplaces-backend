import { Router } from 'express';

import marketplacesMiddleware from '@/middleware/marketplaces';
import authMiddleware from '@middleware/auth/auth.middleware';
import zodValidateMiddleware from '@middleware/auth/zodValidate.middleware';

import {
    createMarketplaceSchema, deleteMarketplaceSchema, getAllMarketplacesSchema,
    getOneByIdMarketplaceSchema, getOneBySlugMarketplaceSchema, getOneByUsernameMarketplaceSchema,
    updateMarketplaceSchema
} from '../../zod/schemas/marketplaces';
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
  marketplacesMiddleware.isIdValid,
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
  marketplacesMiddleware.isUsernameExists,
  // marketplacesMiddleware.isSlugExists,
  createMarketplaceRouter
);
router.use(
  "/update",
  authMiddleware,
  zodValidateMiddleware(updateMarketplaceSchema),
  marketplacesMiddleware.isExists,
  marketplacesMiddleware.isUsernameExists,
  // marketplacesMiddleware.isSlugExists,
  marketplacesMiddleware.isOwner,
  updateMarketplaceRouter
);
router.use(
  "/delete",
  authMiddleware,
  zodValidateMiddleware(deleteMarketplaceSchema),
  marketplacesMiddleware.isIdValid,
  marketplacesMiddleware.isExists,
  marketplacesMiddleware.isOwner,
  deleteMarketplaceRouter
);

export default router;
