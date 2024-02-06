import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { AddressInterface } from '@interfaces/shared/Address.interface';

export interface MarketplaceAddressInterface extends AddressInterface {
  Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
