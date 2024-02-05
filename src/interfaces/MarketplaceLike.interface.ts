import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';
import { MarketplaceInteractionInterface } from './MarketplaceInteraction.interface';

export interface MarketplaceLikeInterface
  extends MarketplaceInteractionInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
