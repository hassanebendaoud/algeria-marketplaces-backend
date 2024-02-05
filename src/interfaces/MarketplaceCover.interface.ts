import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceCoverInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
