import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';

export interface MarketplaceCoverInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
