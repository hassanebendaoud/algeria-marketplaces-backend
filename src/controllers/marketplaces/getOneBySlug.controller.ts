import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@queries/index';

const getOneBySlugMarketplaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketplaceSlug = req.query.marketplaceSlug! as string;

    const marketplace = await marketplacesQueries.findOneQuery({
      filter: { slug: marketplaceSlug },
    });

    if (!marketplace) {
      return res.status(404).json({
        success: false,
        status: "error",
        message: "Marketplace not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: "success",
      message: "Marketplace found",
      data: marketplace,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default getOneBySlugMarketplaceController;
