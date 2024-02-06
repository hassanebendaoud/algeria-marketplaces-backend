import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
  const marketplaceId = req.query.marketplaceId! as string;

  if (!ObjectId.isValid(marketplaceId)) {
    return res.status(404).json({
      success: false,
      status: "error",
      message: `Marketplace ID is not valid: ${marketplaceId}`,
    });
  }

  return next();
};

export default isIdValid;
