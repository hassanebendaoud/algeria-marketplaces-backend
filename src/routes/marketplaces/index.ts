import { Router } from 'express';

import createMarketplaceRouter from './create.route';
import getAllMarketplacesRouter from './get-all.route';

const router = Router();

router.use("/create", createMarketplaceRouter);
router.use("/get-all", getAllMarketplacesRouter);

export default router;
