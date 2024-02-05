import { Schema } from 'mongoose';

import { AddressInterface } from './Address.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceAddressInterface extends AddressInterface {
  Marketplaces: (MarketplaceInterface | Schema.Types.ObjectId | string)[];
}
