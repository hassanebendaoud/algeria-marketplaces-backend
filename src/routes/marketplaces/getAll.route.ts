import { Router } from 'express';

import { MarketplaceModel } from '../../models';

const router = Router();

// Route for Get All Marketplaces from database
router.get("/", async (request, response) => {
  try {
    const marketplaces = await MarketplaceModel.find({});

    return response.status(200).json({
      count: marketplaces.length,
      data: marketplaces,
    });
  } catch (error: any) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
