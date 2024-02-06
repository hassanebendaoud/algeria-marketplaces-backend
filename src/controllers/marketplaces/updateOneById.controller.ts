import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import { MarketplaceInterface } from '@interfaces/index';
import { marketplacesQueries } from '@queries/index';

const updateOneByIdMarketplaceController = async (
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

    const marketplaceUpdated = await marketplacesQueries.findByIdAndUpdateQuery(
      {
        _id: marketplaceId,
        data: putMarketplace,
        options: {
          upsert: false,
          new: true,
          runValidators: true,
        },
      }
    );

    return res.status(201).json({
      success: true,
      status: "success",
      message: "Marketplace Updated",
      data: marketplaceUpdated,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default updateOneByIdMarketplaceController;
