import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { ContactInformationInterface } from '@interfaces/shared/ContactInformation.interface';

export interface MarketplaceContactInformationInterface
  extends ContactInformationInterface {
  Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
