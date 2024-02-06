import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@queries/index';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
  const marketplaceId = new ObjectId(req.query.marketplaceId! as string);

  const marketplace = await marketplacesQueries.findByIdQuery({
    _id: marketplaceId,
  });

  if (!marketplace) {
    return res.status(404).json({
      success: false,
      status: "error",
      message: `Marketplace not found with ID: ${marketplaceId}`,
    });
  }

  return next();
};

export default isExists;
