import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@queries/index';
import { MarketplacesScope } from '@scopes/index';

const getAllMarketplacesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, size } = req.query;

  const options = {
    page: parseInt(page as string),
    size: parseInt(size as string),
  };

  try {
    const data = await marketplacesQueries.findAllQuery({
      filter: {},
      populate: MarketplacesScope.all,
      salt: [],
      options,
      sort: {
        createdAt: -1,
      },
    });

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No Data" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export default getAllMarketplacesController;
