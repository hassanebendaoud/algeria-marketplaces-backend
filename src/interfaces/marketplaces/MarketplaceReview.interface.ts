import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { ReviewInterface } from '@interfaces/shared/Review.interface';

export interface MarketplaceReviewInterface extends ReviewInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
