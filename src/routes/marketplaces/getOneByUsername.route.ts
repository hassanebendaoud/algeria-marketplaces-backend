import { Router } from 'express';

import { getOneByUsernameMarketplaceController } from '@controllers/marketplaces';

const router = Router();

// Route for Get One Marketplace by Username from database
router.get('/', getOneByUsernameMarketplaceController);

export default router;
