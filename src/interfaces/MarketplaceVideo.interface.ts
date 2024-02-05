import { Schema } from 'mongoose';

import { FileInterface } from './File.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceVideoInterface extends FileInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
