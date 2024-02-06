import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { InteractionInterface } from '@interfaces/shared/Interaction.interface';

export interface MarketplaceInteractionInterface extends InteractionInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
