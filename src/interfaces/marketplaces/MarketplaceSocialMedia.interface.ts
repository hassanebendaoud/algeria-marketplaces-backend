import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { SocialMediaInterface } from '@interfaces/shared/SocialMedia.interface';

export interface MarketplaceSocialMediaInterface extends SocialMediaInterface {
  Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
