import { Router, Request, Response } from "express";
import { MarketplaceInterface } from "../../interfaces/marketplace.interface";
import { MarketplaceModel } from "../../models";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const marketplace: MarketplaceInterface = req.body;

    const newMarketplace: MarketplaceInterface = {
      id: 1,
      name: marketplace.name,
      username: marketplace.username,
    };

    const marketplaceCreated = await MarketplaceModel.create(newMarketplace);

    return res.status(201).send(marketplaceCreated);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
