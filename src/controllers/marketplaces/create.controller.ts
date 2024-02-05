import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { MarketplaceInterface } from '../../interfaces';
import {
  MarketplaceModel,
  UserModel,
} from '../../models';

const createMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplace: MarketplaceInterface = req.body;
    const User = marketplace.User;

    const newMarketplace: MarketplaceInterface = {
      ...marketplace,
    };

    const marketplaceCreated = await MarketplaceModel.create(newMarketplace);

    await UserModel.findByIdAndUpdate(
      User,
      {
        $push: {
          Marketplaces: marketplaceCreated._id,
        },
      },
      { new: false }
    );

    return res.status(201).json({
      success: true,
      status: "success",
      message: "Marketplace created",
      data: marketplaceCreated,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default createMarketplaceController;
