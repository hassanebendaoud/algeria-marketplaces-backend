import { Router } from 'express';

import { getAllMarketplacesController } from '@controllers/marketplaces';

const router = Router();

// Route for Get All Marketplaces from database
router.get("/", getAllMarketplacesController);

export default router;
