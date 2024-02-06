import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import {
    MarketplaceInteractionInterface
} from '@interfaces/marketplaces/MarketplaceInteraction.interface';

export interface MarketplaceFavoriteInterface
  extends MarketplaceInteractionInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
