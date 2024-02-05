import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';
import { ReviewInterface } from './Review.interface';

export interface MarketplaceReviewInterface extends ReviewInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
