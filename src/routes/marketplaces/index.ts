import { Router } from "express";

import createMarketplaceRouter from "./create-marketplace.route";
import getAllMarketplacesRouter from "./get-all-marketplaces.route";

const router = Router();

router.use("/create", createMarketplaceRouter);
router.use("/get-all", getAllMarketplacesRouter);

export default router;
