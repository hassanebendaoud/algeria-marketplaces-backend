import { Router } from 'express';

import { createMarketplaceController } from '@controllers/marketplaces';

const router = Router();

router.post("/", createMarketplaceController);

export default router;
