import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceImageInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
