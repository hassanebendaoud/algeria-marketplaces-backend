import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';

export interface MarketplaceImageInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
