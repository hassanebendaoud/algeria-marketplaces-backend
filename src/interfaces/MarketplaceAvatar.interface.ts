import { Schema } from 'mongoose';

import { FileInterface } from './File.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceAvatarInterface extends FileInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
