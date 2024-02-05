import {
  Request,
  Response,
  Router,
} from 'express';

import { MarketplaceInterface } from '../../interfaces';
import { MarketplaceModel } from '../../models';

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const marketplace: MarketplaceInterface = req.body;

    const newMarketplace: MarketplaceInterface = {
      ...marketplace,
    };

    const marketplaceCreated = await MarketplaceModel.create(newMarketplace);

    return res.status(201).send(marketplaceCreated);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
