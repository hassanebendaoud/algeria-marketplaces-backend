import { Router } from 'express';

import { getOneByIdMarketplaceController } from '@controllers/marketplaces';

const router = Router();

// Route for One Marketplace by ID from database
router.get("/", getOneByIdMarketplaceController);

export default router;
