import { Schema } from 'mongoose';

import { InteractionInterface } from './Interaction.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceInteractionInterface extends InteractionInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
