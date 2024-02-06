import { Router } from 'express';

import { getOneBySlugMarketplaceController } from '@controllers/marketplaces';

const router = Router();

// Route for Get One Marketplace by Slug from database
router.get('/', getOneBySlugMarketplaceController);

export default router;
