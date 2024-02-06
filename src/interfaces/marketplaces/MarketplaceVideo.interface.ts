import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { FileInterface } from '@interfaces/shared/File.interface';

export interface MarketplaceVideoInterface extends FileInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
