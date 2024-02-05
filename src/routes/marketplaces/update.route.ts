import { Router } from 'express';

import { updateMarketplaceController } from '../../controllers/marketplaces';

const router = Router();

router.patch("/", updateMarketplaceController);

export default router;
