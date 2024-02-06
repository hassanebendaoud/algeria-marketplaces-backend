import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@queries/index';

const getOneByIdController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const marketplaceId = new ObjectId(request.query.marketplaceId! as string);
    const marketplace = await marketplacesQueries.findByIdQuery({
      _id: marketplaceId,
    });

    if (!marketplace) {
      return response.status(404).json({
        success: false,
        status: "error",
        message: "Marketplace not found",
      });
    }

    return response.status(200).json({
      success: true,
      status: "success",
      message: "Marketplace found",
      data: marketplace,
    });
  } catch (error: any) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getOneByIdController;
