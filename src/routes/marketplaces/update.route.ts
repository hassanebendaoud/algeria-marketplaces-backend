import { Router } from 'express';

import { updateOneByIdMarketplaceController } from '@controllers/marketplaces';

const router = Router();

router.patch('/', updateOneByIdMarketplaceController);

export default router;
