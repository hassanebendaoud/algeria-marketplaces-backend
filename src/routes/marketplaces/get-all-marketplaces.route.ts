import { Router, Request, Response } from "express";
import { MarketplaceInterface } from "../../interfaces/marketplace.interface";
import { Marketplace } from "../../models/Marketplace.model";

const router = Router();

// Route for Get All Marketplaces from database
router.get("/", async (request, response) => {
  try {
    const marketplaces = await Marketplace.find({});

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
