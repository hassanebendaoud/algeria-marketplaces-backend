import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';
import { SocialMediaInterface } from './SocialMedia.interface';

export interface MarketplaceSocialMediaInterface extends SocialMediaInterface {
  Marketplaces: (MarketplaceInterface | Schema.Types.ObjectId | string)[];
}
