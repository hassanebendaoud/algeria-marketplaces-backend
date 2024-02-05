import { NextFunction, Request, Response } from 'express';

import { MarketplaceModel } from '../../models';

const createMarketplace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    const marketplace = await MarketplaceModel.create(body);
    res.status(201).json({ success: true, data: marketplace });
  } catch (error) {
    next(error);
  }
};
