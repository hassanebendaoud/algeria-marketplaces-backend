import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  MarketplaceModel,
  UserModel,
} from '../../models';

const deleteMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplaceId = req.query.marketplaceId;

    const marketplaceDeleted = await MarketplaceModel.deleteOne({
      _id: marketplaceId,
    });

    await UserModel.updateOne(
      { Marketplaces: marketplaceId },
      { $pull: { Marketplaces: marketplaceId } }
    );

    return res.status(200).json({
      success: true,
      status: "success",
      message: "Marketplace deleted",
      data: marketplaceDeleted,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default deleteMarketplaceController;
