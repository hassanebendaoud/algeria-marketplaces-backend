import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries, usersQueries } from '@queries/index';

const deleteOneByIdMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplaceId = req.query.marketplaceId;

    const marketplaceDeleted = await marketplacesQueries.deleteOneQuery({
      filter: { _id: marketplaceId },
    });

    await usersQueries.findOneAndUpdateQuery({
      filter: { Marketplaces: marketplaceId },
      data: {
        $pull: { Marketplaces: marketplaceId },
      },
      options: {},
    });

    return res.status(200).json({
      success: true,
      status: "success",
      message: "Marketplace Deleted",
      data: marketplaceDeleted,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default deleteOneByIdMarketplaceController;
