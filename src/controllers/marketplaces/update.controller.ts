import { ObjectId } from 'bson';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { MarketplaceInterface } from '../../interfaces';
import { MarketplaceModel } from '../../models';

const updateMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplace: MarketplaceInterface = req.body;
    const marketplaceId = new ObjectId(req.query.marketplaceId! as string);

    const putMarketplace: MarketplaceInterface = {
      ...marketplace,
    };

    const marketplaceUpdated = await MarketplaceModel.updateOne(
      { _id: marketplaceId },
      putMarketplace
    );

    return res.status(201).json({
      success: true,
      status: "success",
      message: "Marketplace updated",
      data: marketplaceUpdated,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default updateMarketplaceController;
