import { Schema } from 'mongoose';

import { CommentInterface } from './Comment.interface';
import { MarketplaceInterface } from './Marketplace.interface';

export interface MarketplaceCommentInterface extends CommentInterface {
  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;
}
