import { Router } from 'express';

import { MarketplaceModel } from '../../models';

const router = Router();

// Route for Get All Marketplaces from database
router.get("/", async (request, response) => {
  try {
    const marketplaceUsername = request.query.marketplaceUsername! as string;

    const marketplace = await MarketplaceModel.findOne({
      username: marketplaceUsername,
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
});

export default router;
