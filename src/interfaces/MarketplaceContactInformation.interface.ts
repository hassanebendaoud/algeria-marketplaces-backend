import { Schema } from 'mongoose';

import { ContactInformationInterface } from './ContactInformation.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceContactInformationInterface
  extends ContactInformationInterface {
  Marketplaces: (MarketplaceInterface | Schema.Types.ObjectId | string)[];
}
