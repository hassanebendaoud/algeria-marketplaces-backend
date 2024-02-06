import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import { MarketplaceInterface } from '@interfaces/index';
import { marketplacesQueries, usersQueries } from '@queries/index';

const createMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplace: MarketplaceInterface = req.body;
    const User = new ObjectId(marketplace.User! as string);

    const newMarketplace: MarketplaceInterface = {
      ...marketplace,
    };

    const marketplaceCreated = await marketplacesQueries.createQuery({
      data: newMarketplace,
    });

    await usersQueries.findByIdAndUpdateQuery({
      _id: User,
      data: {
        $push: {
          Marketplaces: marketplaceCreated._id,
        },
      },
      options: {
        upsert: false,
        new: true,
        runValidators: true,
      },
    });

    return res.status(201).json({
      success: true,
      status: "success",
      message: "Marketplace Created",
      data: marketplaceCreated,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default createMarketplaceController;
