import { Router } from 'express';

import { deleteOneByIdMarketplaceController } from '@controllers/marketplaces';

const router = Router();

router.delete("/", deleteOneByIdMarketplaceController);

export default router;
