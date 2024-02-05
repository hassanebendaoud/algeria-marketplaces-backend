import { Router } from 'express';

import { deleteMarketplaceController } from '../../controllers/marketplaces';

const router = Router();

router.delete("/", deleteMarketplaceController);

export default router;
