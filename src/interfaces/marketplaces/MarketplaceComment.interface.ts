import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { CommentInterface } from '@interfaces/shared/Comment.interface';

export interface MarketplaceCommentInterface extends CommentInterface {
  Marketplace: MarketplaceInterface | ObjectId | string;
}
